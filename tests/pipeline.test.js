/**
 * Integration tests for the complete pipeline
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

describe('Pipeline Integration', () => {
  it('should have generated all required output files', () => {
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
      const fullPath = join(rootDir, file);
      assert.ok(existsSync(fullPath), `Should have generated ${file}`);
    });
  });

  it('should have valid JSON files', () => {
    const jsonFiles = [
      'output/json/questions.json',
      'output/json/vbscript-metadata.json',
      'output/json/engine-structure.json'
    ];

    jsonFiles.forEach(file => {
      const content = readFileSync(join(rootDir, file), 'utf8');
      assert.doesNotThrow(() => {
        JSON.parse(content);
      }, `${file} should be valid JSON`);
    });
  });

  it('should have correct question count in JSON', () => {
    const questions = JSON.parse(
      readFileSync(join(rootDir, 'output/json/questions.json'), 'utf8')
    );

    assert.equal(questions.totalQuestions, 175, 'Should have 175 total questions');
    assert.equal(questions.questions.length, 175, 'Questions array should have 175 items');
  });

  it('should preserve Persian text in questions JSON', () => {
    const questions = JSON.parse(
      readFileSync(join(rootDir, 'output/json/questions.json'), 'utf8')
    );

    let persianCount = 0;
    questions.questions.forEach(q => {
      if (/[\u0600-\u06FF]/.test(q.text)) {
        persianCount++;
      }
    });

    assert.ok(persianCount >= 170, `Should preserve Persian text, found in ${persianCount} questions`);
  });

  it('should have documented all functions in metadata', () => {
    const metadata = JSON.parse(
      readFileSync(join(rootDir, 'output/json/vbscript-metadata.json'), 'utf8')
    );

    assert.ok(metadata.functions.length >= 80, `Should document at least 80 functions, found ${metadata.functions.length}`);
  });

  it('should have documented all variables in metadata', () => {
    const metadata = JSON.parse(
      readFileSync(join(rootDir, 'output/json/vbscript-metadata.json'), 'utf8')
    );

    assert.ok(metadata.variables.length >= 60, `Should document at least 60 variables, found ${metadata.variables.length}`);
  });

  it('should have similar line counts between VBScript and JavaScript', () => {
    const vbscript = readFileSync(
      join(rootDir, 'output/javascript/original-vbscript.vbs'),
      'utf8'
    );
    const javascript = readFileSync(
      join(rootDir, 'output/javascript/transpiled.js'),
      'utf8'
    );

    const vbLines = vbscript.split('\n').length;
    const jsLines = javascript.split('\n').length;

    // Should be within 20% of each other
    const ratio = jsLines / vbLines;
    assert.ok(ratio > 0.8 && ratio < 1.2, `Line counts should be similar, ratio: ${ratio.toFixed(2)}`);
  });

  it('should have valid HTML fragments', () => {
    const fragment = readFileSync(
      join(rootDir, 'output/html/question-fragment.html'),
      'utf8'
    );
    const form = readFileSync(
      join(rootDir, 'output/html/assessment-form.html'),
      'utf8'
    );

    assert.ok(fragment.includes('<div'), 'Fragment should be valid HTML');
    assert.ok(form.includes('<!DOCTYPE html>'), 'Form should have DOCTYPE');
    assert.ok(form.includes('<form'), 'Form should have form element');
  });

  it('should have engine structure documentation', () => {
    const engine = JSON.parse(
      readFileSync(join(rootDir, 'output/json/engine-structure.json'), 'utf8')
    );

    assert.ok(engine.functions, 'Should document functions');
    assert.ok(engine.dataStructures, 'Should document data structures');
    assert.ok(Array.isArray(engine.functions), 'Functions should be an array');
    assert.ok(Array.isArray(engine.dataStructures), 'Data structures should be an array');
  });

  it('should have no missing questions', () => {
    const questions = JSON.parse(
      readFileSync(join(rootDir, 'output/json/questions.json'), 'utf8')
    );

    for (let i = 1; i <= 175; i++) {
      const question = questions.questions.find(q => q.number === i);
      assert.ok(question, `Question ${i} should exist`);
    }
  });
});
