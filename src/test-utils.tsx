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
import { ReactNode } from 'react'

import { ThemeContext, defaultTheme } from './components/ThemeProvider'
import { ANT_PREFIX } from './components/ThemeProvider/Ant'

/**
 * Wraps a React node with a series of providers for testing purposes.
 *
 * @remarks It adds the default theme to components
 * @remarks It adds the default Ant class prefix
 * @remarks It removes the css-do-not-override classes from Ant Design components
 *
 * @param {ReactNode} children - The React node to be wrapped.
 * @returns {ReactNode} The wrapped React node.
 */
const TestWrapper = ({ children }: {children: ReactNode}): ReactNode => (
  <ThemeContext.Provider value={defaultTheme}>
    <ConfigProvider prefixCls={ANT_PREFIX} theme={{ hashed: false }}>
      {children}
    </ConfigProvider>
  </ThemeContext.Provider>
)

/**
 * Custom render function for testing React components.
 *
 * @param {ReactNode} element - The React node to be rendered.
 * @param {RenderOptions} [options] - Options for rendering.
 * @returns {RenderResult} The result of rendering the React node.
 */
const customRender = (
  element: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(element, { wrapper: TestWrapper, ...options })

export * from '@testing-library/react'
export {
  customRender as render,
  TestWrapper,
}
