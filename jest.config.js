/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */

export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  roots: [
    "<rootDir>/src"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^lodash-es$': 'lodash',
  },
  transform: {
    "\\.(svg)$": "jest-transformer-svg"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/setupTests.ts",
    "/src/test-utils.tsx",
    "/src/utils/log.ts",
    "/src/themes/",
    "assets"
  ]
}
