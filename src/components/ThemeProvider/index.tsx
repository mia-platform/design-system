/* eslint-disable react-refresh/only-export-components */

import { ReactElement, createContext, useContext, useMemo } from 'react'
import { AntThemeProvider } from './Ant'
import Theme from '../../themes/schema'
import themeToVariables from './utils/themeToVariables'
import themes from '../../themes'

export type ThemeProviderProps = {

  /**
   * The children nodes to be rendered with the theme context
   */
  children?: ReactElement,

  /**
   * The theme configuration to be passed to children nodes
   */
  theme?: Theme,
}

const { lightTheme: defaultTheme } = themes

/**
 * A context to provide the theme throughout the application.
 */
const ThemeContext = createContext(defaultTheme)

/**
 * Provides theming for the application.
 *
 * @param {ThemeProviderProps} props - The component props.
 * @returns {ReactElement} A component providing the theme to its children.
 */
const ThemeProvider = ({ theme, children }: ThemeProviderProps): ReactElement => {
  const style = useMemo(() => themeToVariables(theme), [theme])

  return (
    <ThemeContext.Provider value={theme!}>
      <AntThemeProvider theme={theme}>
        <div style={style}>
          {children}
        </div>
      </AntThemeProvider>
    </ThemeContext.Provider>
  )
}

ThemeProvider.defaultProps = {
  children: undefined,
  theme: defaultTheme,
}

/**
 * A hook to access the current theme from the context.
 *
 * @returns {Theme} The current theme.
 */
const useTheme = (): Theme => {
  const theme = useContext(ThemeContext)

  return useMemo(() => theme ?? defaultTheme, [theme])
}

export {
  ThemeProvider,
  ThemeContext,
  useTheme,
}
