/**
 * Tests for HTMLParser
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import HTMLParser from '../src/parser/HTMLParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

describe('HTMLParser', () => {
  it('should parse the HTML file successfully', () => {
    const parser = new HTMLParser(join(rootDir, 'MCMI2_DRS.html'));
    const result = parser.parse();

    assert.ok(result, 'Parser should return a result');
    assert.ok(result.questions, 'Result should have questions');
    assert.ok(result.metadata, 'Result should have metadata');
    assert.equal(result.totalQuestions, 175, 'Should have 175 questions');
  });

  it('should extract all 175 questions', () => {
    const parser = new HTMLParser(join(rootDir, 'MCMI2_DRS.html'));
    parser.parse();

    assert.equal(parser.questions.length, 175, 'Should extract exactly 175 questions');
  });

  it('should extract questions with correct structure', () => {
    const parser = new HTMLParser(join(rootDir, 'MCMI2_DRS.html'));
    parser.parse();

    const firstQuestion = parser.questions[0];
    assert.ok(firstQuestion.id, 'Question should have id');
    assert.ok(firstQuestion.number, 'Question should have number');
    assert.ok(firstQuestion.text, 'Question should have text');
    assert.ok(firstQuestion.fieldName, 'Question should have fieldName');
    assert.equal(firstQuestion.type, 'radio', 'Question type should be radio');
    assert.ok(Array.isArray(firstQuestion.options), 'Question should have options array');
  });

  it('should preserve Persian text', () => {
    const parser = new HTMLParser(join(rootDir, 'MCMI2_DRS.html'));
    parser.parse();

    let persianCount = 0;
    parser.questions.forEach(q => {
      // Check for Persian characters (Unicode range 0600-06FF)
      if (/[\u0600-\u06FF]/.test(q.text)) {
        persianCount++;
      }
    });

    assert.ok(persianCount >= 170, `Should preserve Persian text in most questions, found ${persianCount}`);
  });

  it('should extract metadata correctly', () => {
    const parser = new HTMLParser(join(rootDir, 'MCMI2_DRS.html'));
    parser.parse();

    assert.equal(parser.metadata.title, 'MCMI-II', 'Title should be MCMI-II');
    assert.equal(parser.metadata.formName, 'frm1', 'Form name should be frm1');
    assert.equal(parser.metadata.encoding, 'UTF-8', 'Encoding should be UTF-8');
  });

  it('should have unique question numbers', () => {
    const parser = new HTMLParser(join(rootDir, 'MCMI2_DRS.html'));
    parser.parse();

    const numbers = parser.questions.map(q => q.number);
    const uniqueNumbers = new Set(numbers);
    assert.equal(uniqueNumbers.size, 175, 'All question numbers should be unique');
  });

  it('should have sequential question numbers from 1 to 175', () => {
    const parser = new HTMLParser(join(rootDir, 'MCMI2_DRS.html'));
    parser.parse();

    for (let i = 1; i <= 175; i++) {
      const question = parser.questions.find(q => q.number === i);
      assert.ok(question, `Should have question ${i}`);
    }
  });

  it('should generate valid JSON output', () => {
    const parser = new HTMLParser(join(rootDir, 'MCMI2_DRS.html'));
    parser.parse();

    const json = parser.getQuestionsJSON();
    assert.ok(json.assessment, 'JSON should have assessment field');
    assert.ok(json.version, 'JSON should have version field');
    assert.equal(json.totalQuestions, 175, 'JSON should show 175 total questions');
    assert.ok(Array.isArray(json.questions), 'JSON should have questions array');
  });
});
