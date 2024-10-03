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

import { ReactNode } from 'react'

import { Orientation, TextOrientation } from './Divider.types'
import { Space } from '../../themes/schema/spacing'

export type DividerProps = {

  /**
   * margin dimension
   */
  margin?: Space

  /**
   * Defines the divider type. Either:
   *
   * - "horizontal" (default)
   * - "vertical"
   */
  orientation?: Orientation,

  /**
   * The text to show on the separator
   */
  text?: string | ReactNode,

  /**
   * Defines the text orientation on the divider. Either:
   *
   * - "center" (default)
   * - "left"
   * - "right"
   */
  textOrientation?: TextOrientation,
}
