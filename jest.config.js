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
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/setupTests.ts"
  ],
}
