# 🧠 MCMI-II Parser & Modernization Project

A complete DOM, HTML, JavaScript, and VBScript parser and converter for the MCMI-II (Millon Clinical Multiaxial Inventory-II) assessment tool. This project extracts, analyzes, and modernizes legacy VBScript-based psychological assessment tools into modern JavaScript.

## 🎯 Project Objectives

- ✅ Parse complete HTML structure and extract all 175 questions
- ✅ Generate JSON-based data structures from questions
- ✅ Extract and document all VBScript code
- ✅ Transpile VBScript to modern JavaScript
- ✅ Separate engine code from data/declarations
- ✅ Generate modern HTML fragments
- ✅ Implement emoji-based logging system
- ✅ Create robust CI/CD pipeline

## 📁 Project Structure

```
MCMI-II/
├── src/
│   ├── parser/              # HTML and VBScript parsers
│   │   ├── HTMLParser.js    # Extracts questions and structure
│   │   └── VBScriptExtractor.js  # Extracts VBScript code
│   ├── transpiler/          # VBScript to JavaScript transpiler
│   │   └── VBScriptTranspiler.js
│   ├── logger/              # Emoji-based logging system
│   │   └── Logger.js
│   └── index.js             # Main pipeline orchestrator
├── output/
│   ├── json/                # Generated JSON data
│   │   ├── questions.json   # All 175 questions
│   │   ├── vbscript-metadata.json  # Function/variable info
│   │   └── engine-structure.json   # Engine architecture
│   ├── javascript/          # Transpiled code
│   │   ├── original-vbscript.vbs   # Original VBScript
│   │   └── transpiled.js    # Modern JavaScript
│   └── html/                # Modern HTML fragments
│       ├── question-fragment.html
│       └── assessment-form.html
├── tests/                   # Test files
├── .github/workflows/       # CI/CD configuration
│   └── pipeline.yml
├── MCMI2_DRS.html          # Source file (UTF-8 converted)
└── package.json

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run the parser pipeline
npm run parse
```

### Running the Pipeline

The pipeline automatically:
1. 📖 Parses the HTML file and extracts questions
2. 🔍 Extracts VBScript code and metadata
3. 🔄 Transpiles VBScript to JavaScript
4. 💾 Generates JSON outputs
5. 🎨 Creates modern HTML fragments

```bash
npm run parse
```

## 📊 Output Files

### JSON Data Files

- **questions.json**: Complete structured data of all 175 assessment questions
- **vbscript-metadata.json**: Functions and variables extracted from VBScript
- **engine-structure.json**: Architecture breakdown showing engine vs. data

### JavaScript Files

- **original-vbscript.vbs**: Extracted VBScript code (4,429 lines)
- **transpiled.js**: Modern JavaScript equivalent with improvements

### HTML Files

- **question-fragment.html**: Reusable question component template
- **assessment-form.html**: Complete modern form template

## 🔧 Features

### HTML Parser
- Extracts all 175 questions with Persian text
- Identifies form structure and demographic fields
- Preserves question metadata and relationships

### VBScript Extractor
- Identifies all functions and subroutines
- Maps variable declarations and arrays
- Documents code structure and dependencies

### JavaScript Transpiler
Converts VBScript constructs to modern JavaScript:
- `dim` → `let`/`const`
- `function`/`sub` → modern function syntax
- `if...then...end if` → `if { }`
- `for...next` → `for` loops
- VBScript operators → JavaScript equivalents
- String concatenation (`&` → `+`)

### Logger System
Emoji-based logging for clear pipeline visibility:
- ℹ️ Info messages
- ✅ Success indicators
- ⚠️ Warnings
- ❌ Errors
- 🔍 Debug information
- ⏳ Progress tracking
- 🚀 Step announcements
- 🎉 Completion messages

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically:
- ✅ Runs the parser on every push
- 📦 Generates all outputs
- 🔍 Validates JSON and JavaScript syntax
- 📤 Uploads artifacts for download
- 📊 Creates summary reports

## 🏗️ Architecture

### Engine vs. Data Separation

The transpiled code separates concerns:

**Engine Code**: Core logic for assessment processing
- Question navigation
- Answer validation
- Score calculation algorithms
- Report generation

**Data Definitions**: Configurable assessment parameters
- Question text and metadata
- Scoring rules and weights
- Scale definitions
- Normative data

## 📝 Assessment Scales

The MCMI-II includes multiple clinical scales calculated by the VBScript functions:
- Validity (v)
- Delusional Disorder (pp)
- Major Depression (cc)
- Schizophrenia (ss)
- And 20+ additional scales

Each scale function checks specific question responses and applies weighted scoring.

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Validate outputs
npm run validate
```

## 🤝 Contributing

This project modernizes legacy assessment tools. Contributions should:
1. Preserve all original functionality
2. Improve code quality and maintainability
3. Add comprehensive documentation
4. Include tests for new features

## ⚠️ Important Notes

- The original file uses UTF-16LE encoding (converted to UTF-8)
- Questions are in Persian (Farsi) language
- VBScript FileSystemObject calls are browser-incompatible
- Manual review of transpiled code is recommended
- This is a psychological assessment tool - handle data carefully

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Original MCMI-II form edited by David Refoua (http://www.Refoua.me/)

---

**Generated by MCMI-II Modernization Pipeline** 🚀