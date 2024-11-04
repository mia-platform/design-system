/**
 * Copyright 2024 Mia srl
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
 * Generates a Ant theme configuration for Input component based on a theme configuration.
 *
 * @link https://ant.design/components/input#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Input Ant theme configuration.
 */
export default ({ palette, spacing, shape }: Partial<Theme>): ComponentsTheme['Input'] => ({
  // sizing
  paddingBlock: Number(spacing?.padding.sm),
  paddingInline: Number(spacing?.padding.sm),
  // shape
  borderRadius: Number(shape?.border?.radius?.md),
  // palette
  colorBgContainer: palette?.action?.secondary?.main,
  colorText: palette?.action?.secondary?.contrastText,
  colorTextPlaceholder: palette?.text?.neutral?.subtler,
  colorBorder: palette?.action?.secondary?.bold,
  // hover
  hoverBorderColor: palette?.action?.primary?.hover,
  // active
  activeBorderColor: palette?.action?.primary?.default,
  // activeShadow: `0 0 2px rgba(0, 93, 201, 0.25)`,
  // error
  colorErrorText: palette?.text?.neutral?.main,
  colorErrorBorder: palette?.action?.danger?.default,
  colorErrorHover: palette?.action?.danger?.hover,
  colorErrorBorderHover: palette?.action?.danger?.hover,
  colorErrorActive: palette?.action?.danger?.default,
  // errorActiveShadow: `0 0 2px rgba(185, 18, 0, 0.5)`,
  // disabled
  colorTextDisabled: palette?.action?.disabled?.contrastText,
  // icons
  colorTextQuaternary: palette?.text?.neutral?.subtle,
  colorIcon: palette?.text?.neutral?.subtle,
})
