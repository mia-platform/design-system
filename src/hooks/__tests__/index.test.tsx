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

/* eslint-disable func-names */
/* eslint-disable react/display-name */

import Theme from '../../themes/schema'
import { ThemeProvider } from '../../components/ThemeProvider'
import { ThemeProviderProps } from '../../components/ThemeProvider/ThemeProvider.props'
import { renderHook } from '../../test-utils'
import themes from '../../themes'
import useTheme from '../useTheme'

const { lightTheme } = themes

describe('useTheme', () => {
  const themeProvider = (defaultTheme: Theme) => function({ theme, children }: ThemeProviderProps) {
    return (
      <ThemeProvider theme={theme ?? defaultTheme}>
        {children}
      </ThemeProvider>
    )
  }

  test('returns default theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })

    expect(result.current).toEqual(lightTheme)
  })

  for (const [themeName, theme] of Object.entries(themes)) {
    test(`returns ${themeName}`, () => {
      const { result } = renderHook(() => useTheme(), { wrapper: themeProvider(theme) })

      expect(result.current).toEqual(theme)
    })
  }
})
