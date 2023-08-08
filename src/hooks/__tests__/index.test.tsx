/* eslint-disable func-names */
/* eslint-disable react/display-name */

import { renderHook } from '@testing-library/react'

import { ThemeProvider, ThemeProviderProps } from '../../components/ThemeProvider'
import Theme from '../../themes/schema'
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
