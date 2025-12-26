/**
 * Validation Script for MCMI-II Parser Outputs
 * Verifies all generated files are correct and complete
 */

import { readFileSync, existsSync } from 'fs';
import Logger from './logger/Logger.js';

class Validator {
  constructor() {
    this.logger = new Logger('Validator');
    this.errors = [];
    this.warnings = [];
  }

  validate() {
    this.logger.separator();
    this.logger.step('🔍 Validating MCMI-II Parser Outputs');
    this.logger.separator();

    this.validateFileStructure();
    this.validateJSONFiles();
    this.validateJavaScriptFiles();
    this.validateHTMLFiles();
    this.validateContent();

    this.logger.separator();
    if (this.errors.length === 0) {
      this.logger.complete('✨ All validations passed!');
    } else {
      this.logger.error(`Found ${this.errors.length} errors`);
      this.errors.forEach(err => this.logger.error(`  - ${err}`));
    }

    if (this.warnings.length > 0) {
      this.logger.warning(`Found ${this.warnings.length} warnings`);
      this.warnings.forEach(warn => this.logger.warning(`  - ${warn}`));
    }
    this.logger.separator();

    return this.errors.length === 0;
  }

  validateFileStructure() {
    this.logger.step('Validating file structure');

    const requiredFiles = [
      'output/json/questions.json',
      'output/json/vbscript-metadata.json',
      'output/json/engine-structure.json',
      'output/javascript/original-vbscript.vbs',
      'output/javascript/transpiled.js',
      'output/html/question-fragment.html',
      'output/html/assessment-form.html'
    ];

    requiredFiles.forEach(file => {
      if (existsSync(file)) {
        this.logger.success(`✓ ${file}`);
      } else {
        this.errors.push(`Missing file: ${file}`);
        this.logger.error(`✗ ${file}`);
      }
    });
  }

  validateJSONFiles() {
    this.logger.step('Validating JSON files');

    // Validate questions.json
    try {
      const questions = JSON.parse(readFileSync('output/json/questions.json', 'utf8'));

      if (questions.totalQuestions !== 175) {
        this.errors.push(`Expected 175 questions, found ${questions.totalQuestions}`);
      } else {
        this.logger.success(`✓ Questions count: ${questions.totalQuestions}`);
      }

      if (questions.questions.length !== 175) {
        this.errors.push(`Expected 175 questions array, found ${questions.questions.length}`);
      } else {
        this.logger.success(`✓ Questions array length: ${questions.questions.length}`);
      }

      // Check for missing questions
      for (let i = 1; i <= 175; i++) {
        const question = questions.questions.find(q => q.number === i);
        if (!question) {
          this.errors.push(`Missing question ${i}`);
        }
      }

      // Check question structure
      const sampleQ = questions.questions[0];
      if (!sampleQ.id || !sampleQ.number || !sampleQ.text || !sampleQ.fieldName) {
        this.errors.push('Question structure incomplete');
      } else {
        this.logger.success('✓ Question structure valid');
      }

    } catch (error) {
      this.errors.push(`Invalid JSON in questions.json: ${error.message}`);
    }

    // Validate vbscript-metadata.json
    try {
      const metadata = JSON.parse(readFileSync('output/json/vbscript-metadata.json', 'utf8'));

      if (!metadata.functions || !Array.isArray(metadata.functions)) {
        this.errors.push('VBScript metadata missing functions array');
      } else {
        this.logger.success(`✓ Functions documented: ${metadata.functions.length}`);
      }

      if (!metadata.variables || !Array.isArray(metadata.variables)) {
        this.errors.push('VBScript metadata missing variables array');
      } else {
        this.logger.success(`✓ Variables documented: ${metadata.variables.length}`);
      }

    } catch (error) {
      this.errors.push(`Invalid JSON in vbscript-metadata.json: ${error.message}`);
    }

    // Validate engine-structure.json
    try {
      const engine = JSON.parse(readFileSync('output/json/engine-structure.json', 'utf8'));

      if (!engine.functions || !engine.dataStructures) {
        this.errors.push('Engine structure incomplete');
      } else {
        this.logger.success('✓ Engine structure valid');
      }

    } catch (error) {
      this.errors.push(`Invalid JSON in engine-structure.json: ${error.message}`);
    }
  }

  validateJavaScriptFiles() {
    this.logger.step('Validating JavaScript files');

    // Check VBScript file
    try {
      const vbscript = readFileSync('output/javascript/original-vbscript.vbs', 'utf8');
      const lines = vbscript.split('\n').length;

      if (lines < 4000) {
        this.warnings.push(`VBScript seems short: ${lines} lines`);
      } else {
        this.logger.success(`✓ VBScript extracted: ${lines} lines`);
      }

      // Check for key VBScript patterns
      if (!vbscript.includes('function') && !vbscript.includes('sub')) {
        this.errors.push('VBScript missing function definitions');
      }

    } catch (error) {
      this.errors.push(`Cannot read VBScript file: ${error.message}`);
    }

    // Check transpiled JavaScript
    try {
      const js = readFileSync('output/javascript/transpiled.js', 'utf8');
      const lines = js.split('\n').length;

      this.logger.success(`✓ JavaScript generated: ${lines} lines`);

      // Check for successful transpilation markers
      if (js.includes('dim ')) {
        this.warnings.push('JavaScript still contains "dim" keyword - transpilation incomplete');
      }

      if (js.includes(' and ') || js.includes(' or ')) {
        this.warnings.push('JavaScript may contain VBScript operators - needs review');
      }

    } catch (error) {
      this.errors.push(`Cannot read JavaScript file: ${error.message}`);
    }
  }

  validateHTMLFiles() {
    this.logger.step('Validating HTML files');

    // Check question fragment
    try {
      const fragment = readFileSync('output/html/question-fragment.html', 'utf8');

      if (!fragment.includes('<div class="question"')) {
        this.errors.push('Question fragment missing expected structure');
      } else {
        this.logger.success('✓ Question fragment valid');
      }

    } catch (error) {
      this.errors.push(`Cannot read question fragment: ${error.message}`);
    }

    // Check assessment form
    try {
      const form = readFileSync('output/html/assessment-form.html', 'utf8');

      if (!form.includes('<!DOCTYPE html>')) {
        this.warnings.push('Assessment form missing DOCTYPE');
      }

      if (!form.includes('<form')) {
        this.errors.push('Assessment form missing form element');
      } else {
        this.logger.success('✓ Assessment form valid');
      }

    } catch (error) {
      this.errors.push(`Cannot read assessment form: ${error.message}`);
    }
  }

  validateContent() {
    this.logger.step('Validating content quality');

    try {
      const questions = JSON.parse(readFileSync('output/json/questions.json', 'utf8'));

      // Check for Persian text
      let persianCount = 0;
      questions.questions.forEach(q => {
        // Persian characters range
        if (/[\u0600-\u06FF]/.test(q.text)) {
          persianCount++;
        }
      });

      if (persianCount < 170) {
        this.warnings.push(`Only ${persianCount} questions have Persian text`);
      } else {
        this.logger.success(`✓ Persian text preserved: ${persianCount} questions`);
      }

      // Check for empty questions
      const emptyQuestions = questions.questions.filter(q => !q.text || q.text.trim() === '');
      if (emptyQuestions.length > 0) {
        this.warnings.push(`${emptyQuestions.length} questions have empty text`);
      }

    } catch (error) {
      this.errors.push(`Content validation failed: ${error.message}`);
    }
  }
}

// Run validation
const validator = new Validator();
const success = validator.validate();

process.exit(success ? 0 : 1);
