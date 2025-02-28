module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@sokomary', 'prettier'],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'react/button-has-type': 'off',
  },
};
