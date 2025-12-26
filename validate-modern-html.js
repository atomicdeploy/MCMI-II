#!/usr/bin/env node

/**
 * Validation script for MCMI2-modern.html
 * Checks that the file is properly structured and contains expected elements
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Validating MCMI2-modern.html...\n');

const modernHtmlPath = path.join(__dirname, 'MCMI2-modern.html');

try {
  const html = fs.readFileSync(modernHtmlPath, 'utf-8');
  
  let errors = 0;
  let warnings = 0;
  
  // Check 1: File exists and has content
  console.log('✓ File exists and loaded');
  console.log(`  Size: ${(html.length / 1024).toFixed(2)} KB`);
  
  // Check 2: Has DOCTYPE and HTML tags
  if (html.includes('<!DOCTYPE') && html.includes('<HTML>')) {
    console.log('✓ HTML structure present');
  } else {
    console.log('✗ Missing HTML structure');
    errors++;
  }
  
  // Check 3: Has all 175 questions (R1 through R175)
  const questionCount = (html.match(/name=R\d+/g) || []).length / 2; // divided by 2 because each question has 2 radio buttons
  if (questionCount === 175) {
    console.log(`✓ All 175 questions present (${questionCount * 2} radio buttons found)`);
  } else {
    console.log(`✗ Expected 175 questions, found ${questionCount}`);
    errors++;
  }
  
  // Check 4: No VBScript tags
  if (html.includes('language=vbscript')) {
    console.log('✗ VBScript tags still present');
    errors++;
  } else {
    console.log('✓ No VBScript tags (replaced with JavaScript)');
  }
  
  // Check 5: Has JavaScript tag
  if (html.includes('type="text/javascript"')) {
    console.log('✓ JavaScript tag present');
  } else {
    console.log('✗ Missing JavaScript tag');
    errors++;
  }
  
  // Check 6: Has k variable initialization
  if (html.includes('const k = document.frm1')) {
    console.log('✓ Form reference variable (k) initialized');
  } else {
    console.log('⚠ Warning: k variable initialization not found');
    warnings++;
  }
  
  // Check 7: Has transpiled functions
  const functionCount = (html.match(/function \w+\(/g) || []).length;
  if (functionCount >= 80) {
    console.log(`✓ Transpiled functions present (${functionCount} functions found)`);
  } else {
    console.log(`⚠ Warning: Expected 80+ functions, found ${functionCount}`);
    warnings++;
  }
  
  // Check 8: Has form element
  if (html.includes('name=frm1')) {
    console.log('✓ Form element (frm1) present');
  } else {
    console.log('✗ Missing form element');
    errors++;
  }
  
  // Check 9: Has Submit button
  if (html.includes('type=button') && html.includes('Submit')) {
    console.log('✓ Submit button present');
  } else {
    console.log('⚠ Warning: Submit button may be missing');
    warnings++;
  }
  
  // Check 10: Has closing tags
  if (html.includes('</SCRIPT>') && html.includes('</BODY>') && html.includes('</HTML>')) {
    console.log('✓ All closing tags present');
  } else {
    console.log('✗ Missing closing tags');
    errors++;
  }
  
  // Check 11: Verify no duplicate script tags
  const scriptOpenCount = (html.match(/<SCRIPT/gi) || []).length;
  const scriptCloseCount = (html.match(/<\/SCRIPT>/gi) || []).length;
  if (scriptOpenCount === scriptCloseCount) {
    console.log(`✓ Script tags balanced (${scriptOpenCount} opening, ${scriptCloseCount} closing)`);
  } else {
    console.log(`✗ Script tags unbalanced (${scriptOpenCount} opening, ${scriptCloseCount} closing)`);
    errors++;
  }
  
  // Check 12: Check for Persian text
  if (html.includes('کلیدگذاری MCMI-II')) {
    console.log('✓ Persian text preserved');
  } else {
    console.log('⚠ Warning: Persian text may be missing');
    warnings++;
  }
  
  console.log('\n📊 Validation Summary:');
  console.log(`   Errors: ${errors}`);
  console.log(`   Warnings: ${warnings}`);
  
  if (errors === 0 && warnings === 0) {
    console.log('\n✅ Validation PASSED - File is properly structured!');
    process.exit(0);
  } else if (errors === 0) {
    console.log('\n⚠️  Validation PASSED with warnings - File should work but review warnings');
    process.exit(0);
  } else {
    console.log('\n❌ Validation FAILED - File has structural errors');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error validating file:', error.message);
  process.exit(1);
}
