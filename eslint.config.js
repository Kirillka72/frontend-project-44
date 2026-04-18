import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Убираем лишние точки с запятой
      'semi': ['error', 'never'],

      // Правильная настройка отступов (2 пробела)
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

      // Скобки вокруг аргументов стрелочных функций
      'arrow-parens': ['error', 'always'],

      // Замыкающие запятые в многострочных структурах
      'comma-dangle': ['error', 'always-multiline'],

      // Стиль фигурных скобок: открывающая на той же строке, закрывающая — на новой
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  },
]
