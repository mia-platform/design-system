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
  groupTitleColor: palette?.common?.grey?.[700],
  groupTitleFontSize: parse(typography?.caption?.fontSize),
  groupTitleLineHeight: 1,
  itemHeight: (parse(typography?.bodyS?.lineHeight) ?? 24) + (parse(spacing?.padding?.sm) ?? 8),
  activeBarBorderWidth: 0,
  iconSize: parse(shape?.size?.xl),
})

/**
 * Generates a Ant theme configuration for Menu component based on a theme configuration (primary theme).
 *
 * @link https://ant.design/components/menu#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Menu Ant theme configuration.
 */
export const primaryTheme = ({ palette }: Partial<Theme>): ComponentsTheme['Menu'] => ({
  subMenuItemBg: 'transparent',
  itemBg: 'transparent',
  itemColor: palette?.common?.grey?.[800],
  itemHoverBg: '#1890FF15',
  itemHoverColor: palette?.common?.grey?.[800],
  itemSelectedBg: palette?.common?.white,
  itemSelectedColor: palette?.common?.grey?.[800],
})
