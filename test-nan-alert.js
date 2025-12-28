#!/usr/bin/env node
/**
 * Simple test to verify NaN is not shown in alert after submitting the form
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testNaNFix() {
  console.log('🧪 Testing NaN fix in MCMI2-modern.html...\n');
  
  const htmlPath = join(__dirname, 'MCMI2-modern.html');
  const fileUrl = 'file://' + htmlPath;
  
  let browser;
  
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Track console messages and errors
    const consoleMessages = [];
    const errorMessages = [];
    
    page.on('console', msg => {
      consoleMessages.push(msg.text());
    });
    
    page.on('pageerror', error => {
      errorMessages.push(error.message);
      console.error('❌ Page error:', error.message);
    });
    
    // Track alert dialogs
    const alertMessages = [];
    page.on('dialog', async dialog => {
      alertMessages.push(dialog.message());
      console.log(`📢 Alert message: "${dialog.message()}"`);
      await dialog.accept();
    });
    
    // Load the page
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    console.log('✅ Page loaded\n');
    
    // Fill in minimal required fields: age and gender
    console.log('📝 Filling age: 35');
    await page.fill('input[name="T3"]', '35');
    
    console.log('📝 Selecting gender (male)');
    await page.click('input[name="radgender"]:first-of-type');
    
    // Note: We're not filling all 175 questions - just testing that
    // submitting with minimal data doesn't produce NaN
    console.log('🔘 Clicking Submit button...\n');
    await page.click('input[type="button"][value="Submit"]');
    
    // Wait a bit for any alerts or processing
    await page.waitForTimeout(2000);
    
    // Check results
    console.log('='.repeat(50));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(50));
    
    let hasFailed = false;
    
    // Check for JavaScript errors
    if (errorMessages.length > 0) {
      console.log('❌ JavaScript errors detected:');
      errorMessages.forEach(err => console.log(`   - ${err}`));
      hasFailed = true;
    } else {
      console.log('✅ No JavaScript errors');
    }
    
    // Check alert messages for NaN
    if (alertMessages.length > 0) {
      console.log(`\n📢 ${alertMessages.length} alert(s) shown:`);
      alertMessages.forEach((msg, idx) => {
        console.log(`   ${idx + 1}. "${msg}"`);
        if (msg.includes('NaN')) {
          console.log('      ❌ CONTAINS NaN!');
          hasFailed = true;
        } else {
          console.log('      ✅ Does not contain NaN');
        }
      });
    } else {
      console.log('\n⚠️  No alerts shown (this is expected if validation caught empty fields)');
    }
    
    console.log('='.repeat(50));
    
    if (hasFailed) {
      console.log('\n❌ TEST FAILED: NaN detected or errors occurred');
      return 1;
    } else {
      console.log('\n✅ TEST PASSED: No NaN in alerts!');
      return 0;
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    return 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
testNaNFix().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
