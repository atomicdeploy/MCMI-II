/**
 * VBScript to JavaScript Transpiler
 * Converts VBScript code to modern JavaScript
 */

import Logger from '../logger/Logger.js';

export class VBScriptTranspiler {
  constructor() {
    this.logger = new Logger('VBScriptTranspiler');
  }

  transpile(vbscriptCode) {
    this.logger.step('Transpiling VBScript to JavaScript');

    try {
      let jsCode = vbscriptCode;

      // Apply transformation rules in the correct order
      jsCode = this._convertVariableDeclarations(jsCode);
      jsCode = this._convertFunctions(jsCode);
      jsCode = this._convertOperators(jsCode);  // Convert operators BEFORE conditionals
      jsCode = this._convertConditionals(jsCode);
      jsCode = this._convertLoops(jsCode);
      jsCode = this._convertArrays(jsCode);
      jsCode = this._convertObjectReferences(jsCode);
      jsCode = this._convertStringConcatenation(jsCode);
      jsCode = this._convertComments(jsCode);
      jsCode = this._convertMiscellaneous(jsCode);

      this.logger.complete('Transpilation completed');

      return jsCode;
    } catch (error) {
      this.logger.error('Failed to transpile VBScript', error);
      throw error;
    }
  }

  _convertVariableDeclarations(code) {
    this.logger.info('Converting variable declarations');

    // Convert dim to let/const
    code = code.replace(/\bdim\s+(\w+)\s*\((\d+)\)/gi, 'const $1 = new Array($2 + 1)');
    code = code.replace(/\bdim\s+(\w+)/gi, 'let $1');

    // Convert set to const/let
    code = code.replace(/\bset\s+(\w+)\s*=/gi, 'const $1 =');

    return code;
  }

  _convertFunctions(code) {
    this.logger.info('Converting functions');

    // Convert function declarations
    code = code.replace(/\bfunction\s+(\w+)\s*\((.*?)\)/gi, 'function $1($2) {');
    code = code.replace(/\bend\s+function/gi, '}');

    // Convert sub declarations
    code = code.replace(/\bsub\s+(\w+)\s*\((.*?)\)/gi, 'function $1($2) {');
    code = code.replace(/\bend\s+sub/gi, '}');

    // Convert function returns (VBScript assigns to function name)
    const functionNames = [];
    const funcPattern = /function\s+(\w+)/gi;
    let match;
    while ((match = funcPattern.exec(code)) !== null) {
      functionNames.push(match[1]);
    }

    functionNames.forEach(name => {
      const returnPattern = new RegExp(`\\b${name}\\s*=\\s*(.+)$`, 'gim');
      code = code.replace(returnPattern, 'return $1;');
    });

    return code;
  }

  _convertConditionals(code) {
    this.logger.info('Converting conditionals');

    // Convert if-then-else
    code = code.replace(/\bif\s+(.*?)\s+then\s*$/gim, 'if ($1) {');
    code = code.replace(/\belseif\s+(.*?)\s+then\s*$/gim, '} else if ($1) {');
    code = code.replace(/\belse\s*$/gim, '} else {');
    code = code.replace(/\bend\s+if/gi, '}');

    return code;
  }

  _convertOperators(code) {
    this.logger.info('Converting operators');

    // Convert comparison operators with word boundaries
    code = code.replace(/\b and \b/gi, ' && ');
    code = code.replace(/\b or \b/gi, ' || ');
    code = code.replace(/\b not \b/gi, ' !');

    // Convert equality operators
    code = code.replace(/\s*=\s*true\b/gi, ' === true');
    code = code.replace(/\s*=\s*false\b/gi, ' === false');

    return code;
  }

  _convertLoops(code) {
    this.logger.info('Converting loops');

    // Convert for loops
    code = code.replace(/\bfor\s+(\w+)\s*=\s*(\d+)\s+to\s+(\d+)/gi,
      'for (let $1 = $2; $1 <= $3; $1++)');
    code = code.replace(/\bnext\b/gi, '}');

    return code;
  }

  _convertArrays(code) {
    this.logger.info('Converting array access');

    // VBScript uses parentheses for array access, JavaScript uses brackets
    // This is complex and context-dependent, so we'll mark it for manual review
    // code = code.replace(/(\w+)\((\d+)\)/g, '$1[$2]');

    return code;
  }

  _convertObjectReferences(code) {
    this.logger.info('Converting object references');

    // Convert document references
    code = code.replace(/\bdocument\.frm1\./gi, 'document.forms.frm1.');

    // Convert checked property access
    code = code.replace(/\.checked\s*=\s*true/gi, '.checked = true');
    code = code.replace(/\.checked\s*=\s*false/gi, '.checked = false');

    return code;
  }

  _convertStringConcatenation(code) {
    this.logger.info('Converting string concatenation');

    // Convert & to + but NOT if it's already && or similar
    code = code.replace(/([^&])\s*&\s*([^&])/g, '$1 + $2');

    return code;
  }

  _convertComments(code) {
    this.logger.info('Converting comments');

    // VBScript uses ' for comments, JavaScript uses //
    code = code.replace(/^\s*'/gm, '//');

    return code;
  }

  _convertMiscellaneous(code) {
    this.logger.info('Converting miscellaneous constructs');

    // Convert createobject (specific to IE/Windows)
    code = code.replace(/createobject\s*\(\s*["']scripting\.filesystemobject["']\s*\)/gi,
      '/* FileSystemObject not available in browser */ null');

    // Add semicolons at end of statements where missing
    code = code.replace(/^(\s*)((?:let|const|return|var)\s+.*)$/gim, '$1$2;');

    return code;
  }

  transpileToModern(vbscriptCode, extractData = false) {
    this.logger.step('Creating modern JavaScript version');

    const jsCode = this.transpile(vbscriptCode);

    if (extractData) {
      return this._separateEngineAndData(jsCode);
    }

    return jsCode;
  }

  _separateEngineAndData(code) {
    this.logger.info('Separating engine code from data definitions');

    // Extract scoring rules and configurations
    const scoringRules = [];
    const engine = code;

    // This would require more sophisticated parsing
    // For now, return the basic structure

    return {
      engine: engine,
      data: {
        scoringRules,
        scales: []
      }
    };
  }
}

export default VBScriptTranspiler;
