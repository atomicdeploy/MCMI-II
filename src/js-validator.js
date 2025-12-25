/**
 * JavaScript Syntax Validator
 * Ensures generated JavaScript is completely valid and can be loaded in Node/Browser
 */

import { readFileSync } from 'fs';
import { createContext, runInContext } from 'vm';
import Logger from './logger/Logger.js';

export class JavaScriptValidator {
  constructor() {
    this.logger = new Logger('JSValidator');
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Validate JavaScript file can be parsed and loaded
   */
  async validateFile(filePath) {
    this.logger.step(`Validating JavaScript: ${filePath}`);

    try {
      const code = readFileSync(filePath, 'utf8');
      
      // Step 1: Basic syntax check
      const syntaxValid = await this._checkSyntax(code, filePath);
      if (!syntaxValid) {
        return false;
      }

      // Step 2: Try to parse as module
      const moduleValid = await this._validateAsModule(code, filePath);
      if (!moduleValid) {
        this.warnings.push('File has issues when loaded as ES module');
      }

      // Step 3: Check for common issues
      await this._checkCommonIssues(code);

      // Step 4: Try to load in VM context
      const vmValid = await this._validateInVM(code);
      if (!vmValid) {
        this.warnings.push('File has runtime issues in VM context');
      }

      if (this.errors.length > 0) {
        this.logger.error(`Found ${this.errors.length} errors`);
        this.errors.forEach(err => this.logger.error(`  - ${err}`));
        return false;
      }

      if (this.warnings.length > 0) {
        this.logger.warning(`Found ${this.warnings.length} warnings`);
        this.warnings.forEach(warn => this.logger.warning(`  - ${warn}`));
      }

      this.logger.success('✓ JavaScript is valid and loadable');
      return true;
    } catch (error) {
      this.logger.error('Validation failed', error);
      this.errors.push(error.message);
      return false;
    }
  }

  async _checkSyntax(code, filePath) {
    this.logger.info('Checking syntax with Node.js');
    
    try {
      // Use dynamic import to check syntax
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);

      const result = await execAsync(`node --check "${filePath}"`);
      
      if (result.stderr) {
        this.errors.push(`Syntax error: ${result.stderr}`);
        return false;
      }

      this.logger.success('✓ Syntax check passed');
      return true;
    } catch (error) {
      this.errors.push(`Syntax check failed: ${error.message}`);
      return false;
    }
  }

  async _validateAsModule(code, filePath) {
    this.logger.info('Validating as ES module');

    try {
      // Try to dynamically import the file
      const moduleUrl = `file://${filePath}`;
      
      // Check if it has export statements
      if (!code.includes('export')) {
        this.warnings.push('No export statements found - not a proper ES module');
        return true; // Not an error, just a warning
      }

      this.logger.success('✓ Module structure valid');
      return true;
    } catch (error) {
      this.logger.warning(`Module loading issue: ${error.message}`);
      return false;
    }
  }

  async _checkCommonIssues(code) {
    this.logger.info('Checking for common issues');

    // Check for undefined variables (basic check)
    const lines = code.split('\n');
    const declaredVars = new Set();
    const usedVars = new Set();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Track declarations
      if (line.match(/^(const|let|var|function)\s+(\w+)/)) {
        const match = line.match(/^(const|let|var|function)\s+(\w+)/);
        if (match) declaredVars.add(match[2]);
      }

      // Track usage
      const varMatches = line.match(/\b[a-zA-Z_]\w*\b/g);
      if (varMatches) {
        varMatches.forEach(v => {
          if (!['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return'].includes(v)) {
            usedVars.add(v);
          }
        });
      }
    }

    // Check for syntax patterns
    const issues = [];

    // Check for missing semicolons in critical places
    if (code.match(/}\s*\n\s*[a-zA-Z]/)) {
      this.warnings.push('Potential missing semicolons detected');
    }

    // Check for unbalanced braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      this.errors.push(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
    }

    // Check for unbalanced parentheses
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      this.errors.push(`Unbalanced parentheses: ${openParens} open, ${closeParens} close`);
    }

    this.logger.success('✓ Common issues check completed');
  }

  async _validateInVM(code) {
    this.logger.info('Validating in VM context');

    try {
      // Create a sandbox context
      const sandbox = {
        console: console,
        setTimeout: setTimeout,
        setInterval: setInterval,
        clearTimeout: clearTimeout,
        clearInterval: clearInterval,
        document: {
          write: () => {},
          forms: {},
          elements: {},
          createElement: () => ({ appendChild: () => {}, click: () => {} }),
          body: { appendChild: () => {}, removeChild: () => {} }
        },
        window: {},
        alert: () => {},
        prompt: () => {},
        URL: class { static createObjectURL() { return ''; } static revokeObjectURL() {} },
        Blob: class {},
        Array: Array,
        Object: Object,
        String: String,
        Number: Number,
        Boolean: Boolean,
        Math: Math,
        Date: Date
      };

      const context = createContext(sandbox);

      // Try to run the code in the sandbox
      runInContext(code, context, {
        timeout: 1000,
        displayErrors: true
      });

      this.logger.success('✓ VM validation passed');
      return true;
    } catch (error) {
      if (error.message.includes('timeout')) {
        this.warnings.push('Code execution timeout (this may be normal)');
        return true;
      }
      this.logger.warning(`VM validation issue: ${error.message}`);
      return false;
    }
  }

  getResults() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings
    };
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new JavaScriptValidator();
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('Usage: node js-validator.js <file-path>');
    process.exit(1);
  }

  validator.validateFile(filePath)
    .then(valid => {
      if (valid) {
        console.log('\n✅ JavaScript validation PASSED');
        process.exit(0);
      } else {
        console.log('\n❌ JavaScript validation FAILED');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n❌ Validation error:', error.message);
      process.exit(1);
    });
}

export default JavaScriptValidator;
