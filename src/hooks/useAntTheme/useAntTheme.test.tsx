/**
 * Copyright 2024 Mia srl
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

import Theme from '../../themes/schema'
import { ThemeProvider } from '../../components/ThemeProvider'
import { ThemeProviderProps } from '../../components/ThemeProvider/ThemeProvider.props'
import { generateAntTheme } from '../../components/ThemeProvider/Ant'
import { renderHook } from '../../test-utils'
import themes from '../../themes'
import { useAntTheme } from './useAntTheme'

const { lightTheme } = themes

describe('useAntTheme', () => {
  const themeProvider = (defaultTheme: Theme) => function component({ theme, children }: ThemeProviderProps) {
    return (
      <ThemeProvider theme={theme ?? defaultTheme}>
        {children}
      </ThemeProvider>
    )
  }

  test('correctly generates ant theme from default theme', () => {
    const antTheme = generateAntTheme(lightTheme)

    const { result } = renderHook(() => useAntTheme(), { wrapper: ThemeProvider })

    expect(result.current).toEqual(antTheme)
  })

  for (const [themeName, theme] of Object.entries(themes)) {
    test(`correctly generates ant theme from ${themeName} theme`, () => {
      const antTheme = generateAntTheme(theme)

      const { result } = renderHook(() => useAntTheme(), { wrapper: themeProvider(theme) })

      expect(result.current).toEqual(antTheme)
    })
  }
})
