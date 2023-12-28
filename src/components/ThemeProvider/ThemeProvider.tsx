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

import { ReactElement, createContext, useMemo } from 'react'

import { AntThemeProvider } from './Ant'
import { ReactIconsProvider } from './ReactIcons'
import { ThemeProviderProps } from './ThemeProvider.props'
import themeDefaultStyle from './utils/themeDefaultStyle'
import themeToVariables from './utils/themeToVariables'
import themes from '../../themes'

export const { lightTheme: defaultTheme } = themes

/**
 * A context to provide the theme throughout the application.
 */
export const ThemeContext = createContext(defaultTheme)

/**
 * Provides theming for the application.
 *
 * @param {ThemeProviderProps} props - The component props.
 * @returns {ReactElement} A component providing the theme to its children.
 *
 * @TODO check children wrapper div style does not clash with other divs (e.g. not full height or width)
 */
export const ThemeProvider = ({ theme, children }: ThemeProviderProps): ReactElement => {
  const style = useMemo(() => ({ ...themeDefaultStyle(theme), ...themeToVariables(theme) }), [theme])

  return (
    <ThemeContext.Provider value={theme!}>
      <AntThemeProvider theme={theme}>
        <ReactIconsProvider theme={theme}>
          <div style={style}>
            {children}
          </div>
        </ReactIconsProvider>
      </AntThemeProvider>
    </ThemeContext.Provider>
  )
}

ThemeProvider.defaultProps = {
  children: undefined,
  theme: defaultTheme,
}
