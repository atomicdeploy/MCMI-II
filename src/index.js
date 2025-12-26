/**
 * Main Entry Point for MCMI-II Parser and Modernization Pipeline
 * Orchestrates the complete parsing, extraction, and transpilation process
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Logger from './logger/Logger.js';
import HTMLParser from './parser/HTMLParser.js';
import VBScriptExtractor from './parser/VBScriptExtractor.js';
import VBScriptTranspiler from './transpiler/VBScriptTranspiler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

class MCMIIPipeline {
  constructor() {
    this.logger = new Logger('Pipeline');
    this.sourceFile = join(rootDir, 'MCMI2_DRS.html');
    this.outputDir = join(rootDir, 'output');
  }

  async run() {
    this.logger.separator();
    this.logger.step('🚀 Starting MCMI-II Modernization Pipeline');
    this.logger.separator();

    try {
      // Step 1: Parse HTML and extract questions
      const questionsData = await this.parseHTML();

      // Step 2: Extract VBScript
      const vbscriptData = await this.extractVBScript();

      // Step 3: Transpile VBScript to JavaScript
      const javascriptData = await this.transpileToJavaScript(vbscriptData);

      // Step 4: Generate outputs
      await this.generateOutputs(questionsData, vbscriptData, javascriptData);

      // Step 5: Generate modern HTML fragments
      await this.generateHTMLFragments(questionsData);

      this.logger.separator();
      this.logger.complete('✨ Pipeline completed successfully!');
      this.logger.separator();

      return {
        success: true,
        outputs: {
          questions: `${this.outputDir}/json/questions.json`,
          vbscript: `${this.outputDir}/javascript/original-vbscript.vbs`,
          javascript: `${this.outputDir}/javascript/transpiled.js`,
          htmlFragments: `${this.outputDir}/html/`
        }
      };
    } catch (error) {
      this.logger.error('Pipeline failed', error);
      throw error;
    }
  }

  async parseHTML() {
    this.logger.step('Step 1: Parsing HTML');

    const parser = new HTMLParser(this.sourceFile);
    const result = parser.parse();

    this.logger.success(`Parsed ${result.totalQuestions} questions`);

    return parser.getQuestionsJSON();
  }

  async extractVBScript() {
    this.logger.step('Step 2: Extracting VBScript');

    const extractor = new VBScriptExtractor(this.sourceFile);
    const result = extractor.extract();

    this.logger.success(`Extracted ${result.lineCount} lines of VBScript`);
    this.logger.info(`Found ${result.functions.length} functions`);
    this.logger.info(`Found ${result.variables.length} variables`);

    return extractor.getVBScriptInfo();
  }

  async transpileToJavaScript(vbscriptData) {
    this.logger.step('Step 3: Transpiling VBScript to JavaScript');

    const transpiler = new VBScriptTranspiler();
    const jsCode = transpiler.transpile(vbscriptData.code);

    this.logger.success('Transpilation completed');

    return {
      code: jsCode,
      functions: vbscriptData.functions,
      variables: vbscriptData.variables
    };
  }

  async generateOutputs(questionsData, vbscriptData, javascriptData) {
    this.logger.step('Step 4: Generating output files');

    // Ensure output directories exist
    mkdirSync(join(this.outputDir, 'json'), { recursive: true });
    mkdirSync(join(this.outputDir, 'javascript'), { recursive: true });
    mkdirSync(join(this.outputDir, 'html'), { recursive: true });

    // Write questions JSON
    const questionsPath = join(this.outputDir, 'json', 'questions.json');
    writeFileSync(questionsPath, JSON.stringify(questionsData, null, 2));
    this.logger.success(`✓ Questions JSON: ${questionsPath}`);

    // Write VBScript metadata
    const vbscriptMetaPath = join(this.outputDir, 'json', 'vbscript-metadata.json');
    writeFileSync(vbscriptMetaPath, JSON.stringify({
      functions: vbscriptData.functions,
      variables: vbscriptData.variables,
      lineCount: vbscriptData.totalLines
    }, null, 2));
    this.logger.success(`✓ VBScript metadata: ${vbscriptMetaPath}`);

    // Write original VBScript
    const vbscriptPath = join(this.outputDir, 'javascript', 'original-vbscript.vbs');
    writeFileSync(vbscriptPath, vbscriptData.code);
    this.logger.success(`✓ Original VBScript: ${vbscriptPath}`);

    // Write transpiled JavaScript
    const jsPath = join(this.outputDir, 'javascript', 'transpiled.js');
    const jsHeader = `/**
 * Transpiled JavaScript from VBScript
 * Source: MCMI-II Assessment Tool
 * Generated: ${new Date().toISOString()}
 * 
 * Note: This is an automated transpilation. Manual review and testing recommended.
 */

`;
    writeFileSync(jsPath, jsHeader + javascriptData.code);
    this.logger.success(`✓ Transpiled JavaScript: ${jsPath}`);

    // Write engine/data separation info
    const engineDataPath = join(this.outputDir, 'json', 'engine-structure.json');
    writeFileSync(engineDataPath, JSON.stringify({
      description: 'Engine and data structure for MCMI-II',
      functions: javascriptData.functions.map(f => ({
        name: f.name,
        type: f.type,
        parameters: f.parameters,
        purpose: this._inferFunctionPurpose(f.name)
      })),
      dataStructures: javascriptData.variables.map(v => ({
        name: v.name,
        isArray: v.isArray,
        arraySize: v.arraySize,
        purpose: this._inferVariablePurpose(v.name)
      }))
    }, null, 2));
    this.logger.success(`✓ Engine structure: ${engineDataPath}`);
  }

  async generateHTMLFragments(questionsData) {
    this.logger.step('Step 5: Generating modern HTML fragments');

    // Generate question fragment
    const questionHTML = this._generateQuestionFragment(questionsData.questions[0]);
    const fragmentPath = join(this.outputDir, 'html', 'question-fragment.html');
    writeFileSync(fragmentPath, questionHTML);
    this.logger.success(`✓ Question fragment: ${fragmentPath}`);

    // Generate full form template
    const formHTML = this._generateFormTemplate(questionsData);
    const formPath = join(this.outputDir, 'html', 'assessment-form.html');
    writeFileSync(formPath, formHTML);
    this.logger.success(`✓ Assessment form: ${formPath}`);
  }

  _generateQuestionFragment(question) {
    return `<!-- Question Fragment Template -->
<div class="question" data-question-id="${question.id}">
  <div class="question-number">${question.number}</div>
  <div class="question-text">${question.text}</div>
  <div class="question-options">
    <label>
      <input type="radio" name="${question.fieldName}" value="false" checked>
      <span>False</span>
    </label>
    <label>
      <input type="radio" name="${question.fieldName}" value="true">
      <span>True</span>
    </label>
  </div>
</div>
`;
  }

  _generateFormTemplate(questionsData) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${questionsData.metadata.title || 'MCMI-II Assessment'}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .question {
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .question-number {
      font-weight: bold;
      color: #2c3e50;
    }
    .question-text {
      margin: 10px 0;
    }
    .question-options label {
      display: inline-block;
      margin-right: 20px;
    }
  </style>
</head>
<body>
  <h1>${questionsData.metadata.title || 'MCMI-II Assessment'}</h1>
  <form id="mcmi-assessment" name="${questionsData.metadata.formName || 'frm1'}">
    <!-- Questions will be inserted here -->
    <div id="questions-container">
      <!-- Generated dynamically from questions.json -->
    </div>
    <button type="submit">Submit Assessment</button>
  </form>
  <script src="../javascript/transpiled.js"></script>
</body>
</html>
`;
  }

  _inferFunctionPurpose(name) {
    const purposes = {
      'v': 'Validity scale calculation',
      'pp': 'Delusional disorder scale calculation',
      'cc': 'Major Depression scale calculation',
      'ss': 'Schizophrenia scale calculation'
    };
    return purposes[name.toLowerCase()] || 'Assessment calculation function';
  }

  _inferVariablePurpose(name) {
    const purposes = {
      'w': 'Raw scores array',
      'r': 'Scale names array',
      'rawbr': 'Raw base rate array',
      'aftercor': 'After correction array',
      'gg': 'Scale labels array'
    };
    return purposes[name.toLowerCase()] || 'Assessment data variable';
  }
}

// Run the pipeline
const pipeline = new MCMIIPipeline();
pipeline.run()
  .then(result => {
    console.log('\n✅ All outputs generated successfully!');
    console.log('\nOutput locations:');
    Object.entries(result.outputs).forEach(([key, path]) => {
      console.log(`  ${key}: ${path}`);
    });
  })
  .catch(error => {
    console.error('\n❌ Pipeline failed:', error.message);
    process.exit(1);
  });
