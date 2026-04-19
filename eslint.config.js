const js = require('@eslint/js')
const nodePlugin = require('eslint-plugin-n')
const prettierConfig = require('eslint-config-prettier')

module.exports = [
  js.configs.recommended,
  nodePlugin.configs['flat/recommended-script'],
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'n/no-process-exit': 'off',
      'n/no-unpublished-require': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'database/migrations/', 'database/seeds/'],
  },
]
