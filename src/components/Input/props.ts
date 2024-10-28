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

import { ChangeEventHandler } from 'react'

import { BaseInputProps } from '../BaseInput/props.ts'
import { IconComponent } from '../Icon/Icon.props.ts'
import { Type } from './types.ts'

export type InputProps = BaseInputProps & {

  /**
   * The html type of Input.
   */
  type?: Type

  /**
   * The left icon for the Input.
   */
  iconLeft?: IconComponent

  /**
   * The right icon for the Input.
   */
  iconRight?: IconComponent

  /**
   * The input content value.
   */
  value?: string

  /**
   * The input default value
   */
  defaultValue?: string

  /**
   * If allow to remove input content with clear icon.
   */
  allowClear?: boolean

  /**
   * The minimum number of characters in Input.
   */
  minLength?: number

  /**
   * The maximum number of characters in Input.
   */
  maxLength?: number

  /**
   * Callback when user input.
   */
  onChange?: ChangeEventHandler
}
