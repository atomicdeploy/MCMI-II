/**
 * Post-Processing Middleware for Generated JavaScript
 * Handles character code conversions, syntax fixes, and cleanup
 */

import Logger from '../logger/Logger.js';

export class PostProcessor {
  constructor() {
    this.logger = new Logger('PostProcessor');
    this.fixes = {
      charCodes: 0,
      syntaxIssues: 0,
      arrayAccess: 0,
      operatorFixes: 0
    };
  }

  /**
   * Process generated JavaScript and fix all known issues
   */
  process(jsCode) {
    this.logger.step('Post-processing generated JavaScript');

    let result = jsCode;

    // Step 1: Convert character codes to human-readable escape sequences
    result = this._convertCharacterCodes(result);

    // Step 2: Fix array access patterns (high priority)
    result = this._fixArrayAccess(result);

    // Step 3: Fix operator issues
    result = this._fixOperators(result);

    // Step 4: Fix syntax issues
    result = this._fixSyntaxIssues(result);

    // Step 5: Clean up whitespace and formatting
    result = this._cleanupFormatting(result);

    this.logger.success(`Post-processing complete: ${JSON.stringify(this.fixes)}`);

    return result;
  }

  /**
   * Convert chr() character codes to escape sequences
   */
  _convertCharacterCodes(code) {
    this.logger.info('Converting character codes to escape sequences');

    const charCodeMap = {
      0: '\\0',     // Null
      9: '\\t',     // Tab
      10: '\\n',    // Line feed
      13: '\\n',    // Carriage return (convert to \n for cross-platform)
      34: '\\"',    // Double quote
      39: "\\'",    // Single quote
      92: '\\\\',   // Backslash
    };

    // Replace String.fromCharCode(X) with escape sequences
    let result = code.replace(/String\.fromCharCode\((\d+)\)/g, (match, charCode) => {
      const code = parseInt(charCode);
      
      if (charCodeMap[code]) {
        this.fixes.charCodes++;
        return `"${charCodeMap[code]}"`;
      }
      
      // For other codes, keep as String.fromCharCode but log
      if (code < 32 || code > 126) {
        this.logger.debug(`Character code ${code} kept as-is (non-printable)`);
      }
      
      return match;
    });

    // Also handle direct chr(X) that might have been missed
    result = result.replace(/chr\((\d+)\)/gi, (match, charCode) => {
      const code = parseInt(charCode);
      
      if (charCodeMap[code]) {
        this.fixes.charCodes++;
        return `"${charCodeMap[code]}"`;
      }
      
      return `String.fromCharCode(${code})`;
    });

    return result;
  }

  /**
   * Fix array access patterns - convert () to []
   */
  _fixArrayAccess(code) {
    this.logger.info('Fixing array access patterns');

    // Comprehensive list of ALL array names from the VBScript
    const arrayNames = [
      'w', 'r', 'rawbr', 'frawbr', 'aftercor', 'afterhcor', 'dabr',
      'afterddcor', 'afterdccor', 'afterinp', 'afterall', 'gg', 'fordc',
      'onebr', 'twobr', 'threebr', 'fourbr', 'fivebr', 'sixabr', 'sixbbr',
      'sevenbr', 'eightabr', 'eightbbr', 'sbr', 'cbr', 'pbr', 'abr', 'hbr',
      'nbr', 'dbr', 'tbr', 'ybr', 'zbr', 'ppbr', 'ssbr', 'ccbr',
      'dcbr', 'ddbr', 'fonebr', 'ftwobr', 'fthreebr', 'ffourbr', 'ffivebr',
      'fsixabr', 'fsixbbr', 'fsevenbr', 'feightabr', 'feightbbr', 'fsbr',
      'fcbr', 'fpbr', 'fabr', 'fhbr', 'fnbr', 'fdbr', 'ftbr', 'fybr',
      'fzbr', 'fppbr', 'fssbr', 'fccbr'
    ];

    let result = code;

    // Fix array access for each known array - support variables as indices too
    for (const arrayName of arrayNames) {
      // Pattern: arrayName(index) -> arrayName[index] where index can be variable or number
      const pattern = new RegExp(`\\b${arrayName}\\(([^)]+)\\)`, 'g');
      const before = result;
      result = result.replace(pattern, `${arrayName}[$1]`);
      
      if (result !== before) {
        const count = (before.match(pattern) || []).length;
        this.fixes.arrayAccess += count;
      }
    }

    return result;
  }

  /**
   * Fix operator issues
   */
  _fixOperators(code) {
    this.logger.info('Fixing operator issues');

    let result = code;

    // Fix assignment vs comparison in conditions
    // Pattern: if (x=y) should be if (x===y)
    result = result.replace(/if\s*\(([^)]*[^=!<>])=([^=][^)]*)\)/g, (match, left, right) => {
      // Make sure it's not already ==, ===, <=, >=
      if (!left.match(/[<>=!]$/) && !right.match(/^=/)) {
        this.fixes.operatorFixes++;
        return `if (${left}===${right})`;
      }
      return match;
    });

    // Fix .disabled === true/false (should be assignment in some contexts)
    // This is tricky - need context awareness
    // For now, log these for review
    const disabledPatterns = result.match(/\.disabled\s*===\s*(true|false)/g);
    if (disabledPatterns) {
      this.logger.warning(`Found ${disabledPatterns.length} .disabled=== patterns that may need review`);
    }

    return result;
  }

  /**
   * Fix syntax issues
   */
  _fixSyntaxIssues(code) {
    this.logger.info('Fixing syntax issues');

    let result = code;

    // Fix nested case statements appearing outside switch blocks
    // This is a complex issue - we need to detect and fix misplaced case statements
    result = this._fixMisplacedCaseStatements(result);

    // Fix missing semicolons
    result = this._fixMissingSemicolons(result);

    // Fix unbalanced braces (if any)
    result = this._fixUnbalancedBraces(result);

    return result;
  }

  /**
   * Fix misplaced case statements
   */
  _fixMisplacedCaseStatements(code) {
    const lines = code.split('\n');
    const result = [];
    let inSwitch = false;
    let switchDepth = 0;
    let braceDepth = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Track switch statements
      if (trimmed.startsWith('switch')) {
        inSwitch = true;
        switchDepth = braceDepth;
      }

      // Track braces
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      braceDepth += openBraces - closeBraces;

      // Check if we're leaving the switch block
      if (inSwitch && braceDepth <= switchDepth && closeBraces > 0) {
        inSwitch = false;
      }

      // If we find a case statement outside a switch, comment it out
      if ((trimmed.startsWith('case ') || trimmed === 'default:') && !inSwitch) {
        this.logger.warning(`Found misplaced case statement at line ${i + 1}`);
        result.push(line.replace(/case\s+/, '/* FIXME: misplaced case */ // case '));
        this.fixes.syntaxIssues++;
      } else {
        result.push(line);
      }
    }

    return result.join('\n');
  }

  /**
   * Fix missing semicolons
   */
  _fixMissingSemicolons(code) {
    const lines = code.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmed = line.trim();

      // Check if line needs a semicolon
      if (trimmed.length > 0 &&
          !trimmed.endsWith(';') &&
          !trimmed.endsWith('{') &&
          !trimmed.endsWith('}') &&
          !trimmed.endsWith(',') &&
          !trimmed.startsWith('//') &&
          !trimmed.startsWith('/*') &&
          !trimmed.startsWith('*') &&
          !trimmed.match(/^(if|else|for|while|do|switch|case|default|function|return|break|continue)\b/)) {
        
        // Add semicolon
        const indent = line.match(/^(\s*)/)[1];
        line = indent + trimmed + ';';
        this.fixes.syntaxIssues++;
      }

      result.push(line);
    }

    return result.join('\n');
  }

  /**
   * Fix unbalanced braces
   */
  _fixUnbalancedBraces(code) {
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;

    if (openBraces !== closeBraces) {
      this.logger.warning(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
      
      // Add missing closing braces at the end
      if (openBraces > closeBraces) {
        const missing = openBraces - closeBraces;
        code += '\n' + '}'.repeat(missing);
        this.fixes.syntaxIssues += missing;
        this.logger.info(`Added ${missing} missing closing braces`);
      }
    }

    return code;
  }

  /**
   * Clean up formatting
   */
  _cleanupFormatting(code) {
    let result = code;

    // Remove excessive blank lines (more than 2 in a row)
    result = result.replace(/\n{3,}/g, '\n\n');

    // Remove trailing whitespace
    result = result.split('\n').map(line => line.trimEnd()).join('\n');

    // Ensure file ends with newline
    if (!result.endsWith('\n')) {
      result += '\n';
    }

    return result;
  }

  /**
   * Get statistics about fixes applied
   */
  getStats() {
    return {
      ...this.fixes,
      total: Object.values(this.fixes).reduce((a, b) => a + b, 0)
    };
  }
}

export default PostProcessor;
