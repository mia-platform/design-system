module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "@mia-platform/eslint-config-mia",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended"
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "jest.config.js",
    "src/vite-env.d.ts"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: [
      "./tsconfig.json",
      "./tsconfig.node.json"
    ],
    tsconfigRootDir: __dirname
  },
  plugins: [
    "import",
    "react",
    "react-refresh",
    "@typescript-eslint"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "import/order": ["error", {
      groups: [
        ["builtin", "external"],
        ["internal", "parent", "sibling", "index"],
      ],      
      "newlines-between": "always"
    }],
    "no-shadow": "off",
    "sort-imports": ["error", {
      allowSeparatedGroups: true
    }],

    /** 
     * Eslint plugin Typescript
     * @link https://typescript-eslint.io/rules
     */
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/explicit-function-return-type": ["error", {
      allowExpressions: true
    }],
    "@typescript-eslint/no-shadow": ["error"],

    /**
     * Eslint plugin React Hooks
     * @link https://legacy.reactjs.org/docs/hooks-rules.html
     */
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    /** 
     * Eslint plugin React Refresh
     * @link https://github.com/ArnaudBarre/eslint-plugin-react-refresh
     */
    "react-refresh/only-export-components": ["warn", {
      allowConstantExport: true
    }],

    /** 
     * Eslint plugin React
     * @link https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules
     */
    "react/boolean-prop-naming": ["error", {
      propTypeNames: ["bool", "mutuallyExclusiveTrueProps"],
      rule: "^(is|has|can)[A-Z]([A-Za-z0-9]?)+",
      message: "Boolean prop ({{ propName }}) either needs to start with is, has, or can",
      validateNested: true
    }],
    "react/function-component-definition": ["error", {
      namedComponents: "arrow-function",
      unnamedComponents: "function-expression"
    }],
    "react/hook-use-state": ["error", {
      allowDestructuredState: true
    }],
    "react/jsx-child-element-spacing": "error",
    "react/jsx-closing-bracket-location": ["error", {
      location: "tag-aligned"
    }],
    "react/jsx-curly-newline": ["error", {
      singleline: "consistent",
      multiline: "consistent"
    }],
    "react/jsx-curly-spacing": ["error", {
      when: "never",
      children: true
    }],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-max-depth": ["error", {
      max: 5
    }],
    "react/jsx-max-props-per-line": ["error", {
      maximum: {
        single: 3,
        multi: 1
      }
    }],
    "react/jsx-newline": ["error", {
      prevent: true
    }],
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-no-script-url": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-one-expression-per-line": ["error", {
      allow: "single-child"
    }],
    "react/jsx-props-no-multi-spaces": "error",
    "react/jsx-sort-props": ["error", {
      callbacksLast: true
    }],
    "react/jsx-tag-spacing": "error",
    "react/no-adjacent-inline-elements": "error",
    "react/no-array-index-key": "error",
    "react/no-invalid-html-attribute": "error",
    "react/no-multi-comp": "error",
    "react/no-object-type-as-default-prop": "error",
    "react/prefer-stateless-function": "error",
    "react/require-default-props": "error",
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": true
    }],
    "react/sort-default-props": "error"
  }
}
