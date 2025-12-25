/**
 * Advanced Context-Aware VBScript Parser
 * Parses VBScript with full understanding of scope, functions, and context
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import Logger from '../logger/Logger.js';

export class AdvancedVBScriptParser {
  constructor(vbscriptCode) {
    this.logger = new Logger('AdvancedVBScriptParser');
    this.code = vbscriptCode;
    this.tokens = [];
    this.ast = [];
    this.functions = [];
    this.globalVariables = [];
  }

  parse() {
    this.logger.step('Parsing VBScript with context awareness');

    try {
      // Tokenize the code
      this._tokenize();

      // Build AST
      this._buildAST();

      // Extract functions with full context
      this._extractFunctions();

      // Extract global variables
      this._extractGlobalVariables();

      this.logger.complete('Context-aware parsing completed');

      return {
        functions: this.functions,
        globalVariables: this.globalVariables,
        ast: this.ast
      };
    } catch (error) {
      this.logger.error('Failed to parse VBScript', error);
      throw error;
    }
  }

  _tokenize() {
    this.logger.info('Tokenizing VBScript code');

    const lines = this.code.split('\n');
    let lineNumber = 1;

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("'")) {
        // Skip empty lines and comments
        this.tokens.push({
          type: 'COMMENT',
          value: line,
          line: lineNumber
        });
      } else if (/^(function|sub)\s+(\w+)\s*\(/i.test(trimmed)) {
        const match = trimmed.match(/^(function|sub)\s+(\w+)\s*\((.*?)\)/i);
        this.tokens.push({
          type: 'FUNCTION_START',
          functionType: match[1].toLowerCase(),
          name: match[2],
          parameters: match[3].split(',').map(p => p.trim()).filter(p => p),
          line: lineNumber,
          originalLine: line
        });
      } else if (/^end\s+(function|sub)/i.test(trimmed)) {
        this.tokens.push({
          type: 'FUNCTION_END',
          line: lineNumber,
          originalLine: line
        });
      } else if (/^dim\s+/i.test(trimmed)) {
        const match = trimmed.match(/^dim\s+(\w+)(?:\((\d+)\))?/i);
        if (match) {
          this.tokens.push({
            type: 'VARIABLE_DECLARATION',
            name: match[1],
            isArray: !!match[2],
            arraySize: match[2] ? parseInt(match[2]) : null,
            line: lineNumber,
            originalLine: line
          });
        }
      } else if (/^if\s+.*\s+then/i.test(trimmed)) {
        // Check if this is a single-line if (has statement after then on same line)
        const ifMatch = trimmed.match(/^if\s+(.*?)\s+then\s*(.*)$/i);
        const isSingleLine = ifMatch && ifMatch[2].trim().length > 0;
        
        if (isSingleLine) {
          // Single-line if: if condition then statement
          this.tokens.push({
            type: 'STATEMENT',
            value: trimmed,
            line: lineNumber,
            originalLine: line
          });
        } else {
          // Multi-line if: if condition then (with block)
          this.tokens.push({
            type: 'IF_STATEMENT',
            condition: ifMatch[1],
            line: lineNumber,
            originalLine: line
          });
        }
      } else if (/^for\s+/i.test(trimmed)) {
        const match = trimmed.match(/^for\s+(\w+)\s*=\s*(\d+)\s+to\s+(\d+)/i);
        if (match) {
          this.tokens.push({
            type: 'FOR_LOOP',
            variable: match[1],
            start: match[2],
            end: match[3],
            line: lineNumber,
            originalLine: line
          });
        }
      } else {
        this.tokens.push({
          type: 'STATEMENT',
          value: trimmed,
          line: lineNumber,
          originalLine: line
        });
      }

      lineNumber++;
    }

    this.logger.success(`Tokenized ${this.tokens.length} tokens`);
  }

  _buildAST() {
    this.logger.info('Building Abstract Syntax Tree');

    let currentNode = null;
    const stack = [];

    for (const token of this.tokens) {
      if (token.type === 'FUNCTION_START') {
        const functionNode = {
          type: 'FUNCTION',
          functionType: token.functionType,
          name: token.name,
          parameters: token.parameters,
          body: [],
          startLine: token.line,
          endLine: null,
          localVariables: [],
          returnStatements: []
        };

        stack.push(functionNode);
        currentNode = functionNode;
      } else if (token.type === 'FUNCTION_END') {
        if (currentNode) {
          currentNode.endLine = token.line;
          this.ast.push(currentNode);
          stack.pop();
          currentNode = stack.length > 0 ? stack[stack.length - 1] : null;
        }
      } else if (currentNode) {
        currentNode.body.push(token);

        // Track local variables
        if (token.type === 'VARIABLE_DECLARATION') {
          currentNode.localVariables.push({
            name: token.name,
            isArray: token.isArray,
            arraySize: token.arraySize
          });
        }

        // Track return statements (function name assignments)
        if (token.type === 'STATEMENT' && currentNode.functionType === 'function') {
          const returnMatch = token.value.match(new RegExp(`^${currentNode.name}\\s*=\\s*(.+)$`, 'i'));
          if (returnMatch) {
            currentNode.returnStatements.push({
              value: returnMatch[1],
              line: token.line
            });
          }
        }
      } else {
        // Global scope
        this.ast.push(token);

        if (token.type === 'VARIABLE_DECLARATION') {
          this.globalVariables.push({
            name: token.name,
            isArray: token.isArray,
            arraySize: token.arraySize,
            line: token.line
          });
        }
      }
    }

    this.logger.success(`Built AST with ${this.ast.filter(n => n.type === 'FUNCTION').length} functions`);
  }

  _extractFunctions() {
    this.logger.info('Extracting functions with full context');

    this.functions = this.ast
      .filter(node => node.type === 'FUNCTION')
      .map(node => ({
        name: node.name,
        type: node.functionType,
        parameters: node.parameters,
        localVariables: node.localVariables,
        returnStatements: node.returnStatements,
        startLine: node.startLine,
        endLine: node.endLine,
        bodyTokens: node.body,
        code: this._reconstructCode(node)
      }));

    this.logger.success(`Extracted ${this.functions.length} functions with full context`);
  }

  _extractGlobalVariables() {
    this.logger.info('Extracting global variables');
    // Already extracted in _buildAST
    this.logger.success(`Found ${this.globalVariables.length} global variables`);
  }

  _reconstructCode(node) {
    const lines = [];

    // Function declaration
    const params = node.parameters.join(', ');
    lines.push(`${node.functionType} ${node.name}(${params})`);

    // Body
    for (const token of node.body) {
      lines.push(token.originalLine || token.value);
    }

    // End statement
    lines.push(`end ${node.functionType}`);

    return lines.join('\n');
  }

  splitIntoFiles(outputDir) {
    this.logger.step('Splitting VBScript into separate files');

    try {
      mkdirSync(outputDir, { recursive: true });

      // Write global variables file
      const globalVarsCode = this._generateGlobalVariablesCode();
      writeFileSync(
        join(outputDir, '_globals.vbs'),
        globalVarsCode
      );
      this.logger.success(`✓ _globals.vbs`);

      // Write each function to its own file
      for (const func of this.functions) {
        const filename = `${func.name}.vbs`;
        writeFileSync(
          join(outputDir, filename),
          func.code
        );
        this.logger.success(`✓ ${filename}`);
      }

      this.logger.complete(`Split into ${this.functions.length + 1} files`);

      return {
        globalFile: join(outputDir, '_globals.vbs'),
        functionFiles: this.functions.map(f => join(outputDir, `${f.name}.vbs`))
      };
    } catch (error) {
      this.logger.error('Failed to split into files', error);
      throw error;
    }
  }

  _generateGlobalVariablesCode() {
    const lines = ['  ' + "' Global Variables"];

    for (const varDecl of this.globalVariables) {
      if (varDecl.isArray) {
        lines.push(`  dim ${varDecl.name}(${varDecl.arraySize})`);
      } else {
        lines.push(`  dim ${varDecl.name}`);
      }
    }

    return lines.join('\n');
  }

  getAnalysis() {
    return {
      totalFunctions: this.functions.length,
      totalGlobalVariables: this.globalVariables.length,
      functionDetails: this.functions.map(f => ({
        name: f.name,
        type: f.type,
        parameters: f.parameters,
        localVariableCount: f.localVariables.length,
        returnStatementCount: f.returnStatements.length,
        lineCount: f.endLine - f.startLine + 1
      }))
    };
  }
}

export default AdvancedVBScriptParser;
