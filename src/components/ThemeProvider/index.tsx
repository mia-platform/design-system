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

const ThemeContext = createContext(defaultTheme)

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

const useTheme = (): Theme => {
  const theme = useContext(ThemeContext)

  return useMemo(() => theme ?? defaultTheme, [theme])
}

export {
  ThemeProvider,
  ThemeContext,
  useTheme,
}
