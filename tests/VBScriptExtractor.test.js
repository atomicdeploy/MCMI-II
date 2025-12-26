/**
 * Tests for VBScriptExtractor
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import VBScriptExtractor from '../src/parser/VBScriptExtractor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

describe('VBScriptExtractor', () => {
  it('should extract VBScript code successfully', () => {
    const extractor = new VBScriptExtractor(join(rootDir, 'MCMI2_DRS.html'));
    const result = extractor.extract();

    assert.ok(result, 'Extractor should return a result');
    assert.ok(result.code, 'Result should have code');
    assert.ok(result.functions, 'Result should have functions');
    assert.ok(result.variables, 'Result should have variables');
  });

  it('should extract all VBScript lines', () => {
    const extractor = new VBScriptExtractor(join(rootDir, 'MCMI2_DRS.html'));
    const result = extractor.extract();

    // VBScript block is ~4430 lines
    assert.ok(result.lineCount >= 4400, `Should extract at least 4400 lines, got ${result.lineCount}`);
    assert.ok(result.lineCount <= 4450, `Should not exceed 4450 lines, got ${result.lineCount}`);
  });

  it('should identify all functions', () => {
    const extractor = new VBScriptExtractor(join(rootDir, 'MCMI2_DRS.html'));
    const result = extractor.extract();

    assert.ok(result.functions.length >= 80, `Should find at least 80 functions, found ${result.functions.length}`);

    // Check for known scoring functions
    const functionNames = result.functions.map(f => f.name);
    assert.ok(functionNames.includes('v'), 'Should have validity function v()');
    assert.ok(functionNames.includes('pp'), 'Should have pp() function');
    assert.ok(functionNames.includes('cc'), 'Should have cc() function');
    assert.ok(functionNames.includes('ss'), 'Should have ss() function');
  });

  it('should identify variable declarations', () => {
    const extractor = new VBScriptExtractor(join(rootDir, 'MCMI2_DRS.html'));
    const result = extractor.extract();

    assert.ok(result.variables.length >= 60, `Should find at least 60 variables, found ${result.variables.length}`);

    // Check for known arrays
    const variableNames = result.variables.map(v => v.name);
    assert.ok(variableNames.includes('w'), 'Should have w array');
    assert.ok(variableNames.includes('r'), 'Should have r array');
    assert.ok(variableNames.includes('rawbr'), 'Should have rawbr array');
  });

  it('should correctly identify array variables', () => {
    const extractor = new VBScriptExtractor(join(rootDir, 'MCMI2_DRS.html'));
    const result = extractor.extract();

    const arrays = result.variables.filter(v => v.isArray);
    assert.ok(arrays.length > 0, 'Should identify array variables');

    const wArray = result.variables.find(v => v.name === 'w');
    if (wArray) {
      assert.ok(wArray.isArray, 'w should be identified as an array');
      assert.ok(wArray.arraySize, 'w array should have a size');
    }
  });

  it('should distinguish between functions and subs', () => {
    const extractor = new VBScriptExtractor(join(rootDir, 'MCMI2_DRS.html'));
    const result = extractor.extract();

    const functions = result.functions.filter(f => f.type === 'function');
    const subs = result.functions.filter(f => f.type === 'sub');

    assert.ok(functions.length > 0, 'Should find function declarations');
    assert.ok(subs.length > 0, 'Should find sub declarations');
  });

  it('should extract complete VBScript block', () => {
    const extractor = new VBScriptExtractor(join(rootDir, 'MCMI2_DRS.html'));
    const result = extractor.extract();

    // Check that the code contains key VBScript patterns
    assert.ok(result.code.includes('function'), 'Should contain function declarations');
    assert.ok(result.code.includes('dim'), 'Should contain dim statements');
    assert.ok(result.code.includes('if'), 'Should contain if statements');
    assert.ok(result.code.includes('end function') || result.code.includes('end sub'), 'Should contain end statements');
  });

  it('should provide accurate metadata', () => {
    const extractor = new VBScriptExtractor(join(rootDir, 'MCMI2_DRS.html'));
    const info = extractor.getVBScriptInfo();

    assert.equal(typeof info.totalLines, 'number', 'totalLines should be a number');
    assert.ok(Array.isArray(info.functions), 'functions should be an array');
    assert.ok(Array.isArray(info.variables), 'variables should be an array');
    assert.equal(typeof info.code, 'string', 'code should be a string');
  });
});
