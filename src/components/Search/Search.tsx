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

import { AutoComplete as AntAutoComplete, AutoCompleteProps as AntAutoCompleteProps, InputRef } from 'antd'
import { ReactElement, Ref, forwardRef as forwardref, useCallback } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'

import { BaseInput, defaults as baseInputDefaults } from '../BaseInput/BaseInput'
import { SearchItem, SearchProps } from './props'
import { Appearance } from '../BaseInput/types'
import { Dropdown } from '../Dropdown'
import { Input } from '../Input/index'
import { InputProps } from '../Input/props'
import styles from './search.module.css'

/**
 * A UI element to insert long text content in a form.
 *
 * @link https://ant.design/components/Autocomplete
 * @returns {Search} Search component
 */

export const defaults = {
  ...baseInputDefaults,
  iconRight: PiMagnifyingGlass,
}

const InnerInput = forwardref(
  function InnerInput(props: InputProps, ref: Ref<InputRef>): ReactElement {
    return <Input inputRef={ref} type={Input.Type.Search} {...props} />
  }
)

export const Search = <ValueType, >(
  {
    appearance = defaults.type,
    value,
    defaultValue,
    isDisabled,
    isReadOnly,
    isFullWidth = defaults.isFullWidth,
    isError,
    placeholder,
    allowClear,
    options,
    inputRef,
    iconLeft,
    iconRight = defaults.iconRight,
    onChange,
    onSelect,
    onSearch,
    dropdownProps,
  }: SearchProps<ValueType>) : ReactElement => {
  const dropdownRender = useCallback((menu: ReactElement) => {
    const props = { children: menu, items: [], ...dropdownProps }
    return <Dropdown {...props} />
  }, [dropdownProps])

  return (
    <BaseInput <AntAutoCompleteProps<ValueType, SearchItem<ValueType>>>
      appearance={appearance}
      className={styles.search}
      component={AntAutoComplete}
      defaultValue={defaultValue}
      dropdownRender={dropdownRender}
      inputRef={inputRef}
      isDisabled={isDisabled}
      isError={isError}
      isFullWidth={isFullWidth}
      isReadOnly={isReadOnly}
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      onSelect={onSelect}
    >
      <InnerInput
        allowClear={allowClear}
        appearance={appearance}
        iconLeft={iconLeft}
        iconRight={iconRight}
        isDisabled={isDisabled}
        isError={isError}
        isFullWidth={isFullWidth}
        isReadOnly={isReadOnly}
      />
    </BaseInput>
  )
}

Search.Appearance = Appearance
