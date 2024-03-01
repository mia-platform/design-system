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

import { ComponentsTheme, parse } from '../ThemeProvider/Ant'
import Theme from '../../themes/schema'

/**
 * Generates a Ant theme configuration for Menu component based on a theme configuration (default theme).
 *
 * @link https://ant.design/components/menu#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Menu Ant theme configuration.
 */
export default ({ palette, shape, spacing, typography }: Partial<Theme>): ComponentsTheme['Menu'] => ({
  groupTitleColor: palette?.common?.grey?.[500],
  groupTitleFontSize: typography?.caption?.fontSize,
  groupTitleLineHeight: 1,
  horizontalItemBorderRadius: parse(shape?.border?.radius?.md),
  iconSize: parse(shape?.size?.md),
  itemBorderRadius: parse(shape?.border?.radius?.md),
  itemHeight: (typography?.bodyM?.lineHeight ?? 24) + (parse(spacing?.padding?.sm) ?? 8),
  itemActiveBg: palette?.action?.alternate?.primary?.active,
  itemHoverBg: palette?.action?.alternate?.secondary?.hover,
  itemSelectedBg: palette?.action?.alternate?.primary?.active,
})

/**
 * Generates a Ant theme configuration for Menu component based on a theme configuration (primary theme).
 *
 * @link https://ant.design/components/menu#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Menu Ant theme configuration.
 */
export const primaryTheme = ({ palette, shape, spacing }: Partial<Theme>): ComponentsTheme['Menu'] => ({
  activeBarBorderWidth: 0,
  horizontalItemBorderRadius: parse(shape?.border?.radius?.md),
  itemBg: 'transparent',
  itemHoverBg: palette?.action?.alternate?.primary?.hover,
  itemSelectedBg: palette?.common?.white,
  itemSelectedColor: palette?.common?.grey?.[700],
  itemMarginInline: 0,
  itemPaddingInline: 0,
  padding: parse(spacing?.padding?.md),
  subMenuItemBg: 'transparent',
})
