import { useContext, useMemo } from 'react'

import type Theme from '../themes/schema'
import { ThemeContext } from '../components/ThemeProvider'
import themes from '../themes'

const { lightTheme: defaultTheme } = themes

/**
 * A hook to access the current theme from the context.
 *
 * @returns {Theme} The current theme.
 */
const useTheme = (): Theme => {
  const theme = useContext(ThemeContext)

  return useMemo(() => theme ?? defaultTheme, [theme])
}

export default useTheme
