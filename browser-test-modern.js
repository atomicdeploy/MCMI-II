#!/usr/bin/env node

/**
 * Test script for MCMI2-modern.html
 * Uses Playwright to load the page, fill in mock answers, and generate a report
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testModernHTML() {
  console.log('🧪 Testing MCMI2-modern.html in browser...\n');
  
  const htmlPath = join(__dirname, 'MCMI2-modern.html');
  const fileUrl = 'file://' + htmlPath;
  
  if (!existsSync(htmlPath)) {
    console.error(`❌ MCMI2-modern.html not found at: ${htmlPath}`);
    console.error("   Run 'npm run build:modern' first to generate MCMI2-modern.html.");
    return 1;
  }
  
  console.log(`📄 Loading: ${fileUrl}`);
  
  let browser;
  let passed = true;
  
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Listen for errors
    const errorMessages = [];
    
    page.on('pageerror', error => {
      errorMessages.push(error.message);
      console.error('❌ Page error:', error.message);
      passed = false;
    });
    
    // Load the page
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    console.log('✅ Page loaded successfully\n');
    
    // Check page title
    const title = await page.title();
    console.log(`📋 Page title: ${title}`);
    if (title !== 'MCMI-II') {
      console.error('❌ Title mismatch!');
      passed = false;
    }
    
    // Fill in demographic information
    console.log('\n📝 Filling demographic information...');
    await page.fill('input[name="T1"]', 'Test Subject');
    await page.fill('input[name="T2"]', 'TEST001');
    await page.fill('input[name="T3"]', '35');
    await page.check('input[name="radgender"]:first-of-type'); // Select male
    
    // Fill in mock answers for all 175 questions
    // Pattern: Answer TRUE (second radio button) for questions divisible by 3
    // Answer FALSE (first radio button) for others
    console.log('📝 Filling answers for all 175 questions...');
    
    for (let i = 1; i <= 175; i++) {
      const radioIndex = (i % 3 === 0) ? 1 : 0; // 0 = FALSE (checked by default), 1 = TRUE
      const selector = `input[name="R${i}"]:nth-of-type(${radioIndex + 1})`;
      
      try {
        await page.check(selector);
      } catch (e) {
        console.error(`❌ Failed to check question ${i}:`, e.message);
        passed = false;
      }
      
      if (i % 25 === 0) {
        console.log(`   ✓ Completed ${i}/175 questions`);
      }
    }
    
    console.log('✅ All 175 questions answered\n');
    
    // Check if submit button exists
    const submitButton = await page.$('input[type="button"][value="Submit"]');
    if (!submitButton) {
      console.error('❌ Submit button not found!');
      passed = false;
    } else {
      console.log('✅ Submit button found');
    }
    
    // Click the submit button
    console.log('\n🔘 Clicking Submit button...');
    
    // Set up listener for the report generation
    let reportGenerated = false;
    page.on('dialog', async dialog => {
      console.log(`📢 Dialog: ${dialog.message()}`);
      await dialog.accept();
    });
    
    // Click submit and wait for processing
    await submitButton.click();
    await page.waitForTimeout(2000); // Wait for script to execute
    
    // Check if the page has generated output (document.write should have added content)
    const bodyContent = await page.content();
    
    // Look for report indicators
    const hasReportTable = bodyContent.includes('Raw Score') || bodyContent.includes('BR from table');
    const hasXScore = bodyContent.includes('X (Disclosure)');
    
    if (hasReportTable && hasXScore) {
      console.log('✅ Report generated successfully!');
      console.log('   - Found report table with scores');
      console.log('   - Found X (Disclosure) score');
      reportGenerated = true;
    } else {
      console.log('⚠️  Report may not have generated completely');
      if (!hasReportTable) console.log('   - Missing report table');
      if (!hasXScore) console.log('   - Missing X score');
    }
    
    // Check for JavaScript errors
    if (errorMessages.length > 0) {
      console.log('\n❌ JavaScript Errors:');
      errorMessages.forEach(err => console.log(`   - ${err}`));
      passed = false;
    } else {
      console.log('\n✅ No JavaScript errors detected');
    }
    
    // Take a screenshot
    const screenshotPath = join(__dirname, 'test-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`\n📸 Screenshot saved: ${screenshotPath}`);
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Page loaded: ✅`);
    console.log(`Demographic fields filled: ✅`);
    console.log(`All 175 questions answered: ✅`);
    console.log(`Submit button clicked: ✅`);
    console.log(`Report generated: ${reportGenerated ? '✅' : '⚠️'}`);
    console.log(`JavaScript errors: ${errorMessages.length === 0 ? '✅ None' : `❌ ${errorMessages.length}`}`);
    console.log('='.repeat(50));
    
    if (passed && reportGenerated) {
      console.log('\n✅ ALL TESTS PASSED!');
      console.log('The MCMI2-modern.html file works correctly in a modern browser.');
      return 0;
    } else {
      console.log('\n❌ SOME TESTS FAILED');
      return 1;
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error(error.stack);
    return 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
testModernHTML().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
