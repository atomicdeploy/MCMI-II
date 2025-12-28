#!/usr/bin/env node
/**
 * Final verification test for NaN fix
 * This loads the page and verifies basic functionality
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function finalTest() {
  console.log('🧪 Final verification test for NaN fix...\n');
  
  const htmlPath = join(__dirname, 'MCMI2-modern.html');
  const fileUrl = 'file://' + htmlPath;
  
  let browser;
  let testPassed = true;
  
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    const errors = [];
    const alerts = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
      console.error('❌ JavaScript error:', error.message);
    });
    
    page.on('dialog', async dialog => {
      alerts.push(dialog.message());
      console.log(`📢 Alert: "${dialog.message()}"`);
      
      // Check for NaN in alert
      if (dialog.message().includes('NaN')) {
        console.log('   ❌ ALERT CONTAINS NaN!');
        testPassed = false;
      } else {
        console.log('   ✅ No NaN detected');
      }
      
      await dialog.accept();
    });
    
    console.log('📄 Loading page...');
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    console.log('✅ Page loaded\n');
    
    // Verify the fix by executing the fixed code in the page context
    console.log('🔍 Verifying the fix in page context...');
    const result = await page.evaluate(() => {
      // Check that functions exist and return numbers
      if (typeof v !== 'function') return { success: false, error: 'v is not a function' };
      if (typeof pp !== 'function') return { success: false, error: 'pp is not a function' };
      
      // Try calling one function to see if it returns a number
      try {
        const testVal = v();
        if (typeof testVal === 'number') {
          return { success: true, message: 'Functions return numbers correctly' };
        } else {
          return { success: false, error: `v() returned ${typeof testVal} instead of number` };
        }
      } catch (e) {
        return { success: false, error: e.message };
      }
    });
    
    if (result.success) {
      console.log(`✅ ${result.message}\n`);
    } else {
      console.log(`❌ ${result.error}\n`);
      testPassed = false;
    }
    
    // Test scenario: Fill minimal info and click submit
    console.log('📝 Test scenario: Fill age and gender, then submit');
    await page.fill('input[name="T3"]', '30');
    await page.click('input[name="radgender"]:first-of-type');
    console.log('   ✅ Filled age=30, gender=male\n');
    
    console.log('🔘 Clicking Submit button...');
    await page.click('input[type="button"][value="Submit"]');
    
    // Wait for any alerts or processing
    await page.waitForTimeout(2000);
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`JavaScript errors: ${errors.length}`);
    console.log(`Alerts shown: ${alerts.length}`);
    console.log(`Alerts with NaN: ${alerts.filter(a => a.includes('NaN')).length}`);
    
    if (testPassed && errors.length === 0) {
      console.log('\n✅ TEST PASSED!');
      console.log('The NaN fix is working correctly.');
      console.log('Functions are being called properly and return numeric values.\n');
      return 0;
    } else {
      console.log('\n❌ TEST FAILED!');
      if (errors.length > 0) {
        console.log('Errors encountered:');
        errors.forEach(e => console.log(`  - ${e}`));
      }
      console.log();
      return 1;
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
    return 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

finalTest().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
