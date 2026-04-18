

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'semi': ['error', 'never'],

      'indent': ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
      }],

      'arrow-parens': ['error', 'always'],

      'comma-dangle': ['error', 'always-multiline'],

      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],

      'padded-blocks': ['error', 'never'],

      'eol-last': ['error', 'always'],
    },
  },
]
