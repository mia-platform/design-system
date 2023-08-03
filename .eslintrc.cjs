module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@mia-platform/eslint-config-mia',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.node.json'
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    'react-refresh',
    '@typescript-eslint'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'react-refresh/only-export-components': ['warn', {
      allowConstantExport: true
    }],
    'react/boolean-prop-naming': ['error', {
      propTypeNames: [
        'bool', 
        'mutuallyExclusiveTrueProps'
      ],
      rule: '^(is|has|can)[A-Z]([A-Za-z0-9]?)+',
      message: 'Boolean prop ({{ propName }}) either needs to start with is, has, or can',
      validateNested: true
    }],    
    'react/jsx-closing-bracket-location': ['error', {
      location: 'tag-aligned'
    }],
    'react/jsx-curly-newline': ['error', {
      singleline: 'consistent',
      multiline: 'consistent'
    }],
    'react/jsx-curly-spacing': ['error', {
      when: 'never',
      children: true
    }],
    'react/jsx-first-prop-new-line': ['error',
      'multiline'
    ],
    'react/jsx-max-depth': ['error', {
      max: 5
    }],
    'react/jsx-max-props-per-line': ['error', {
      maximum: {
        single: 3,
        multi: 1
      }
    }],
    'react/jsx-sort-props': ['error', {
      callbacksLast: true
    }],
    'react/jsx-newline': ['error', {
      prevent: true
    }],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-script-url': 'error'
  }
}
