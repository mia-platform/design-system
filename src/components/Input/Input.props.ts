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
import { HTMLType, Type } from './Input.types.ts'
import { IconComponent } from '../Icon/Icon.props.ts'

export type InputProps = {

  type?: Type

  htmlType?: HTMLType

  /**
   * The main content of the Tag.
   */
  isDisabled?: boolean,

  /**
   * The main content of the Tag.
   */
  isError?: boolean

  isReadOnly?: boolean

  isFullWidth?: boolean

  iconLeft?: IconComponent

  iconRight?: IconComponent

  placeholder?: string

  value?: string

  defaultValue?: string

  allowClear?: boolean

  maxLength?: number
}
