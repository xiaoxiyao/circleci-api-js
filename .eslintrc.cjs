/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stylistic/recommended-extends',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@stylistic',
    '@typescript-eslint',
  ],
  root: true,
}
