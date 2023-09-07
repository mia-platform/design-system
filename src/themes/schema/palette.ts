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
