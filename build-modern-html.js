#!/usr/bin/env node

/**
 * Build script to create modern browser-compatible MCMI-II HTML
 * Combines the original HTML structure with transpiled JavaScript
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Building modern MCMI-II HTML file...\n');

// File paths
const originalHtmlPath = path.join(__dirname, 'MCMI2_DRS.html');
const transpiledJsPath = path.join(__dirname, 'output', 'javascript', 'transpiled.js');
const outputPath = path.join(__dirname, 'MCMI2-modern.html');

// Line number where VBScript starts (line 2165 has <SCRIPT language=vbscript defer>)
const htmlEndLine = 2164;

try {
  console.log('📖 Reading original HTML file...');
  const originalHtml = fs.readFileSync(originalHtmlPath, 'utf-8');
  const htmlLines = originalHtml.split('\n');
  
  console.log(`   Total lines in original: ${htmlLines.length}`);
  console.log(`   Extracting first ${htmlEndLine} lines (HTML structure)`);
  
  // Extract HTML portion (before VBScript)
  const htmlPortion = htmlLines.slice(0, htmlEndLine).join('\n');
  
  console.log('\n📖 Reading transpiled JavaScript file...');
  const transpiledJs = fs.readFileSync(transpiledJsPath, 'utf-8');
  console.log(`   Transpiled JS size: ${(transpiledJs.length / 1024).toFixed(2)} KB`);
  
  // Build the complete modern HTML
  console.log('\n🔨 Building modern HTML file...');
  
  let modernHtml = htmlPortion;
  
  // Add JavaScript instead of VBScript (with defer to match original behavior)
  modernHtml += '\n<SCRIPT type="text/javascript" defer>\n';
  modernHtml += '// Modern JavaScript transpiled from VBScript\n';
  modernHtml += '// This replaces the original VBScript code to work in modern browsers\n';
  modernHtml += '// The defer attribute ensures the script runs after the page is parsed (like original VBScript defer)\n\n';
  
  // Add the k variable initialization (equivalent to VBScript's "set k=document.frm1")
  // This will execute after DOM is loaded due to defer attribute
  modernHtml += '// Initialize form reference (replaces VBScript "set k=document.frm1")\n';
  modernHtml += 'const k = document.frm1;\n\n';
  
  // Add the transpiled JavaScript
  modernHtml += transpiledJs;
  
  // Close the script tag and HTML
  modernHtml += '\n</SCRIPT>\n';
  modernHtml += '</P></BODY></HTML>';
  
  // Write the output file
  console.log('\n💾 Writing output file...');
  fs.writeFileSync(outputPath, modernHtml, 'utf-8');
  
  const outputSize = (modernHtml.length / 1024).toFixed(2);
  console.log(`   Output file: ${outputPath}`);
  console.log(`   Output size: ${outputSize} KB`);
  
  console.log('\n✅ Successfully created modern MCMI-II HTML file!');
  console.log('\n📋 Summary:');
  console.log(`   - Original HTML structure: ${htmlEndLine} lines`);
  console.log(`   - Transpiled JavaScript included inline`);
  console.log(`   - VBScript replaced with standard JavaScript`);
  console.log(`   - Single file output: MCMI2-modern.html`);
  console.log('\n🎉 Build complete!');
  
} catch (error) {
  console.error('❌ Error building modern HTML:', error.message);
  process.exit(1);
}
