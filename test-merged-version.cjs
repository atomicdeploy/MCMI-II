// Test script for MCMI2-v2.html validation
// This script validates the structure and features of the unified file

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing MCMI2-v2.html...\n');

const filePath = path.join(__dirname, 'merged', 'MCMI2-v2.html');

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.error('❌ File not found:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

console.log('✅ File loaded successfully');
console.log(`📄 File size: ${(content.length / 1024).toFixed(2)} KB`);
console.log(`📝 Total lines: ${lines.length}\n`);

// Test 1: Check for all required features
console.log('🔍 Testing for required features...');

const features = {
  'Import/Export JSON': /exportAnswers\(\)/,
  'Import/Export CSV': /exportAnswersCSV\(\)/,
  'Import function': /importAnswers\(/,
  'LocalStorage save': /saveToLocalStorage\(\)/,
  'LocalStorage load': /loadFromLocalStorage\(\)/,
  'LocalStorage clear': /clearLocalStorage\(\)/,
  'Auto-save toggle': /toggleAutoSave\(/,
  'Device interface': /devicePanel/,
  'Device connect': /connectToDevice\(\)/,
  'Device read memory': /readDeviceMemory\(\)/,
  'Device reset': /resetDeviceMemory\(\)/,
  'Get all answers': /getAllAnswers\(\)/,
  'Set all answers': /setAllAnswers\(/,
  'Status notifications': /showStatus\(/,
  'Process device data': /processDeviceData\(/
};

let passedFeatures = 0;
for (const [featureName, pattern] of Object.entries(features)) {
  if (pattern.test(content)) {
    console.log(`  ✅ ${featureName}`);
    passedFeatures++;
  } else {
    console.log(`  ❌ ${featureName} - NOT FOUND`);
  }
}

console.log(`\n📊 Features found: ${passedFeatures}/${Object.keys(features).length}\n`);

// Test 2: Check for all 175 questions
console.log('🔍 Testing for all 175 questions...');

const questionPattern = /name=R(\d+)/g;
const questions = new Set();
let match;

while ((match = questionPattern.exec(content)) !== null) {
  questions.add(parseInt(match[1]));
}

const missingQuestions = [];
for (let i = 1; i <= 175; i++) {
  if (!questions.has(i)) {
    missingQuestions.push(i);
  }
}

if (missingQuestions.length === 0) {
  console.log('  ✅ All 175 questions found');
} else {
  console.log(`  ❌ Missing questions: ${missingQuestions.join(', ')}`);
}

console.log(`📊 Questions found: ${questions.size}/175\n`);

// Test 3: Check for proper HTML structure
console.log('🔍 Testing HTML structure...');

const structureTests = {
  'DOCTYPE declaration': /<!DOCTYPE/i,
  'HTML tags': /<HTML>.*<\/HTML>/is,
  'HEAD section': /<HEAD>.*<\/HEAD>/is,
  'BODY section': /<BODY>.*<\/BODY>/is,
  'FORM element': /<FORM/i,
  'Script tags balanced': true // Will check manually
};

// Check script tag balance
const openScripts = (content.match(/<script/gi) || []).length;
const closeScripts = (content.match(/<\/script>/gi) || []).length;
structureTests['Script tags balanced'] = (openScripts === closeScripts);

let passedStructure = 0;
for (const [testName, pattern] of Object.entries(structureTests)) {
  let passed = false;
  if (typeof pattern === 'boolean') {
    passed = pattern;
  } else {
    passed = pattern.test(content);
  }
  
  if (passed) {
    console.log(`  ✅ ${testName}`);
    passedStructure++;
  } else {
    console.log(`  ❌ ${testName}`);
  }
}

console.log(`\n📊 Structure tests: ${passedStructure}/${Object.keys(structureTests).length}\n`);

// Test 4: Check for UI elements
console.log('🔍 Testing UI elements...');

const uiElements = {
  'Import button': /Import Answers/i,
  'Export JSON button': /Export Answers \(JSON\)/i,
  'Export CSV button': /Export Answers \(CSV\)/i,
  'Save button': /Save to Browser Storage/i,
  'Load button': /Load from Browser Storage/i,
  'Clear button': /Clear Storage/i,
  'Auto-save checkbox': /autoSave/,
  'Device panel': /deviceman/,
  'Status div': /storageStatus/,
  'Question number input': /id="qnumber"/,
  'Submit button': /buttvalidate/
};

let passedUI = 0;
for (const [elementName, pattern] of Object.entries(uiElements)) {
  if (pattern.test(content)) {
    console.log(`  ✅ ${elementName}`);
    passedUI++;
  } else {
    console.log(`  ❌ ${elementName} - NOT FOUND`);
  }
}

console.log(`\n📊 UI elements found: ${passedUI}/${Object.keys(uiElements).length}\n`);

// Test 5: Check for documentation
console.log('🔍 Testing documentation...');

const docTests = {
  'Header comments': /MCMI-II Assessment Tool - Unified Version/,
  'Feature list': /NEW FEATURES IN V2.0/,
  'Usage instructions': /USAGE:/,
  'Credits': /CREDITS:/,
  'Version info': /Version: 2\.0/
};

let passedDocs = 0;
for (const [docName, pattern] of Object.entries(docTests)) {
  if (pattern.test(content)) {
    console.log(`  ✅ ${docName}`);
    passedDocs++;
  } else {
    console.log(`  ❌ ${docName}`);
  }
}

console.log(`\n📊 Documentation: ${passedDocs}/${Object.keys(docTests).length}\n`);

// Final summary
console.log('=' .repeat(60));
console.log('📋 FINAL SUMMARY');
console.log('=' .repeat(60));

const totalTests = passedFeatures + passedStructure + passedUI + passedDocs;
const totalPossible = Object.keys(features).length + Object.keys(structureTests).length + 
                      Object.keys(uiElements).length + Object.keys(docTests).length;

const allQuestionsPass = questions.size === 175;
const percentage = ((totalTests / totalPossible) * 100).toFixed(1);

console.log(`Features:      ${passedFeatures}/${Object.keys(features).length}`);
console.log(`Structure:     ${passedStructure}/${Object.keys(structureTests).length}`);
console.log(`UI Elements:   ${passedUI}/${Object.keys(uiElements).length}`);
console.log(`Documentation: ${passedDocs}/${Object.keys(docTests).length}`);
console.log(`Questions:     ${questions.size}/175 ${allQuestionsPass ? '✅' : '❌'}`);
console.log('-'.repeat(60));
console.log(`Overall:       ${totalTests}/${totalPossible} (${percentage}%)`);
console.log('=' .repeat(60));

if (percentage >= 90 && allQuestionsPass) {
  console.log('\n✅ PASSED: MCMI2-v2.html is ready for use!\n');
  process.exit(0);
} else {
  console.log('\n⚠️  WARNING: Some tests failed. Review the output above.\n');
  process.exit(1);
}
