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

import { Appearance, Type } from './types.ts'
import { IconComponent } from '../Icon/Icon.props.ts'

export type InputProps = {

  /**
   * The type of the Input.
   */
  appearance?: Appearance

  /**
   * The html type of Input.
   */
  type?: Type

  /**
   * Whether the input is disabled.
   */
  isDisabled?: boolean,

  /**
   * Whether the input has error.
   */
  isError?: boolean

  /**
   * Whether the input is read-only.
   */
  isReadOnly?: boolean

  /**
   * Whether the input is full width. Defaults to true.
   */
  isFullWidth?: boolean

  /**
   * The left icon for the Input.
   */
  iconLeft?: IconComponent

  /**
   * The right icon for the Input.
   */
  iconRight?: IconComponent

  /**
   * The placeholder for the Input.
   */
  placeholder?: string

  /**
   * The input content value.
   */
  value?: string

  /**
   */
  defaultValue?: string

  /**
   * If allow to remove input content with clear icon.
   */
  allowClear?: boolean

  /**
   * The maximum number of characters in Input.
   */
  maxLength?: number

  /**
   * The number of rows for the input.
   */
  rows?: number

  /**
   * Callback when user input.
   */
  onChange?: ChangeEventHandler;
}
