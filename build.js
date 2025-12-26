#!/usr/bin/env node
/**
 * Build script for MCMI-II Web Application
 * Compiles webapp into dist folder
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, 'webapp');
const DIST_DIR = path.join(__dirname, 'dist');

console.log('🏗️  Building MCMI-II Web Application...\n');

// Clean dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  console.log('✅ Cleaned dist directory');
}

// Create dist directory structure
fs.mkdirSync(DIST_DIR, { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'styles'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'js'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'assets'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'data'), { recursive: true });
console.log('✅ Created dist directory structure');

// Copy files
const filesToCopy = [
  { from: 'index.html', to: 'index.html' },
  { from: 'manifest.json', to: 'manifest.json' },
  { from: 'service-worker.js', to: 'service-worker.js' },
  { from: 'styles/app.css', to: 'styles/app.css' },
  { from: 'js/app.js', to: 'js/app.js' },
  { from: 'js/assessment-engine.js', to: 'js/assessment-engine.js' },
  { from: 'js/file-downloader.js', to: 'js/file-downloader.js' },
  { from: 'data/questions.json', to: 'data/questions.json' }
];

filesToCopy.forEach(({ from, to }) => {
  const source = path.join(SOURCE_DIR, from);
  const dest = path.join(DIST_DIR, to);
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    const stats = fs.statSync(dest);
    console.log(`✅ Copied ${from} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.log(`⚠️  Warning: ${from} not found`);
  }
});

// Copy assets
const assetsDir = path.join(SOURCE_DIR, 'assets');
if (fs.existsSync(assetsDir)) {
  const assets = fs.readdirSync(assetsDir);
  assets.forEach(file => {
    const source = path.join(assetsDir, file);
    const dest = path.join(DIST_DIR, 'assets', file);
    fs.copyFileSync(source, dest);
  });
  console.log(`✅ Copied ${assets.length} assets`);
}

// Create README in dist
const distReadme = `# MCMI-II Web Application - Production Build

This directory contains the production-ready build of the MCMI-II Assessment Tool.

## Deployment

To deploy this application:

1. **Static Hosting**: Upload all files to any static web server (Apache, Nginx, etc.)
2. **GitHub Pages**: Push the dist folder to a gh-pages branch
3. **Netlify/Vercel**: Connect your repository and set build directory to "dist"
4. **Local Testing**: Use \`npx http-server dist -p 8080\`

## Features

- ✅ Single Page Application (SPA)
- ✅ Progressive Web App (PWA) with offline support
- ✅ Dark/Light mode theme
- ✅ Responsive design
- ✅ 175-question MCMI-II assessment
- ✅ Automated scoring engine
- ✅ PDF-style report generation
- ✅ Browser-based file downloads

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- ~500KB storage for offline cache

## Build Information

- Built: ${new Date().toISOString()}
- Version: 1.0.0
- Node: ${process.version}

---

© ${new Date().getFullYear()} MCMI-II Assessment Tool
`;

fs.writeFileSync(path.join(DIST_DIR, 'README.md'), distReadme);
console.log('✅ Created dist README.md');

// Calculate total size
let totalSize = 0;
function calculateSize(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      calculateSize(filePath);
    } else {
      totalSize += stats.size;
    }
  });
}

calculateSize(DIST_DIR);

console.log('\n📊 Build Summary:');
console.log(`   Total Size: ${(totalSize / 1024).toFixed(1)} KB`);
console.log(`   Output Directory: ${DIST_DIR}`);
console.log('\n✅ Build completed successfully!\n');
console.log('💡 To test locally, run:');
console.log('   npx http-server dist -p 8080\n');
