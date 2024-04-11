module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'react-refresh',
    'simple-import-sort',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Suppress errors for missing 'import React' in files.
    'react/react-in-jsx-scope': 'off',
    // Enable import sorting rules.
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      "error",
      {
        groups: [
          [
            // Packages `react` related packages come first.
            "^react", "^@?\\w",
            // Internal packages.
            "^(@|components)(/.*|$)",
            // Side effect imports.
            "^\\u0000",
            // Parent imports. Put `..` last.
            "^\\.\\.(?!/?$)", "^\\.\\./?$",
            // Other relative imports. Put same-folder imports and `.` last.
            "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$",
            // Style imports.
            "^.+\\.?(css)$"
          ]
        ]
      }
    ]
  },
}
