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

import Theme from '../../../themes/schema'

/**
 * Default typography settings.
 */
const DEFAULT_COLOR = '#464646'
const DEFAULT_FONT_FAMILY = 'Inter'
const DEFAULT_FONT_SIZE = 14
const DEFAULT_FONT_WEIGHT = 400

/**
 * Loads the default font-face (Inter) if the theme configuration uses the default font family.
 *
 * @link https://fonts.google.com/specimen/Inter?query=inter
 * @link https://fontsource.org/fonts/inter
 *
 * @param {Theme} theme - The theme configuration object.
 * @returns {void}
 */
function loadDefaultFontFace({ typography }: Partial<Theme>): void {
  const useDefaultFontFace = !typography || Object
    .values(typography)
    .some(({ fontFamily }) => fontFamily === DEFAULT_FONT_FAMILY)

  if (useDefaultFontFace) {
    import('@fontsource/inter' as 'inter-font-face')
  }
}

/**
 * Converts a theme configuration into the theme default style applied to the DOM.
 *
 * @param {Theme} theme - The theme configuration to convert.
 * @returns {Record<string, string>} A record of CSS default values.
 */
export default function themeDefaultStyle(theme: Partial<Theme> = {}): Record<string, string> {
  const { palette, typography } = theme

  loadDefaultFontFace(theme)

  return {
    color: palette?.common?.grey?.[700] ?? DEFAULT_COLOR,
    fontFamily: typography?.bodyS?.fontFamily ?? DEFAULT_FONT_FAMILY,
    fontSize: `${typography?.bodyS?.fontSize ?? DEFAULT_FONT_SIZE}px`,
    fontWeight: `${typography?.bodyS?.fontWeight ?? DEFAULT_FONT_WEIGHT}`,
    height: '100%',
    width: '100%',
  }
}

export {
  DEFAULT_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
}
