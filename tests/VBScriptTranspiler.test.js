/**
 * Tests for VBScriptTranspiler
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import VBScriptTranspiler from '../src/transpiler/VBScriptTranspiler.js';

describe('VBScriptTranspiler', () => {
  it('should convert dim declarations to let/const', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'dim x\ndim y(10)';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('let x'), 'Should convert dim to let');
    assert.ok(result.includes('const y = new Array'), 'Should convert dim array to const Array');
  });

  it('should convert function declarations', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'function test()\n  test=5\nend function';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('function test()'), 'Should convert function declaration');
    assert.ok(result.includes('return'), 'Should add return statement');
    assert.ok(result.includes('}'), 'Should close with brace');
  });

  it('should convert sub declarations', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'sub initialize()\n  x=1\nend sub';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('function initialize()'), 'Should convert sub to function');
    assert.ok(result.includes('{'), 'Should open with brace');
    assert.ok(result.includes('}'), 'Should close with brace');
  });

  it('should convert if-then-else statements', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'if x=1 then\n  y=2\nelse\n  y=3\nend if';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('if ('), 'Should convert if statement');
    assert.ok(result.includes('} else {'), 'Should convert else');
    assert.ok(!result.includes('end if'), 'Should remove end if');
  });

  it('should convert VBScript operators to JavaScript', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'if x and y or z then';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('&&'), 'Should convert and to &&');
    assert.ok(result.includes('||'), 'Should convert or to ||');
  });

  it('should convert string concatenation', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'msg = "Hello" & " World"';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('+'), 'Should convert & to +');
    assert.ok(!result.includes(' & '), 'Should not have VBScript concatenation');
  });

  it('should convert for-next loops', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'for i=1 to 10\n  sum=sum+i\nnext';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('for (let i'), 'Should convert for loop');
    assert.ok(result.includes('i++'), 'Should add increment');
    assert.ok(!result.includes('next'), 'Should remove next keyword');
  });

  it('should convert comments', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = "' This is a comment\ndim x";
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('//'), 'Should convert VBScript comment to JS comment');
  });

  it('should convert set statements', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'set obj=createobject("test")';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('const obj'), 'Should convert set to const');
  });

  it('should handle equality comparisons', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'if x=true then\nif y=false then';
    const result = transpiler.transpile(vbscript);

    assert.ok(result.includes('==='), 'Should use strict equality');
  });

  it('should handle FileSystemObject gracefully', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'set fso=createobject("scripting.filesystemobject")';
    const result = transpiler.transpile(vbscript);

    // Should comment out or handle FileSystemObject
    assert.ok(result.includes('/*') || result.includes('null'), 'Should handle FileSystemObject');
  });

  it('should preserve line structure approximately', () => {
    const transpiler = new VBScriptTranspiler();
    const vbscript = 'dim x\ndim y\ndim z';
    const result = transpiler.transpile(vbscript);

    const inputLines = vbscript.split('\n').length;
    const outputLines = result.split('\n').length;

    // Should be roughly the same number of lines (within 50% difference)
    const ratio = outputLines / inputLines;
    assert.ok(ratio > 0.5 && ratio < 2, `Line count should be similar, ratio: ${ratio}`);
  });
});
