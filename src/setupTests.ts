/**
 * Copyright 2023 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
 * It helps avoiding Jest errors when loading the default fontface.
 */
jest.mock('@fontsource/inter', () => ({
  default: () => `
    @font-face { 
      font-family: "Inter"; 
      src: local("Inter"); 
    };
  `,
}))

/**
 * Mocks the window.matchMedia function.
 *
 * It allows testing components that implement media queries.
 *
 * @remarks The writable param indicates the property can be reassigned in tests.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
})
