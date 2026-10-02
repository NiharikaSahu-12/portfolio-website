module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',

    /*
     * Props are documented with JSDoc instead of runtime PropTypes, so the rule
     * reported 30+ false positives across the shared UI components and buried
     * the errors that actually mattered.
     */
    'react/prop-types': 'off',

    // Unused arguments are allowed when prefixed with an underscore.
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],

    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // Build/config files run in Node, not the browser.
      files: ['vite.config.js', 'postcss.config.js', 'tailwind.config.js', '*.cjs'],
      env: { node: true },
    },
  ],
}
