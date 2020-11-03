module.exports = {
  ignoreFiles: ['**/*.js'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'indentation': 2,
    'no-empty-source': null,
    'rule-empty-line-before': 'never',
    'at-rule-empty-line-before': null,
    'no-missing-end-of-source-newline': null,
    'selector-list-comma-newline-after': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-pseudo-element-no-unknown': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extend', 'mixin', 'if', 'else', 'include', 'function', 'each']
      }
    ]
  }
}
