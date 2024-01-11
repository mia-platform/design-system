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

import { TextOrientation, Type } from './Divider.types'

export type DividerProps = {

  /**
   * The wrapped title to be shown in the divider.
   */
  children?: ReactNode,

  /**
   * Show the divider as dashed line. Default is false.
   */
  isDashed?: boolean,

  /**
   * The margin-left/right between the title and its closest border, based on the orientation left or right.
   * If a numeric value of type string is provided without a unit, it is assumed to be in pixels (px) by default.
   */
  orientationMargin?: string | number,

  /**
   * Defines the text orientation on the divider. Either:
   *
   * - center(default)
   * - left
   * - right
   */
  orientation?: TextOrientation,

  /**
   * Show the text on divider as plain style. Default is true.
   */
  isPlain?: boolean,

  /**
   * Defines the divider type. Either:
   *
   * - horizontal(default)
   * - vertical
   */
  type?: Type
}
