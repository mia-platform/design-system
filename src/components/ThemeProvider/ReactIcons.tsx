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

import { ReactElement, useMemo } from 'react'
import { IconContext } from 'react-icons'

import { DEFAULT_COLOR } from './utils/themeDefaultStyle'
import Theme from '../../themes/schema'
import { ThemeProviderProps } from './ThemeProvider.props'

/**
 * Generates a context configuration for React Icons based on a theme configuration.
 *
 * @param {Partial<Theme>} theme - theme configuration used to customize the generated React Icons context.
 * @returns {IconContext} The generated React Icons context.
 */
const generateReactIconsContext = ({ palette }: Partial<Theme> = {}): IconContext => ({
  color: palette?.common?.grey?.[700] ?? DEFAULT_COLOR,
})

/**
 * Provides an React Icons context for the application.
 *
 * @param {ThemeProviderProps} props - The theme provider props.
 * @returns {ReactElement} A component providing the React Icons context to its children.
 */
const ReactIconsProvider = ({ theme, children }: ThemeProviderProps): ReactElement => {
  const reactIconsTheme = useMemo(() => generateReactIconsContext(theme), [theme])

  return (
    <IconContext.Provider value={reactIconsTheme}>
      {children}
    </IconContext.Provider>
  )
}

export {
  ReactIconsProvider,
  generateReactIconsContext,
}
