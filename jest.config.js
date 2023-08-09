/** 
 * @type {import('ts-jest').JestConfigWithTsJest} 
 */

export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  roots: [
    "<rootDir>/src"
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
}
