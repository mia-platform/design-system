export enum Themes {
  light = 'light',
  dark = 'dark'
}

export type Theme = keyof typeof Themes

/**
 * Checks if the browser's current theme matches the specified theme.
 *
 * @param {Theme} theme - The theme to check against the browser's preferred color scheme.
 * @returns {boolean} A boolean value indicating whether the browser's current theme matches the specified theme.
 */
export const isBrowserTheme = (theme: Theme): boolean => {
  return window.matchMedia(`(prefers-color-scheme: ${theme})`).matches
}
