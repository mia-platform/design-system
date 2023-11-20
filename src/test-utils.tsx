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

import { RenderOptions, RenderResult, render } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { ReactElement } from 'react'

import { ThemeContext, defaultTheme } from './components/ThemeProvider'

/**
 * Wraps a React element with the a series of providers for testing purposes.
 *
 * @remarks It adds the default theme to components
 * @remarks It removes the css-do-not-override classes from Ant Design components
 *
 * @param {ReactElement} children - The React element to be wrapped.
 * @returns {ReactElement} The wrapped React element.
 */
const TestWrapper = ({ children }: {children: ReactElement}): ReactElement => (
  <ThemeContext.Provider value={defaultTheme}>
    <ConfigProvider theme={{ hashed: false }}>
      {children}
    </ConfigProvider>
  </ThemeContext.Provider>
)

/**
 * Custom render function for testing React components.
 *
 * @param {ReactElement} element - The React element to be rendered.
 * @param {RenderOptions} [options] - Options for rendering.
 * @param {ReactElement} [options.wrapper] - The wrapper component to be used during rendering.
 * @returns {RenderResult} The result of rendering the React element.
 */
const customRender = (
  element: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(element, { wrapper: TestWrapper, ...options })

export * from '@testing-library/react'
export {
  customRender as render,
}

