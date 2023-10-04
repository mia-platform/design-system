/**
 * Imports the Jest DOM utilities
 *
 * It can be used to:
 * - query the DOM for elements,
 * - assert that elements have certain properties,
 * - simulate user events.
 *
 * This import should be added to the top of your test files before any other imports.
 */
import '@testing-library/jest-dom'

/**
 * Mocks the '@fontsource/inter' module.
 *
 * It helps avoid Jest errors when loading the default fontface.
 */
jest.mock('@fontsource/inter', () => ({
  default: () => `
    @font-face { 
      font-family: "Inter"; 
      src: local("Inter"); 
    };
  `,
}))
