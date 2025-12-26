/**
 * Tests for MCMI2-modern.html
 * Validates the modern HTML file structure and content
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

describe('MCMI2-modern.html', () => {
  const modernHtmlPath = join(rootDir, 'MCMI2-modern.html');

  it('should exist', () => {
    assert.ok(existsSync(modernHtmlPath), 'MCMI2-modern.html should exist. Run "npm run build:modern" to generate it.');
  });

  it('should have valid HTML structure', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    assert.ok(html.includes('<!DOCTYPE'), 'Should have DOCTYPE declaration');
    assert.ok(html.includes('<HTML>'), 'Should have HTML tag');
    assert.ok(html.includes('</HTML>'), 'Should have closing HTML tag');
  });

  it('should contain all 175 questions', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    // Count unique question names (each question has exactly 2 radio buttons)
    const questionMatches = html.match(/name=["']?R(\d+)["']?/g) || [];
    const uniqueQuestions = new Set();
    questionMatches.forEach(match => {
      const num = match.match(/R(\d+)/)[1];
      uniqueQuestions.add(parseInt(num));
    });
    
    assert.equal(uniqueQuestions.size, 175, 'Should have all 175 questions');
    assert.equal(questionMatches.length, 350, 'Should have 350 radio buttons (2 per question)');
  });

  it('should have no VBScript tags', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    assert.ok(!html.includes('language=vbscript'), 'Should not contain VBScript tags');
    assert.ok(!html.includes('language="vbscript"'), 'Should not contain VBScript tags');
  });

  it('should have JavaScript with defer attribute', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    assert.ok(html.includes('type="text/javascript"'), 'Should have JavaScript tag');
    assert.ok(html.includes('defer'), 'JavaScript should have defer attribute');
  });

  it('should initialize k variable for form reference', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    assert.ok(
      html.includes('let k = document.frm1') || html.includes('const k = document.frm1'),
      'Should initialize k variable for form reference'
    );
  });

  it('should have transpiled functions', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    const functionCount = (html.match(/function \w+\(/g) || []).length;
    assert.ok(functionCount >= 84, `Should have at least 84 transpiled functions, found ${functionCount}`);
  });

  it('should preserve Persian text', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    assert.ok(html.includes('کلیدگذاری MCMI-II'), 'Should preserve Persian text');
  });

  it('should have form element', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    assert.ok(html.includes('name=frm1'), 'Should have form element named frm1');
  });

  it('should have submit button', () => {
    const html = readFileSync(modernHtmlPath, 'utf-8');
    
    assert.ok(html.includes('type=button'), 'Should have button element');
    assert.ok(html.includes('Submit'), 'Should have Submit button text');
  });
});
