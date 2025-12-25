/**
 * Comprehensive Validation Script
 * Checks for ALL remaining edge cases in transpiled JavaScript
 */

import fs from 'fs';
import Logger from './logger/Logger.js';

class ComprehensiveValidator {
  constructor() {
    this.logger = new Logger('ComprehensiveValidator');
    this.issues = [];
    this.warnings = [];
  }

  validate(jsFilePath) {
    this.logger.step('Running comprehensive validation');

    const code = fs.readFileSync(jsFilePath, 'utf-8');

    // Check 1: Array access patterns
    this._checkArrayAccess(code);

    // Check 2: Assignment vs comparison
    this._checkAssignmentVsComparison(code);

    // Check 3: Function calls without parentheses
    this._checkFunctionCalls(code);

    // Check 4: String concatenation
    this._checkStringConcatenation(code);

    // Check 5: VBScript remnants
    this._checkVBScriptRemnants(code);

    // Check 6: Syntax validation
    this._checkSyntax(jsFilePath);

    // Report results
    this._reportResults();

    return this.issues.length === 0;
  }

  _checkArrayAccess(code) {
    this.logger.info('Checking array access patterns');

    // Pattern: variable(something) that should be variable[something]
    const possibleArrayAccess = code.match(/\b([a-z_][\w]*)\(([^)]+)\)/gi);
    
    if (possibleArrayAccess) {
      const functionNames = new Set([
        'function', 'alert', 'prompt', 'console', 'Math', 'String',
        'Array', 'Object', 'parseInt', 'parseFloat', 'isNaN',
        'buttvalidate', 'buttclick', 'male', 'female', 'one', 'two',
        'three', 'four', 'five', 'sixa', 'sixb', 'seven', 'eighta', 'eightb',
        // Add all MCMI function names
        'a', 'b', 'c', 'cc', 'd', 'h', 'n', 'p', 'pp', 's', 'ss', 't', 'y', 'z',
        'daadjust', 'dcadjust', 'ddadjust', 'checkabr', 'checkbbr', 'checkcbr',
        'checkccbr', 'checkdbr', 'checkhbr', 'checknbr', 'checkpbr', 'checkppbr',
        'checksbr', 'checkssbr', 'checktbr', 'checkybr', 'checkzbr',
        'checkonebr', 'checktwobr', 'checkthreebr', 'checkfourbr', 'checkfivebr',
        'checksixabr', 'checksixbbr', 'checksevenbr', 'checkeightabr', 'checkeightbbr',
        'checkfabr', 'checkfbbr', 'checkfcbr', 'checkfccbr', 'checkfdbr', 'checkfhbr',
        'checkfnbr', 'checkfpbr', 'checkfppbr', 'checkfsbr', 'checkfssbr', 'checkftbr',
        'checkfybr', 'checkfzbr', 'checkfonebr', 'checkftwobr', 'checkfthreebr',
        'checkffourbr', 'checkffivebr', 'checkfsixabr', 'checkfsixbbr', 'checkfsevenbr',
        'checkfeightabr', 'checkfeightbbr', 'v'
      ]);

      for (const match of possibleArrayAccess) {
        const funcName = match.split('(')[0].toLowerCase();
        if (!functionNames.has(funcName) && !match.includes('[')) {
          this.warnings.push(`Possible array access using (): ${match}`);
        }
      }
    }
  }

  _checkAssignmentVsComparison(code) {
    this.logger.info('Checking assignment vs comparison');

    // Check for single = in conditions (should be ===)
    const lines = code.split('\n');
    let lineNum = 0;
    for (const line of lines) {
      lineNum++;
      
      // Check if line contains if/while/for and has single =
      if (/\b(if|while)\s*\([^)]*[^=!<>]=(?!=)[^)]*\)/.test(line)) {
        // Make sure it's not >=, <=, !==, ===
        if (!/[<>=!]==/.test(line)) {
          this.issues.push(`Line ${lineNum}: Possible assignment in condition: ${line.trim()}`);
        }
      }
    }
  }

  _checkFunctionCalls(code) {
    this.logger.info('Checking function calls');

    // VBScript allows function calls without parentheses
    // Check for patterns like: object.method "string" or object.method variable
    const vbStyleCalls = code.match(/\w+\.\w+\s+"[^"]*"/g);
    if (vbStyleCalls && vbStyleCalls.length > 0) {
      for (const call of vbStyleCalls) {
        if (!call.includes('(')) {
          this.issues.push(`VBScript-style function call without parentheses: ${call}`);
        }
      }
    }
  }

  _checkStringConcatenation(code) {
    this.logger.info('Checking string concatenation');

    // Check for & that wasn't converted to +
    const ampersands = code.match(/[^&]&[^&]/g);
    if (ampersands) {
      this.warnings.push(`Found ${ampersands.length} possible unconverted & operators`);
    }
  }

  _checkVBScriptRemnants(code) {
    this.logger.info('Checking for VBScript remnants');

    const vbKeywords = ['dim ', 'then ', 'wend', 'msgbox ', 'inputbox ', ' or ', ' and ', ' not '];
    const found = [];

    for (const keyword of vbKeywords) {
      if (code.toLowerCase().includes(keyword)) {
        found.push(keyword.trim());
      }
    }

    if (found.length > 0) {
      this.warnings.push(`Found VBScript keywords: ${found.join(', ')}`);
    }
  }

  _checkSyntax(jsFilePath) {
    this.logger.info('Checking JavaScript syntax');

    try {
      import('child_process').then(({ execSync }) => {
        execSync(`node --check ${jsFilePath}`, { encoding: 'utf-8' });
        this.logger.success('Syntax check passed');
      });
    } catch (error) {
      this.issues.push(`Syntax error: ${error.message}`);
    }
  }

  _reportResults() {
    console.log('\n');
    console.log('='.repeat(80));
    console.log('COMPREHENSIVE VALIDATION RESULTS');
    console.log('='.repeat(80));
    console.log('');

    if (this.issues.length === 0) {
      this.logger.success('✅ NO CRITICAL ISSUES FOUND');
    } else {
      this.logger.error(`❌ FOUND ${this.issues.length} CRITICAL ISSUES:`);
      for (const issue of this.issues) {
        console.log(`  - ${issue}`);
      }
    }

    console.log('');

    if (this.warnings.length === 0) {
      this.logger.success('✅ NO WARNINGS');
    } else {
      this.logger.warning(`⚠️  FOUND ${this.warnings.length} WARNINGS:`);
      for (const warning of this.warnings) {
        console.log(`  - ${warning}`);
      }
    }

    console.log('');
    console.log('='.repeat(80));
  }
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const validator = new ComprehensiveValidator();
  const filePath = process.argv[2] || 'output/javascript/transpiled.js';
  
  const success = validator.validate(filePath);
  process.exit(success ? 0 : 1);
}

export default ComprehensiveValidator;
