import globals from 'globals';

export default [
  {
    files: ['src/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'indent': ['error', 2],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'key-spacing': ['error', { afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      'space-infix-ops': 'error',
      'arrow-spacing': ['error', { before: true, after: true }]
    }
  },
  {
    // Special rules for transpiled code
    files: ['output/javascript/transpiled.js'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-redeclare': 'off',
      'no-const-assign': 'off',
      'semi': 'off',
      'quotes': 'off',
      'indent': 'off'
    }
  }
];
