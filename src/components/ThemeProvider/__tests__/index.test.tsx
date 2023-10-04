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

import { ReactElement } from 'react'
import { render } from '@testing-library/react'

import type Theme from '../../../themes/schema'
import { ThemeProvider } from '..'
import themeToVariables from '../utils/themeToVariables'
import themes from '../../../themes'

const { lightTheme } = themes

describe('ThemeProvider', () => {
  const themeProvider = (theme?: Theme): ReactElement => {
    return (
      <ThemeProvider theme={theme}>
        <div data-testid="theme-consumer" />
      </ThemeProvider>
    )
  }

  test('set default style correctly', () => {
    const { getByTestId } = render(themeProvider())

    const themeConsumer = getByTestId('theme-consumer').parentNode

    if (themeConsumer instanceof Element) {
      const themeVariables = themeToVariables(lightTheme)
      const themeStyle = getComputedStyle(themeConsumer)

      for (const [variable, value] of Object.entries(themeVariables)) {
        expect(themeStyle.getPropertyValue(variable)).toEqual(value.toString())
      }
    }
  })

  for (const [themeName, theme] of Object.entries(themes)) {
    test(`set ${themeName} style correctly`, () => {
      const { getByTestId } = render(themeProvider(theme))

      const themeConsumer = getByTestId('theme-consumer').parentNode

      if (themeConsumer instanceof Element) {
        const themeVariables = themeToVariables(theme)
        const themeStyle = getComputedStyle(themeConsumer)

        for (const [variable, value] of Object.entries(themeVariables)) {
          expect(themeStyle.getPropertyValue(variable)).toEqual(value.toString())
        }
      }
    })
  }
})
