// .eslintrc.cjs
// AuroraStack – root ESLint configuration
// Monorepo: pnpm + Turborepo + TypeScript + React + Node

module.exports = {
  root: true,

  env: {
    es2021: true,
    browser: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    // For strict type-aware linting you can enable project configs per-package
    // and use overrides with `parserOptions.project` pointing to each tsconfig.
    // We keep this off at root to avoid perf issues in large monorepos.
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        // Uses tsconfig paths defined in tsconfig.base.json
        alwaysTryTypes: true,
      },
    },
  },

  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
  ],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // Enable the next line if you wire up type-aware linting via parserOptions.project
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // Prettier should always be last to turn off conflicting rules
    'prettier',
  ],

  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'lib/',
    'esm/',
    'cjs/',
    '.turbo/',
    'coverage/',
    '.next/',
    '.output/',
    'storybook-static/',
    'apps/**/.next/',
    'apps/**/.output/',
    '**/*.d.ts',
    '**/.aurora/**',
    '**/generated/**',
  ],

  rules: {
    // ---- General JavaScript / TypeScript rules ----
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-template': 'warn',
    'no-unused-vars': 'off', // handled by TS
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // ---- Import rules ----
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{ts,tsx,js,jsx}',
          '**/*.spec.{ts,tsx,js,jsx}',
          '**/tests/**',
          '**/test/**',
          '**/scripts/**',
          '**/tools/**',
          'apps/**/next.config.{js,ts,mjs,cjs}',
          'apps/**/vite.config.{js,ts,mjs,cjs}',
          'apps/**/vitest.config.{js,ts,mjs,cjs}',
          'tooling/**',
        ],
        optionalDependencies: false,
      },
    ],

    // ---- React rules ----
    'react/prop-types': 'off', // we use TypeScript for typing
    'react/react-in-jsx-scope': 'off', // not needed for React 17+ JSX transform

    // ---- React Hooks rules ----
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // ---- Accessibility ----
    'jsx-a11y/anchor-is-valid': 'warn',
  },

  overrides: [
    // TypeScript / TSX files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        // TS-specific overrides can go here
      },
    },

    // Configuration / tooling files (Node, CommonJS)
    {
      files: [
        '*.config.js',
        '*.config.cjs',
        '*.config.mjs',
        '*.config.ts',
        'turbo.json',
        'pnpm-workspace.yaml',
        '.eslintrc.cjs',
        'scripts/**',
        'tooling/**',
      ],
      env: {
        node: true,
        browser: false,
      },
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        // Allow CommonJS in config files
        '@typescript-eslint/no-var-requires': 'off',
      },
    },

    // Test files (Vitest / Jest-like environment)
    {
      files: [
        '**/*.test.{ts,tsx,js,jsx}',
        '**/*.spec.{ts,tsx,js,jsx}',
        'tests/**/*.{ts,tsx,js,jsx}',
      ],
      env: {
        node: true,
        browser: true,
        'vitest/globals': true,
      },
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },

    // Markdown code blocks / docs examples (optional if using eslint-plugin-markdown)
    // {
    //   files: ['**/*.md'],
    //   processor: 'markdown/markdown',
    // },
  ],
};
