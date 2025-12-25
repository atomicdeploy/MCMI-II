/**
 * VBScript Extractor
 * Extracts VBScript code from HTML and prepares it for transpilation
 */

import { readFileSync } from 'fs';
import Logger from '../logger/Logger.js';

export class VBScriptExtractor {
  constructor(filePath) {
    this.filePath = filePath;
    this.logger = new Logger('VBScriptExtractor');
    this.vbscriptCode = '';
    this.functions = [];
    this.variables = [];
  }

  extract() {
    this.logger.step('Extracting VBScript code');

    try {
      const content = readFileSync(this.filePath, 'utf-8');

      // Extract VBScript block
      const vbscriptMatch = content.match(/<SCRIPT\s+language=vbscript[^>]*>([\s\S]*?)<\/SCRIPT>/i);

      if (vbscriptMatch) {
        this.vbscriptCode = vbscriptMatch[1];
        this.logger.success(`Extracted VBScript block (${this.vbscriptCode.split('\n').length} lines)`);

        // Parse functions and variables
        this._parseFunctions();
        this._parseVariables();

        this.logger.complete('VBScript extraction completed');
      } else {
        this.logger.warning('No VBScript block found');
      }

      return {
        code: this.vbscriptCode,
        functions: this.functions,
        variables: this.variables,
        lineCount: this.vbscriptCode.split('\n').length
      };
    } catch (error) {
      this.logger.error('Failed to extract VBScript', error);
      throw error;
    }
  }

  _parseFunctions() {
    this.logger.info('Parsing VBScript functions');

    // Match function declarations
    const functionPattern = /(?:function|sub)\s+(\w+)\s*\((.*?)\)/gi;
    let match;

    while ((match = functionPattern.exec(this.vbscriptCode)) !== null) {
      const functionName = match[1];
      const params = match[2].trim();

      this.functions.push({
        name: functionName,
        parameters: params ? params.split(',').map(p => p.trim()) : [],
        type: match[0].toLowerCase().startsWith('function') ? 'function' : 'sub'
      });
    }

    this.logger.success(`Found ${this.functions.length} functions/subs`);
  }

  _parseVariables() {
    this.logger.info('Parsing VBScript variables');

    // Match dim declarations
    const dimPattern = /dim\s+(\w+)(?:\((\d+)\))?/gi;
    let match;

    while ((match = dimPattern.exec(this.vbscriptCode)) !== null) {
      const varName = match[1];
      const arraySize = match[2];

      this.variables.push({
        name: varName,
        isArray: !!arraySize,
        arraySize: arraySize ? parseInt(arraySize) : null
      });
    }

    this.logger.success(`Found ${this.variables.length} variable declarations`);
  }

  getVBScriptInfo() {
    return {
      totalLines: this.vbscriptCode.split('\n').length,
      functions: this.functions,
      variables: this.variables,
      code: this.vbscriptCode
    };
  }
}

export default VBScriptExtractor;
