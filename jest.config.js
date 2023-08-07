/** 
 * @type {import('ts-jest').JestConfigWithTsJest} 
 */

export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
}
