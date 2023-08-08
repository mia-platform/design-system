/* eslint-disable func-names */
/* eslint-disable react/display-name */

import { render, renderHook } from '@testing-library/react'
import { ReactElement } from 'react'

import { ThemeProvider, ThemeProviderProps, useTheme } from '..'
import Theme from '../../../themes/schema'
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
