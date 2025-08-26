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

import { ReactElement, ReactNode } from 'react'
import type { SelectProps as AntdSelectProps } from 'antd'
import { FilterFunc } from 'rc-select/lib/Select'
import { FlattenOptionData } from 'rc-select/lib/interface'

import { BaseInputProps } from '../BaseInput/props'
import { Mode } from './Select.types'
import { SearchSelectHandler } from '../Search/props'

export type SelectItem<ValueType> = {
  value: ValueType
  label?: ReactNode
  [name: string]: unknown;
}

export type SelectChangeHandler<ValueType> = (
  value: ValueType,
  option: SelectItem<ValueType> | SelectItem<ValueType>[]
) => void

export type SelectSelectHandler<ValueType> = (
    value: ValueType extends (infer E)[] ? E : ValueType,
    option: SelectItem<ValueType>
  ) => void

export type OptionRender<ValueType> = (
  option: FlattenOptionData<SelectItem<ValueType>>,
  info: {index: number}
) => ReactNode

export type FilterOption<ValueType> = boolean | FilterFunc<SelectItem<ValueType>>

export type SelectProps<ValueType = unknown> = BaseInputProps & {

  /**
   * The id of the input.
   */
  id?: string

  /**
   * The input content value.
   */
  value?: ValueType

  /**
   * The default value for the input.
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
   * If allow to remove input content with clear icon.
   */
  maxTagCount?: number | 'responsive',

  /**
   * Placeholder for not showing tags when maxTagCount is passed
   */
  maxTagPlaceholder?: AntdSelectProps['maxTagPlaceholder'],

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
   * Callback function that is fired when input changed.
   */
  onSearch?: (value: string) => void

  /**
   * @deprecated use the `mode` property to use the Select with multiple selection
   * If multiple values are allowed.
   */
  isMultiple?: boolean

  /**
   * If tags mode is enabled.
   */
  mode?: Mode

  /**
   * Separator used to tokenize (es: ","), only applies when mode="tags"
   */
  tokenSeparators?: string[]

  /**
   * Customize the rendering dropdown options.
   */
  optionRender?: OptionRender<ValueType>

  /**
   * If true, filter options by input, if function, filter options against it.
   * The function will receive two arguments, inputValue and option, if the function
   * returns true, the option will be included in the filtered set; otherwise, it will be excluded.
   */
  filterOption?: FilterOption<ValueType>

  /**
   * The prop name to filter options. Default is 'value'.
   */
  optionFilterProp?: string

  /**
   * Customize the rendering of the dropdown.
   */
  dropdownRender?: (menu: ReactNode) => ReactElement

  /**
   * Determine whether the popup menu and the select input should have the same width.
   * Default set `min-width` of the popup to match the input.
   * This is ignored when the value is less than the select input's width.
   * Setting this to `false` will disable the virtual scroll
   */
  popupMatchSelectWidth?: boolean | number

  /**
   * Parent Node which the selector should be rendered to. Default to body.
  */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement

  /**
   * The position where the selection box pops up
   */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'

  /**
   * Classes for the select.
   */
  className?: string
}
