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
  },
  transform: {
    "\\.(svg)$": "jest-transformer-svg"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/setupTests.ts"
  ]
}
