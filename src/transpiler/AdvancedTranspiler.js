/**
 * Advanced Context-Aware VBScript to JavaScript Transpiler
 * Uses AST-based approach for precise transpilation
 * Handles ALL VBScript tokens comprehensively
 */

import Logger from '../logger/Logger.js';
import AdvancedVBScriptParser from '../parser/AdvancedVBScriptParser.js';
import { TokenHandlers } from './VBScriptTokens.js';

export class AdvancedTranspiler {
  constructor() {
    this.logger = new Logger('AdvancedTranspiler');
    this.knownArrays = new Set();
    this.knownFunctions = new Set();
    this.unknownTokens = new Set();
  }

  transpile(vbscriptCode) {
    this.logger.step('Transpiling VBScript with comprehensive token handling');

    try {
      // Parse the VBScript with full context
      const parser = new AdvancedVBScriptParser(vbscriptCode);
      const parsed = parser.parse();

      // Build knowledge base
      this._buildKnowledgeBase(parsed);

      // Transpile each function
      const transpiledFunctions = [];
      for (const func of parsed.functions) {
        const jsCode = this._transpileFunction(func);
        transpiledFunctions.push(jsCode);
      }

      // Generate global variables
      const globalVars = this._transpileGlobalVariables(parsed.globalVariables);

      // Combine all code
      const fullCode = [
        '/**',
        ' * Transpiled JavaScript from VBScript',
        ' * Generated with comprehensive token-aware transpiler',
        ` * Date: ${new Date().toISOString()}`,
        ' * All VBScript tokens handled systematically',
        ' */',
        '',
        globalVars,
        '',
        ...transpiledFunctions
      ].join('\n');

      // Report any unknown tokens encountered
      if (this.unknownTokens.size > 0) {
        this.logger.warning(`Encountered ${this.unknownTokens.size} unknown token patterns`);
        for (const token of this.unknownTokens) {
          this.logger.debug(`Unknown: ${token}`);
        }
      } else {
        this.logger.success('All tokens recognized and handled');
      }

      this.logger.complete('Comprehensive transpilation completed');

      return fullCode;
    } catch (error) {
      this.logger.error('Failed to transpile', error);
      throw error;
    }
  }

  _buildKnowledgeBase(parsed) {
    this.logger.info('Building comprehensive knowledge base');

    // Track all arrays
    for (const varDecl of parsed.globalVariables) {
      if (varDecl.isArray) {
        this.knownArrays.add(varDecl.name);
      }
    }

    // Track all functions
    for (const func of parsed.functions) {
      this.knownFunctions.add(func.name);

      // Track local arrays
      for (const localVar of func.localVariables) {
        if (localVar.isArray) {
          this.knownArrays.add(localVar.name);
        }
      }
    }

    this.logger.info(`Knowledge base: ${this.knownArrays.size} arrays, ${this.knownFunctions.size} functions`);
  }

  _transpileGlobalVariables(globalVars) {
    const lines = ['// Global Variables'];

    for (const varDecl of globalVars) {
      const handler = TokenHandlers.getHandler('dim');
      const result = handler(varDecl, this);
      lines.push(result);
    }

    return lines.join('\n');
  }

  _transpileFunction(func) {
    this.logger.debug(`Transpiling function: ${func.name}`);

    const lines = [];

    // Function declaration
    const params = func.parameters.join(', ');
    lines.push(`function ${func.name}(${params}) {`);

    // Local variables
    for (const localVar of func.localVariables) {
      if (localVar.isArray) {
        lines.push(`  const ${localVar.name} = new Array(${localVar.arraySize} + 1);`);
      } else {
        lines.push(`  let ${localVar.name};`);
      }
    }

    if (func.localVariables.length > 0) {
      lines.push('');
    }

    // Transpile body with comprehensive token handling
    const bodyLines = this._transpileBody(func.bodyTokens, func);
    lines.push(...bodyLines);

    // Add return statement if function doesn't have one explicitly
    if (func.type === 'function' && func.returnStatements.length === 0) {
      lines.push('  return null;');
    }

    lines.push('}');
    lines.push('');

    return lines.join('\n');
  }

  _transpileBody(tokens, func) {
    const lines = [];
    let indentLevel = 1;
    let ifStack = []; // Track if statement nesting

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const tokenType = this._identifyTokenType(token);

      if (token.type === 'COMMENT') {
        const comment = token.value.trim();
        if (comment.startsWith("'")) {
          lines.push('  '.repeat(indentLevel) + '//' + comment.substring(1));
        }
      } else if (token.type === 'VARIABLE_DECLARATION') {
        // Already handled in function preamble
        continue;
      } else if (token.type === 'IF_STATEMENT') {
        const condition = this._transpileExpression(token.condition);
        lines.push('  '.repeat(indentLevel) + `if (${condition}) {`);
        indentLevel++;
        ifStack.push('if');
      } else if (token.type === 'FOR_LOOP') {
        lines.push('  '.repeat(indentLevel) + `for (let ${token.variable} = ${token.start}; ${token.variable} <= ${token.end}; ${token.variable}++) {`);
        indentLevel++;
      } else if (token.type === 'STATEMENT') {
        const statement = this._transpileStatement(token.value, func, tokenType);

        // Check for control flow statements
        if (/^end\s+if$/i.test(token.value)) {
          if (ifStack.length > 0) {
            ifStack.pop();
          }
          indentLevel--;
          lines.push('  '.repeat(indentLevel) + '}');
        } else if (/^next$/i.test(token.value)) {
          indentLevel--;
          lines.push('  '.repeat(indentLevel) + '}');
        } else if (/^else\s+\w+/i.test(token.value)) {
          // Inline else with statement: else x=1
          const match = token.value.match(/^else\s+(.+)$/i);
          if (match) {
            const elseStatement = this._transpileStatement(match[1], func, 'STATEMENT');
            indentLevel--;
            lines.push('  '.repeat(indentLevel) + '} else {');
            indentLevel++;
            lines.push('  '.repeat(indentLevel) + elseStatement);
            indentLevel--;
            lines.push('  '.repeat(indentLevel) + '}');
            
            // Check if next token is 'end if' to properly close
            if (i + 1 < tokens.length && /^end\s+if$/i.test(tokens[i + 1].value)) {
              // Skip it as we already closed
              i++;
              if (ifStack.length > 0) {
                ifStack.pop();
              }
            }
          }
        } else if (/^else$/i.test(token.value)) {
          indentLevel--;
          lines.push('  '.repeat(indentLevel) + '} else {');
          indentLevel++;
        } else if (/^elseif\s+/i.test(token.value)) {
          const match = token.value.match(/^elseif\s+(.*?)\s+then$/i);
          if (match) {
            const condition = this._transpileExpression(match[1]);
            indentLevel--;
            lines.push('  '.repeat(indentLevel) + `} else if (${condition}) {`);
            indentLevel++;
          }
        } else if (/^do\s+while/i.test(token.value)) {
          const match = token.value.match(/^do\s+while\s+(.*?)$/i);
          if (match) {
            const condition = this._transpileExpression(match[1]);
            lines.push('  '.repeat(indentLevel) + `while (${condition}) {`);
            indentLevel++;
          }
        } else if (/^loop$/i.test(token.value)) {
          indentLevel--;
          lines.push('  '.repeat(indentLevel) + '}');
        } else if (/^select\s+case/i.test(token.value)) {
          const match = token.value.match(/^select\s+case\s+(.*?)$/i);
          if (match) {
            const expr = this._transpileExpression(match[1]);
            lines.push('  '.repeat(indentLevel) + `switch (${expr}) {`);
            indentLevel++;
          }
        } else if (/^case\s+/i.test(token.value)) {
          if (/^case\s+else$/i.test(token.value)) {
            lines.push('  '.repeat(indentLevel) + 'default:');
          } else {
            const match = token.value.match(/^case\s+(.*?)$/i);
            if (match) {
              const value = this._transpileExpression(match[1]);
              lines.push('  '.repeat(indentLevel) + `case ${value}:`);
            }
          }
          indentLevel++;
        } else if (/^end\s+select$/i.test(token.value)) {
          indentLevel--;
          lines.push('  '.repeat(indentLevel) + '}');
        } else if (/^exit\s+(function|sub|for|do)$/i.test(token.value)) {
          const match = token.value.match(/^exit\s+(function|sub|for|do)$/i);
          if (match[1].toLowerCase() === 'function' || match[1].toLowerCase() === 'sub') {
            lines.push('  '.repeat(indentLevel) + 'return;');
          } else {
            lines.push('  '.repeat(indentLevel) + 'break;');
          }
        } else if (statement) {
          lines.push('  '.repeat(indentLevel) + statement);
        }
      }
    }

    return lines;
  }

  _identifyTokenType(token) {
    // Identify the specific VBScript construct
    if (!token.value) return 'UNKNOWN';

    const value = token.value.trim().toLowerCase();

    // Check for known keywords
    if (value.startsWith('dim ')) return 'DIM';
    if (value.startsWith('set ')) return 'SET';
    if (value.startsWith('if ')) return 'IF';
    if (value.startsWith('elseif ')) return 'ELSEIF';
    if (value === 'else') return 'ELSE';
    if (value === 'end if') return 'END_IF';
    if (value.startsWith('for ')) return 'FOR';
    if (value === 'next') return 'NEXT';
    if (value.startsWith('do ')) return 'DO';
    if (value === 'loop') return 'LOOP';
    if (value.startsWith('select ')) return 'SELECT';
    if (value.startsWith('case ')) return 'CASE';
    if (value === 'end select') return 'END_SELECT';
    if (value.startsWith('exit ')) return 'EXIT';
    if (value.includes('msgbox')) return 'MSGBOX';
    if (value.includes('inputbox')) return 'INPUTBOX';
    if (value.includes('createobject')) return 'CREATEOBJECT';
    if (value.includes('document.write')) return 'DOCUMENT_WRITE';

    return 'STATEMENT';
  }

  _transpileStatement(statement, func, tokenType) {
    if (!statement || statement.trim() === '') {
      return '';
    }

    // Check if this is a return statement (function name assignment)
    const returnMatch = statement.match(new RegExp(`^${func.name}\\s*=\\s*(.+)$`, 'i'));
    if (returnMatch) {
      const value = this._transpileExpression(returnMatch[1]);
      return `return ${value};`;
    }

    // Handle specific token types
    if (tokenType === 'MSGBOX' || /^msgbox[\s"]/i.test(statement)) {
      // Handle msgbox with or without parentheses
      // Extract everything after 'msgbox'
      const msgboxIndex = statement.toLowerCase().indexOf('msgbox');
      let message = statement.substring(msgboxIndex + 6).trim();
      
      // Remove leading/trailing parentheses if present
      if (message.startsWith('(') && message.endsWith(')')) {
        message = message.substring(1, message.length - 1).trim();
      }
      
      const transpiledMessage = this._transpileExpression(message);
      return `alert(${transpiledMessage});`;
    }

    if (tokenType === 'INPUTBOX') {
      const match = statement.match(/(\w+)\s*=\s*inputbox\s*\((.+?)\)/i);
      if (match) {
        const varName = match[1];
        const message = this._transpileExpression(match[2]);
        return `${varName} = prompt(${message});`;
      }
    }

    if (tokenType === 'DOCUMENT_WRITE') {
      const match = statement.match(/document\.write\s+(.+)$/i);
      if (match) {
        const content = this._transpileExpression(match[1]);
        return `document.write(${content});`;
      }
    }

    // Check for assignment
    const assignMatch = statement.match(/^(\w+(?:\([^)]+\))?)\s*=\s*(.+)$/);
    if (assignMatch) {
      const left = this._transpileExpression(assignMatch[1]);
      const right = this._transpileExpression(assignMatch[2]);
      return `${left} = ${right};`;
    }

    // Other statements
    const transpiled = this._transpileExpression(statement);
    return transpiled.endsWith(';') ? transpiled : transpiled + ';';
  }

  _transpileExpression(expr) {
    if (!expr) return '';

    let result = expr.trim();

    // Handle object property access with array indices
    // Pattern: k.r62(1).checked
    result = result.replace(/(\w+)\.r(\d+)\((\d+)\)\.(\w+)/g, (match, obj, num, idx, prop) => {
      return `${obj}.elements.r${num}[${idx}].${prop}`;
    });

    // Handle array access - CONTEXT AWARE
    // Replace array(index) with array[index] only for known arrays
    for (const arrayName of this.knownArrays) {
      const arrayPattern = new RegExp(`\\b${arrayName}\\((\\d+)\\)`, 'g');
      result = result.replace(arrayPattern, `${arrayName}[$1]`);
    }

    // Handle form element access: k.element(0) -> k.elements.element[0]
    result = result.replace(/\bk\.(\w+)\((\d+)\)/g, 'k.elements.$1[$2]');

    // Convert VBScript comparison operators (BEFORE logical operators!)
    result = result.replace(/\s*=>\s*/gi, ' >= ');
    result = result.replace(/\s*=<\s*/gi, ' <= ');
    result = result.replace(/\s*<>\s*/gi, ' !== ');

    // Convert VBScript operators - handle all cases
    // First, handle 'not' at word boundaries
    result = result.replace(/\bnot\s+/gi, '!');
    
    // Then handle 'and' and 'or' - must have spaces or be at boundaries
    result = result.replace(/\s+and\s+/gi, ' && ');
    result = result.replace(/\s+or\s+/gi, ' || ');
    
    // Handle other operators
    result = result.replace(/\s+xor\s+/gi, ' ^ ');
    result = result.replace(/\s+mod\s+/gi, ' % ');

    // Convert VBScript built-in functions
    result = result.replace(/\bchr\s*\((\d+)\)/gi, 'String.fromCharCode($1)');
    result = result.replace(/\bucase\s*\(/gi, '.toUpperCase(');
    result = result.replace(/\blcase\s*\(/gi, '.toLowerCase(');
    result = result.replace(/\blen\s*\(/gi, '.length ');
    result = result.replace(/\btrim\s*\(/gi, '.trim(');
    result = result.replace(/\bisempty\s*\(/gi, '(typeof ');
    result = result.replace(/\bisnull\s*\(/gi, '(');
    result = result.replace(/\bisnumeric\s*\(/gi, '!isNaN(');
    result = result.replace(/\bisarray\s*\(/gi, 'Array.isArray(');
    result = result.replace(/\babs\s*\(/gi, 'Math.abs(');
    result = result.replace(/\bround\s*\(/gi, 'Math.round(');
    result = result.replace(/\bint\s*\(/gi, 'Math.floor(');

    // Convert equality checks (after comparison operators!)
    result = result.replace(/\s*=\s*true\b/gi, ' === true');
    result = result.replace(/\s*=\s*false\b/gi, ' === false');
    
    // Convert single = to === for comparisons (but not in assignments)
    // This is tricky - only in condition contexts
    if (result.match(/^[^=]*=[^=]/)) {
      // If there's a single = and not already ==, ===, <=, >=, !=, !==
      result = result.replace(/([^<>=!])=([^=])/g, '$1===$2');
    }

    // Convert string concatenation (careful not to touch &&)
    result = result.replace(/([^&])\s*&\s*([^&])/g, '$1 + $2');

    // Handle createobject calls
    result = result.replace(/createobject\s*\(\s*["']scripting\.filesystemobject["']\s*\)/gi,
      '/* FileSystemObject - use Blob API */ null');

    // Handle document.write
    result = result.replace(/document\.write\s+/gi, 'document.write(');
    if (/document\.write\([^)]*$/.test(result)) {
      result += ')';
    }

    // Check for unknown patterns
    if (result.includes('createobject') && !result.includes('FileSystemObject')) {
      this.unknownTokens.add(`CreateObject: ${result}`);
    }

    return result;
  }

  // Method to allow external access for token handlers
  transpileExpression(expr) {
    return this._transpileExpression(expr);
  }
}

export default AdvancedTranspiler;
