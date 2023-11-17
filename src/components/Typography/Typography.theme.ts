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

import { ComponentsTheme } from '../ThemeProvider/Ant'
import Theme from '../../themes/schema'

/**
 * Computes the relative line height of a TextFormat element from its absolute line height and font size.
 *
 * @param {number} lineHeight - Absolute line height of the TextFormat element.
 * @param {number} fontSize - Absolute font size of the TextFormat element.
 * @returns {number | undefined} relative line height (or undefined if one of the absolute values is missing).
 */
const getRelativeLineHeight = (lineHeight?: number, fontSize?: number): number | undefined => {
  if (!lineHeight || !fontSize) { return undefined }

  return lineHeight / fontSize
}

/**
 * Generates a Ant theme configuration for Typography component based on a theme configuration.
 *
 * @link https://ant.design/components/typography#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Typography Ant theme configuration.
 */
export default ({ typography }: Partial<Theme>): ComponentsTheme['Typography'] => ({
  fontSizeHeading1: typography?.h1?.fontSize,
  fontSizeHeading2: typography?.h2?.fontSize,
  fontSizeHeading3: typography?.h3?.fontSize,
  fontSizeHeading4: typography?.h4?.fontSize,
  lineHeightHeading1: getRelativeLineHeight(typography?.h1?.lineHeight, typography?.h1?.fontSize),
  lineHeightHeading2: getRelativeLineHeight(typography?.h2?.lineHeight, typography?.h2?.fontSize),
  lineHeightHeading3: getRelativeLineHeight(typography?.h3?.lineHeight, typography?.h3?.fontSize),
  lineHeightHeading4: getRelativeLineHeight(typography?.h4?.lineHeight, typography?.h4?.fontSize),
})
