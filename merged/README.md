# MCMI-II v2.0 - Unified Assessment Tool

## 🎯 Overview

This is the **unified version 2.0** of the MCMI-II (Millon Clinical Multiaxial Inventory-II) assessment tool that combines all legacy branches and implements all missing features requested in the project requirements.

## 📦 What Was Unified

This version merges code and features from:

1. **MCMI2_LEGACY.htm** (2007) - Original VBScript-based legacy version
2. **MCMI2_JS_Incomplete.htm** (2014) - Incomplete JavaScript conversion attempt
3. **MCMI2_AnswerDevice.htm** (2015) - Version with device interface for external answer readers
4. **MCMI2-modern.html** (2024) - Modern transpiled JavaScript version
5. **answersheet/** - Answer sheet device web interface components

## ✨ New Features in V2.0

### 1. Import/Export Capability
- **Export to JSON**: Export all 175 answers plus demographic data in JSON format
- **Export to CSV**: Export in CSV format for spreadsheet compatibility
- **Import from JSON/CSV**: Load previously saved answers from either format
- **Timestamp tracking**: All exports include timestamp metadata

### 2. LocalStorage Persistence
- **Save to Browser Storage**: Manually save all answers and form fields to browser localStorage
- **Load from Browser Storage**: Restore previously saved data
- **Auto-load on page load**: Prompts user to load saved data if available
- **Clear Storage**: Remove saved data when no longer needed

### 3. Auto-Save Functionality
- **30-second interval**: Automatically saves to localStorage every 30 seconds
- **Toggle on/off**: Enable/disable auto-save with checkbox
- **Status notifications**: Visual feedback for all save/load operations
- **Data loss prevention**: Never lose work due to browser crashes or accidental closure

### 4. Device Interface (from AnswerDevice branch)
- **External device support**: Connect to hardware answer sheet readers
- **Port configuration**: Configurable port number for device communication
- **Memory operations**: Read device memory, clear device memory
- **AJAX-based communication**: Non-blocking communication with device server
- **Error handling**: Comprehensive error messages for troubleshooting

### 5. Enhanced UI/UX
- **Status notifications**: Color-coded status messages for all operations
- **Bilingual labels**: Persian and English labels for all features
- **Organized layout**: Clearly separated sections for different features
- **Responsive design**: Works on various screen sizes
- **Toggle panels**: Device interface can be shown/hidden

## 🚀 Usage Instructions

### Opening the File
1. Open `MCMI2-v2.html` in any modern web browser:
   - Chrome
   - Firefox
   - Safari
   - Edge
   - Opera

### Answering Questions
1. Use keyboard shortcuts:
   - Press `T` for TRUE (بلی)
   - Press `F` for FALSE (خیر)
   - Press `+` to go to next question
   - Press `-` to go to previous question

2. Or use mouse:
   - Click on the question number input to jump to specific question
   - Click on radio buttons to select TRUE/FALSE
   - Click on answers in the form directly

### Import/Export Operations

#### Exporting Answers
1. Click **"📥 Export Answers (JSON)"** to download JSON format
2. Click **"📊 Export Answers (CSV)"** to download CSV format
3. Files are saved with timestamp: `MCMI2_Answers_YYYY-MM-DD.json`

#### Importing Answers
1. Click **"📤 Import Answers"**
2. Select a previously exported JSON or CSV file
3. All answers and demographic data will be loaded

### LocalStorage Operations

#### Saving to Browser
1. Click **"💾 Save to Browser Storage"**
2. Data is saved to browser's localStorage
3. Data persists even after closing browser

#### Loading from Browser
1. Click **"📂 Load from Browser Storage"**
2. Previously saved data is restored
3. Displays timestamp of when data was saved

#### Auto-Save
1. Check the **"Auto-save every 30 seconds"** checkbox
2. Data automatically saves every 30 seconds
3. Uncheck to disable auto-save

#### Clearing Storage
1. Click **"🗑️ Clear Storage"**
2. Confirm the action
3. All saved data is removed from browser

### Device Interface

#### Accessing Device Panel
1. Click **"🔧 Device Interface"** button (top-left)
2. Device panel appears with controls

#### Using Device Interface
1. Set the port number (default: 5)
2. Click **"🔌 اتصال به دستگاه"** (Connect to device)
3. Click **"📖 خواندن حافظه"** (Read memory) to import answers from device
4. Click **"🔄 پاک کردن حافظه"** (Clear memory) to reset device

**Note**: Device interface requires a compatible server running on the specified port.

### Generating Report
1. Fill out all demographic information (name, code, age, gender, episode)
2. Answer all 175 questions
3. Click **"Submit"** button
4. Report is generated and downloaded as HTML file

## 📋 Data Format Specifications

### JSON Export Format
```json
{
  "answers": {
    "Q1": "TRUE",
    "Q2": "FALSE",
    ...
    "Q175": "TRUE"
  },
  "formData": {
    "name": "Patient Name",
    "code": "12345",
    "age": "35",
    "gender": "Male",
    "episode": "1"
  },
  "timestamp": "2025-12-28T10:30:00.000Z",
  "version": "2.0"
}
```

### CSV Export Format
```csv
Question,Answer
Name,Patient Name
Code,12345
Age,35
Gender,Male
Episode,1

Q1,TRUE
Q2,FALSE
...
Q175,TRUE
```

## 🔧 Technical Details

### File Structure
- **Lines**: ~7,600
- **Size**: ~235 KB
- **Format**: Single HTML file with embedded JavaScript and CSS
- **Encoding**: UTF-8
- **Dependencies**: None (completely standalone)

### Browser Compatibility
| Feature | Chrome | Firefox | Safari | Edge | IE |
|---------|--------|---------|--------|------|-----|
| Basic Assessment | ✅ | ✅ | ✅ | ✅ | ✅ |
| Import/Export | ✅ | ✅ | ✅ | ✅ | ❌ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Device Interface | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Modern JavaScript | ✅ | ✅ | ✅ | ✅ | ❌ |

✅ = Fully supported | ⚠️ = Partially supported | ❌ = Not supported

### Storage Limits
- **LocalStorage**: ~5-10 MB per origin (varies by browser)
- **MCMI-II data**: ~10-20 KB (well within limits)
- **Auto-save interval**: 30 seconds (configurable in code)

### Security Considerations
1. **Local Storage**: Data stored in browser's localStorage is accessible only to this origin
2. **No Server Required**: All processing happens client-side
3. **No Data Transmission**: Data never leaves user's computer (except device interface)
4. **File Exports**: Uses browser's Blob API and downloads locally

## 🎨 Code Features

### Clean Architecture
- **Separation of concerns**: UI, data management, and assessment logic are separated
- **Modular functions**: Each feature has dedicated functions
- **Error handling**: Comprehensive try-catch blocks with user-friendly messages
- **Status feedback**: Visual notifications for all operations

### Code Quality
- **Comments**: Inline documentation for all major functions
- **Naming conventions**: Clear, descriptive function and variable names
- **Consistent style**: Follows established coding patterns from original code
- **No code omission**: All functionality from all branches preserved

## 📝 Changelog

### Version 2.0 (2025-12-28)
- ✅ Added Import/Export capability (JSON & CSV)
- ✅ Added LocalStorage persistence for all fields
- ✅ Added Auto-save functionality (30-second interval)
- ✅ Integrated Device Interface from AnswerDevice branch
- ✅ Enhanced UI with status notifications
- ✅ Added bilingual labels (Persian/English)
- ✅ Unified all legacy branch features
- ✅ Maintained all 175 questions and scoring engine
- ✅ Modern JavaScript (browser-compatible, no VBScript)

### Version 1.0 (Original)
- Base MCMI-II assessment with 175 questions
- VBScript-based scoring engine
- Basic form functionality

## 🔍 Testing

### Manual Testing Checklist
- [x] Open file in Chrome, Firefox, Safari, Edge
- [x] Answer questions using keyboard (T/F keys)
- [x] Answer questions using mouse clicks
- [x] Export to JSON and verify file contents
- [x] Export to CSV and verify file contents
- [x] Import from JSON and verify answers loaded
- [x] Import from CSV and verify answers loaded
- [x] Save to localStorage and verify data persisted
- [x] Close browser and reopen to verify auto-load prompt
- [x] Enable auto-save and verify periodic saves
- [x] Test device interface panel show/hide
- [x] Clear storage and verify data removed
- [x] Submit form and verify report generation

## 🐛 Known Issues

1. **Device Interface**: Requires external server to function (not included in this file)
2. **IE Compatibility**: Modern features (import/export) not supported in Internet Explorer
3. **Mobile Browsers**: Device interface may have limited functionality on mobile

## 📄 Credits

- **Original MCMI-II Form**: Edited by David Refoua (http://www.Refoua.me/)
- **Modernization**: MCMI-II Parser & Transpiler Project
- **Unification**: Integrated all legacy branches (2007-2024)
- **Version 2.0**: Complete feature enhancement and code unification

## 📜 License

MIT License - See main repository LICENSE file for details

## 🙏 Acknowledgments

Special thanks to all contributors who worked on various branches of this codebase over the years (2007-2024).

---

**Generated by MCMI-II Unification Project**
**Date: 2025-12-28**
**Version: 2.0**
