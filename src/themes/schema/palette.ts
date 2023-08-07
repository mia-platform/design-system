import { Elevation } from './elevation'

/**
 * Hex color
 * @example #aabbcc
 */
type Color = string

/**
 * Scale of colors from lighter to darker.
 */
type ColorGrades = {
  50: Color,
  100: Color,
  200: Color,
  300: Color,
  400: Color,
  500: Color,
  600: Color,
  700: Color,
  800: Color,
  900: Color
}

/**
 * Semantic map of colors for static components.
 *
 * @remarks
 * light: a lighter version of the main color.
 *
 * dark: a darker version of the main color.
 *
 * contrastText: color that grants accessibility when superimposed on the main color.
 */
type ColorMap = {
  light: Color,
  main: Color,
  dark: Color,
  contrastText: Color
}

/**
 * Semantic map of colors for dynamic components.
 *
 * @remarks
 * Each category corresponds to a specific CSS pseudo-class.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes}
 */
type ColorInteractions = {
  active: Color,
  hover: Color,
  focus: Color,
  selected: Color,
  disabled: Color
}

/**
 * Scale of background colors.
 *
 * @remarks
 * Darker palettes use specific contrasts among backgrounds
 * instead of shadows to express elevation.
 */
type Background = Record<Elevation, Color>

/**
 * The browser color scheme that matches the palette.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme}
 */
type Mode = 'light' | 'dark' | string

/**
 * Set of all colors composing the theme.
 */
type Palette = {
  mode: Mode,
  common: {
    black: Color,
    white: Color,
    grey: ColorGrades,
  },
  primary: ColorMap,
  secondary: ColorMap,
  error: ColorMap,
  warning: ColorMap,
  info: ColorMap,
  success: ColorMap,
  background: Background,
  link: ColorInteractions,
  action: {
    primary: ColorInteractions,
    secondary: ColorInteractions,
    danger: ColorInteractions
  }
}

export default Palette
