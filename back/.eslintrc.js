module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  overrides: [
    {
      files: ['.eslintrc.js', './src/**/*.ts'],
      excludedFiles: './src/**/*.spec.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
      },
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      rules: {
        'no-negated-condition': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['.eslintrc.js', './src/**/*.spec.ts', 'jest.config.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-negated-condition': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
