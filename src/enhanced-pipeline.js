/**
 * Enhanced Pipeline with Advanced Context-Aware Parsing and Transpilation
 * Second stage of MCMI-II modernization
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Logger from './logger/Logger.js';
import VBScriptExtractor from './parser/VBScriptExtractor.js';
import AdvancedVBScriptParser from './parser/AdvancedVBScriptParser.js';
import AdvancedTranspiler from './transpiler/AdvancedTranspiler.js';
import PostProcessor from './transpiler/PostProcessor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

class EnhancedPipeline {
  constructor() {
    this.logger = new Logger('EnhancedPipeline');
    this.sourceFile = join(rootDir, 'MCMI2_DRS.html');
    this.outputDir = join(rootDir, 'output');
  }

  async run() {
    this.logger.separator();
    this.logger.step('🚀 Starting Enhanced MCMI-II Pipeline (Stage 2)');
    this.logger.separator();

    try {
      // Step 1: Extract VBScript
      const vbscriptData = await this.extractVBScript();

      // Step 2: Parse with advanced context-aware parser
      const parsedData = await this.advancedParsing(vbscriptData.code);

      // Step 3: Split VBScript into separate files
      await this.splitVBScriptFiles(parsedData);

      // Step 4: Advanced transpilation with context awareness
      const advancedJS = await this.advancedTranspilation(vbscriptData.code);

      // Step 5: Post-process the generated JavaScript
      const postProcessed = await this.postProcessJavaScript(advancedJS);

      // Step 6: Generate enhanced outputs
      await this.generateEnhancedOutputs(parsedData, postProcessed);

      this.logger.separator();
      this.logger.complete('✨ Enhanced pipeline completed successfully!');
      this.logger.separator();

      return {
        success: true,
        parsedFunctions: parsedData.functions.length,
        splitFiles: parsedData.functions.length + 1
      };
    } catch (error) {
      this.logger.error('Enhanced pipeline failed', error);
      throw error;
    }
  }

  async extractVBScript() {
    this.logger.step('Step 1: Extracting VBScript');

    const extractor = new VBScriptExtractor(this.sourceFile);
    const result = extractor.extract();

    this.logger.success(`Extracted ${result.lineCount} lines of VBScript`);

    return result;
  }

  async advancedParsing(vbscriptCode) {
    this.logger.step('Step 2: Advanced context-aware parsing');

    const parser = new AdvancedVBScriptParser(vbscriptCode);
    const parsed = parser.parse();

    this.logger.success(`Parsed ${parsed.functions.length} functions with full context`);
    this.logger.info(`Found ${parsed.globalVariables.length} global variables`);

    return parsed;
  }

  async splitVBScriptFiles(parsedData) {
    this.logger.step('Step 3: Splitting VBScript into separate files');

    const splitDir = join(this.outputDir, 'vbscript-split');
    mkdirSync(splitDir, { recursive: true });

    const parser = new AdvancedVBScriptParser(''); // Reuse for splitting
    parser.functions = parsedData.functions;
    parser.globalVariables = parsedData.globalVariables;

    const result = parser.splitIntoFiles(splitDir);

    this.logger.success(`Split into ${parsedData.functions.length + 1} files`);

    return result;
  }

  async advancedTranspilation(vbscriptCode) {
    this.logger.step('Step 4: Advanced context-aware transpilation');

    const transpiler = new AdvancedTranspiler();
    const jsCode = transpiler.transpile(vbscriptCode);

    this.logger.success('Advanced transpilation completed with context awareness');

    return jsCode;
  }

  async postProcessJavaScript(jsCode) {
    this.logger.step('Step 5: Post-processing JavaScript');

    const postProcessor = new PostProcessor();
    const processed = postProcessor.process(jsCode);

    const stats = postProcessor.getStats();
    this.logger.info(`Post-processing stats: ${JSON.stringify(stats)}`);

    return processed;
  }

  async generateEnhancedOutputs(parsedData, advancedJS) {
    this.logger.step('Step 6: Generating enhanced outputs');

    // Write transpiled JavaScript (advanced context-aware version)
    const transpiledJSPath = join(this.outputDir, 'javascript', 'transpiled.js');
    writeFileSync(transpiledJSPath, advancedJS);
    this.logger.success(`✓ Transpiled JavaScript: ${transpiledJSPath}`);

    // Write parsed analysis
    const parser = new AdvancedVBScriptParser('');
    parser.functions = parsedData.functions;
    parser.globalVariables = parsedData.globalVariables;

    const analysis = parser.getAnalysis();
    const analysisPath = join(this.outputDir, 'json', 'advanced-analysis.json');
    writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
    this.logger.success(`✓ Advanced analysis: ${analysisPath}`);

    // Write function map
    const functionMap = parsedData.functions.map(f => ({
      name: f.name,
      type: f.type,
      parameters: f.parameters,
      localVariables: f.localVariables.length,
      returnStatements: f.returnStatements.length,
      lineCount: f.endLine - f.startLine + 1,
      file: `vbscript-split/${f.name}.vbs`
    }));

    const mapPath = join(this.outputDir, 'json', 'function-map.json');
    writeFileSync(mapPath, JSON.stringify(functionMap, null, 2));
    this.logger.success(`✓ Function map: ${mapPath}`);

    // Generate file download example
    const examplePath = join(this.outputDir, 'html', 'download-example.html');
    const exampleHTML = this._generateDownloadExample();
    writeFileSync(examplePath, exampleHTML);
    this.logger.success(`✓ Download example: ${examplePath}`);
  }

  _generateDownloadExample() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MCMI-II File Download Example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .example {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    button {
      background: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background: #2980b9;
    }
    code {
      background: #e9ecef;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
  </style>
</head>
<body>
  <h1>File Download Example</h1>
  <p>This example demonstrates browser-compatible file downloads using the Blob API,
     replacing the legacy VBScript FileSystemObject.</p>

  <div class="example">
    <h2>Generate and Download Report</h2>
    <p>Click the button to generate and download a sample MCMI-II report:</p>
    <button onclick="downloadSampleReport()">Download Sample Report</button>
  </div>

  <div class="example">
    <h2>How It Works</h2>
    <p>The modern approach uses:</p>
    <ul>
      <li><code>Blob</code> API to create file content</li>
      <li><code>URL.createObjectURL()</code> to create a download link</li>
      <li><code>&lt;a download&gt;</code> attribute to trigger download</li>
    </ul>
    <p>No server-side file system access needed!</p>
  </div>

  <script type="module">
    // Import the FileDownloader (in real usage)
    // import FileDownloader from '../javascript/FileDownloader.js';

    // Inline implementation for demo
    class FileDownloader {
      static downloadFile(content, filename, mimeType = 'text/html') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      static generateReport(data) {
        const { name, age, code, scores } = data;
        return \`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>MCMI-II Report - \${name}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1 { color: #2c3e50; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #3498db; color: white; }
  </style>
</head>
<body>
  <h1>MCMI-II Assessment Report</h1>
  <p><strong>Name:</strong> \${name}</p>
  <p><strong>Age:</strong> \${age}</p>
  <p><strong>Code:</strong> \${code}</p>
  <h2>Scores</h2>
  <table>
    <tr><th>Scale</th><th>Score</th></tr>
    \${scores.map(s => \`<tr><td>\${s.name}</td><td>\${s.value}</td></tr>\`).join('')}
  </table>
</body>
</html>\`;
      }
    }

    // Make it available globally for the button
    window.downloadSampleReport = function() {
      const sampleData = {
        name: 'John Doe',
        age: 35,
        code: 'ABC123',
        scores: [
          { name: 'Validity (V)', value: 85 },
          { name: 'Delusional Disorder (PP)', value: 72 },
          { name: 'Major Depression (CC)', value: 68 },
          { name: 'Schizophrenia (SS)', value: 55 }
        ]
      };

      const reportHTML = FileDownloader.generateReport(sampleData);
      FileDownloader.downloadFile(reportHTML, 'mcmi-ii-report.htm', 'text/html');

      alert('Report downloaded successfully!');
    };
  </script>
</body>
</html>`;
  }
}

// Run the enhanced pipeline
const pipeline = new EnhancedPipeline();
pipeline.run()
  .then(result => {
    console.log('\n✅ Enhanced pipeline completed!');
    console.log(`  Functions parsed: ${result.parsedFunctions}`);
    console.log(`  Files created: ${result.splitFiles}`);
  })
  .catch(error => {
    console.error('\n❌ Enhanced pipeline failed:', error.message);
    process.exit(1);
  });
