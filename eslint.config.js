const { defineConfig, globalIgnores } = require('eslint/config')

const prettier = require('eslint-plugin-prettier')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        __dirname: false,
        clearImmediate: false,
        clearInterval: false,
        clearTimeout: false,
        setImmediate: false,
        setInterval: false,
        setTimeout: false,
      },
    },
    extends: compat.extends('expo', 'eslint:recommended', 'prettier'),
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
  globalIgnores(['.expo', '**/node_modules']),
])
