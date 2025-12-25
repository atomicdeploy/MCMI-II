/**
 * Comprehensive VBScript Token Types
 * Defines all possible VBScript tokens with handlers
 */

export const VBScriptTokenTypes = {
  // Keywords
  DIM: 'dim',
  SET: 'set',
  CONST: 'const',
  REDIM: 'redim',
  
  // Control Flow
  IF: 'if',
  THEN: 'then',
  ELSE: 'else',
  ELSEIF: 'elseif',
  END_IF: 'end if',
  SELECT: 'select',
  CASE: 'case',
  END_SELECT: 'end select',
  
  // Loops
  FOR: 'for',
  TO: 'to',
  STEP: 'step',
  NEXT: 'next',
  DO: 'do',
  WHILE: 'while',
  UNTIL: 'until',
  LOOP: 'loop',
  EXIT: 'exit',
  
  // Functions/Subs
  FUNCTION: 'function',
  SUB: 'sub',
  END_FUNCTION: 'end function',
  END_SUB: 'end sub',
  CALL: 'call',
  
  // Operators
  AND: 'and',
  OR: 'or',
  NOT: 'not',
  XOR: 'xor',
  EQV: 'eqv',
  IMP: 'imp',
  MOD: 'mod',
  
  // Object/Error Handling
  ON_ERROR: 'on error',
  RESUME: 'resume',
  WITH: 'with',
  END_WITH: 'end with',
  
  // Access Modifiers
  PUBLIC: 'public',
  PRIVATE: 'private',
  
  // Other
  OPTION: 'option',
  EXPLICIT: 'explicit',
  NOTHING: 'nothing',
  EMPTY: 'empty',
  NULL: 'null',
  TRUE: 'true',
  FALSE: 'false',
  
  // Built-in Functions
  CREATEOBJECT: 'createobject',
  MSGBOX: 'msgbox',
  INPUTBOX: 'inputbox',
  ISEMPTY: 'isempty',
  ISNULL: 'isnull',
  ISNUMERIC: 'isnumeric',
  ISARRAY: 'isarray',
  ISOBJECT: 'isobject',
  TYPENAME: 'typename',
  
  // String Functions
  LEN: 'len',
  MID: 'mid',
  LEFT: 'left',
  RIGHT: 'right',
  TRIM: 'trim',
  LTRIM: 'ltrim',
  RTRIM: 'rtrim',
  UCASE: 'ucase',
  LCASE: 'lcase',
  INSTR: 'instr',
  REPLACE: 'replace',
  SPLIT: 'split',
  JOIN: 'join',
  
  // Math Functions
  ABS: 'abs',
  INT: 'int',
  FIX: 'fix',
  ROUND: 'round',
  SGN: 'sgn',
  SQR: 'sqr',
  
  // Date Functions
  NOW: 'now',
  DATE: 'date',
  TIME: 'time',
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day',
  
  // Conversion Functions
  CINT: 'cint',
  CLNG: 'clng',
  CSNG: 'csng',
  CDBL: 'cdbl',
  CSTR: 'cstr',
  CBOOL: 'cbool',
  CDATE: 'cdate'
};

export const TokenHandlers = {
  /**
   * Get handler for a specific token type
   */
  getHandler(tokenType) {
    return this[tokenType] || this.DEFAULT;
  },

  /**
   * Default handler for unknown tokens
   */
  DEFAULT(token, context) {
    context.logger.warning(`Unknown token type encountered: ${token.type || token.value}`);
    return token.value || token.originalLine || '';
  },

  /**
   * Handler for DIM declarations
   */
  [VBScriptTokenTypes.DIM](token, context) {
    if (token.isArray) {
      return `const ${token.name} = new Array(${token.arraySize} + 1);`;
    }
    return `let ${token.name};`;
  },

  /**
   * Handler for SET statements
   */
  [VBScriptTokenTypes.SET](token, context) {
    const match = token.value.match(/set\s+(\w+)\s*=\s*(.+)/i);
    if (match) {
      const varName = match[1];
      const value = context.transpileExpression(match[2]);
      return `const ${varName} = ${value};`;
    }
    return token.value;
  },

  /**
   * Handler for IF statements
   */
  [VBScriptTokenTypes.IF](token, context) {
    const condition = context.transpileExpression(token.condition);
    return `if (${condition}) {`;
  },

  /**
   * Handler for ELSE statements
   */
  [VBScriptTokenTypes.ELSE](token, context) {
    return '} else {';
  },

  /**
   * Handler for ELSEIF statements
   */
  [VBScriptTokenTypes.ELSEIF](token, context) {
    const match = token.value.match(/elseif\s+(.*?)\s+then/i);
    if (match) {
      const condition = context.transpileExpression(match[1]);
      return `} else if (${condition}) {`;
    }
    return '} else if (true) {';
  },

  /**
   * Handler for END IF statements
   */
  [VBScriptTokenTypes.END_IF](token, context) {
    return '}';
  },

  /**
   * Handler for FOR loops
   */
  [VBScriptTokenTypes.FOR](token, context) {
    const step = token.step || 1;
    return `for (let ${token.variable} = ${token.start}; ${token.variable} <= ${token.end}; ${token.variable} += ${step}) {`;
  },

  /**
   * Handler for NEXT statements
   */
  [VBScriptTokenTypes.NEXT](token, context) {
    return '}';
  },

  /**
   * Handler for DO WHILE loops
   */
  [VBScriptTokenTypes.DO](token, context) {
    if (token.condition) {
      const condition = context.transpileExpression(token.condition);
      return `while (${condition}) {`;
    }
    return 'do {';
  },

  /**
   * Handler for LOOP statements
   */
  [VBScriptTokenTypes.LOOP](token, context) {
    if (token.condition) {
      const condition = context.transpileExpression(token.condition);
      return `} while (${condition});`;
    }
    return '}';
  },

  /**
   * Handler for SELECT CASE statements
   */
  [VBScriptTokenTypes.SELECT](token, context) {
    const expr = context.transpileExpression(token.expression);
    return `switch (${expr}) {`;
  },

  /**
   * Handler for CASE statements
   */
  [VBScriptTokenTypes.CASE](token, context) {
    if (token.value.toLowerCase() === 'case else') {
      return 'default:';
    }
    const value = context.transpileExpression(token.caseValue);
    return `case ${value}:`;
  },

  /**
   * Handler for END SELECT statements
   */
  [VBScriptTokenTypes.END_SELECT](token, context) {
    return '}';
  },

  /**
   * Handler for EXIT statements
   */
  [VBScriptTokenTypes.EXIT](token, context) {
    if (token.exitType === 'function' || token.exitType === 'sub') {
      return 'return;';
    }
    if (token.exitType === 'for' || token.exitType === 'do') {
      return 'break;';
    }
    return 'break;';
  },

  /**
   * Handler for CREATEOBJECT calls
   */
  [VBScriptTokenTypes.CREATEOBJECT](token, context) {
    return '/* CreateObject not available in browser */ null';
  },

  /**
   * Handler for MSGBOX calls
   */
  [VBScriptTokenTypes.MSGBOX](token, context) {
    const match = token.value.match(/msgbox\s*\((.*?)\)/i);
    if (match) {
      const message = context.transpileExpression(match[1]);
      return `alert(${message});`;
    }
    return 'alert("");';
  },

  /**
   * Handler for INPUTBOX calls
   */
  [VBScriptTokenTypes.INPUTBOX](token, context) {
    const match = token.value.match(/inputbox\s*\((.*?)\)/i);
    if (match) {
      const message = context.transpileExpression(match[1]);
      return `prompt(${message});`;
    }
    return 'prompt("");';
  }
};

export default { VBScriptTokenTypes, TokenHandlers };
