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
 * Color intensity level ranging from 50 (lightest) to 900 (darkest).
 */
type Intensity = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 600 | 700 | 800 | 900

/**
 * Scale of colors from lighter to darker.
 */
type ColorGrades = Record<Intensity, Color>

/**
 * Represents the various states of an element.
 */
type State = 'active' | 'hover' | 'focus' | 'selected'

/**
 * Semantic map of colors for dynamic components.
 *
 * @remarks
 * Each category corresponds to a specific CSS pseudo-class.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes}
 */
type ColorInteractions = Record<State, Color>

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
  primary: ColorGrades,
  secondary: ColorGrades,
  error: ColorGrades,
  warning: ColorGrades,
  info: ColorGrades,
  success: ColorGrades,
  background: {
    primary: Background,
    neutral: Background,
  },
  action: {
    primary: ColorInteractions,
    secondary: ColorInteractions,
    danger: ColorInteractions,
    link: ColorInteractions,
    alternate: {
      primary: ColorInteractions,
      secondary: ColorInteractions,
      danger: ColorInteractions
    }
  }
}

export default Palette

export type {
  Color,
}
