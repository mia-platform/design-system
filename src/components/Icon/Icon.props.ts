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

import * as AntIcons from 'react-icons/ai'
import * as FeatherIcons from 'react-icons/fi'
import * as PhosphorIcons from 'react-icons/pi'

import MiaPlatform from './assets/MiaPlatform.svg'
import MiaPlatformColored from './assets/MiaPlatformColored.svg'

/**
 * Custom icons for brand images.
 *
 * @remarks This object should only be used for brand image-related custom SVGs.
 */
export const customIcons = {
  MiaPlatform,
  MiaPlatformColored,
} as const

/**
 * Supported icon packs.
 *
 * @see {@link https://github.com/feathericons/feather Feather Icons}
 * @see {@link https://github.com/phosphor-icons/core Phosphor Icons}
 * @see {@link https://github.com/ant-design/ant-design-icons Ant Icons}
 */
export const reactIcons = {
  ...FeatherIcons,
  ...PhosphorIcons,
  ...AntIcons,
} as const

export type IconProps = {

  /**
   * The color of the icon.
   */
  color?: string,

  /**
   * The name of the icon.
   */
  name: keyof typeof customIcons | keyof typeof reactIcons,

  /**
   * The size of the icon.
   */
  size?: 16 | 24 | 32 | 48 | 64 | 96,
}
