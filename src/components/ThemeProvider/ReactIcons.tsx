/* eslint-disable react-refresh/only-export-components */

import { ReactElement, useMemo } from 'react'
import { IconContext } from 'react-icons'

import Theme from '../../themes/schema'
import { ThemeProviderProps } from '.'

/**
 * Generates a context configuration for React Icons based on a theme configuration.
 *
 * @param {Partial<Theme>} theme - theme configuration used to customize the generated React Icons context.
 * @returns {IconContext} The generated React Icons context.
 */
const generateReactIconsContext = ({ palette }: Partial<Theme> = {}): IconContext => ({
  color: palette?.info?.contrastText,
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
