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
import { DropdownProps } from '../Dropdown/props.ts'
import { SearchSelectHandler } from '../Search/props'

export type SelectItem<ValueType> = {
  value: ValueType
  label?: ReactNode
}

export type SelectChangeHandler<ValueType> = (
  value: ValueType,
  option: SelectItem<ValueType> | SelectItem<ValueType>[]
) => void

export type SelectSelectHandler<ValueType> = (
    value: ValueType extends (infer E)[] ? E : ValueType,
    option: SelectItem<ValueType>
  ) => void

export type SelectProps<ValueType> = BaseInputProps & {

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
  options: SelectItem<ValueType>[]

  /**
   * If allow to remove input content with clear icon.
   */
  allowClear?: boolean

  /**
   * Callback when user input.
   */
  onChange?: SelectChangeHandler<ValueType>

  /**
   * Callback when user input.
   */
  onClear?: () => void

  /**
   * Callback when an option is selected.
   */
  onSelect?: SearchSelectHandler<ValueType>

  /**
   * Callback when an option is selected.
   */
  onDeselect?: SelectSelectHandler<ValueType>

  /**
   * If multiple values are allowed.
   */
  isMultiple?: boolean

  dropdownProps?: DropdownProps

}
