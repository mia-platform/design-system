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

import { BaseInputProps } from '../BaseInput/props'
import { IconComponent } from '../Icon/Icon.props'

export type SearchItem<ValueType> = {
  value: ValueType
  label?: ReactNode
}

export type SearchChangeHandler<ValueType> = (
  value: ValueType,
  option: SearchItem<ValueType> | SearchItem<ValueType>[]
) => void

export type SearchSelectHandler<ValueType> = (
  value: ValueType extends (infer E)[] ? E : ValueType,
  option: SearchItem<ValueType>
) => void

export type SearchProps<ValueType> = BaseInputProps & {

  /**
   * The input content value.
   */
  value?: ValueType

  /**
   * The default valute for the input.
   */
  defaultValue?: ValueType

  /**
  * Select options.
   */
  options: SearchItem<ValueType>[]

  /**
   * The left icon for the Input.
   */
  iconLeft?: IconComponent

  /**
   * The right icon for the Input.
   */
  iconRight?: IconComponent

  /**
   * If allow to remove input content with clear icon.
   */
  allowClear?: boolean

  /**
   * Callback when user input.
   */
  onChange?: SearchChangeHandler<ValueType>

  /**
   * Callback when an option is selected.
   */
  onSelect?: SearchSelectHandler<ValueType>

  /**
   * Callback when searching.
   */
  onSearch?: (value: string) => void
}
