module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/no-parsing-error': 'off',
    'import/no-unresolved': 'off',
    'space-before-function-paren': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'consistent-return': 'off',
    'operator-linebreak': 'off',
    'linebreak-style': 'off',
  },
};
