import React from "react"
import type { Decorator } from "@storybook/react"

import themes from '../../src/themes'
import { ThemeProvider } from '../../src/components/ThemeProvider'
import { Themes } from "../../src/utils/theme"

const {lightTheme, darkTheme} = themes

/**
 * A Storybook decorator that applies a theme to the wrapped components.
 * 
 * @param Story - The story component being decorated.
 * @param context - The context object containing contextual information.
 * @returns The decorated Story component with the specified theme.
 */
const withTheme: Decorator = (Story, {globals}) => {
  const { theme: themeKey } = globals

  const theme = themeKey == Themes.dark ?
    darkTheme :
    lightTheme
  
  return (
    <ThemeProvider theme={theme}>
      <Story/>
    </ThemeProvider>
  )
}

export default withTheme
