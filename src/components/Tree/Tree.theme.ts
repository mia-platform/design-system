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

import { ComponentsTheme, parse } from '../ThemeProvider/Ant'
import Theme from '../../themes/schema'

/**
 * Generates a Ant theme configuration for Tree component based on a theme configuration.
 *
 * @link https://ant.design/components/Tree#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Tree Ant theme configuration.
 */

export default ({ palette, shape }: Partial<Theme>): ComponentsTheme['Tree'] => ({
  nodeHoverBg: palette?.action?.alternate?.secondary?.hover,
  nodeSelectedBg: palette?.action?.alternate?.primary?.selected,
  titleHeight: parse(shape?.size?.lg),
})
