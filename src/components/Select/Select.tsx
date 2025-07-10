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

import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd'
import { PiCaretDown, PiCaretUp, PiCheck } from 'react-icons/pi'
import { ReactElement, useMemo, useState } from 'react'
import classnames from 'classnames'

import { BaseInput, defaults as baseInputDefaults } from '../BaseInput/BaseInput'
import { SelectItem, SelectProps } from './props'
import { Appearance } from '../BaseInput/types'
import { Dropdown } from '../Dropdown'
import { Icon } from '../Icon'
import { Tag } from '../Tag/Tag'
import styles from './select.module.css'

/**
 * A UI element to insert long text content in a form.
 *
 * @link https://ant.design/components/Autocomplete
 * @returns {Select} Select component
 */

const DEFAULT_ICON_SIZE = 16 as never

export const defaults = {
  ...baseInputDefaults,
}

const menuItemSelectedIcon = <Icon component={PiCheck} size={16} />

const tagRender = ({ label, onClose, closable }: {
  label: React.ReactNode;
  closable: boolean;
  onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}): ReactElement => {
  return (
    <Tag closeIcon={closable} isBordered onClose={onClose}>
      {label}
    </Tag>
  )
}

export const Select = <ValueType, >(
  {
    id,
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
    maxTagCount,
    maxTagPlaceholder,
    inputRef,
    autoFocus,
    onChange,
    onClear,
    onSelect,
    onDeselect,
    isMultiple,
    optionRender,
    onSearch,
    filterOption,
    optionFilterProp,
    dropdownRender,
    popupMatchSelectWidth,
    getPopupContainer,
    placement,
    className: classNameProp,
  }: SelectProps<ValueType>) : ReactElement => {
  const [open, setOpen] = useState(false)

  const className = useMemo(() => classnames([
    styles.select,
    isMultiple && styles.multiple,
    isDisabled && styles.disabled,
    isReadOnly && styles.readOnly,
    classNameProp,
  ]), [isDisabled, isMultiple, isReadOnly, classNameProp])

  const suffixIcon = useMemo(() => !isReadOnly && (
    <Icon component={open ? PiCaretUp : PiCaretDown} size={DEFAULT_ICON_SIZE} />
  ), [isReadOnly, open])

  return (
    <BaseInput <AntSelectProps<ValueType, SelectItem<ValueType>>>
      allowClear={allowClear}
      appearance={appearance}
      autoFocus={autoFocus}
      className={className}
      component={AntSelect}
      defaultValue={defaultValue}
      dropdownRender={dropdownRender}
      filterOption={filterOption}
      getPopupContainer={getPopupContainer}
      id={id}
      inputRef={inputRef}
      isDisabled={isDisabled}
      isError={isError}
      isFullWidth={isFullWidth}
      isReadOnly={isReadOnly}
      maxTagCount={maxTagCount}
      // This placeholder depends to tagRender prop
      maxTagPlaceholder={maxTagPlaceholder}
      menuItemSelectedIcon={menuItemSelectedIcon}
      mode={isMultiple ? 'multiple' : undefined}
      optionFilterProp={optionFilterProp}
      optionRender={optionRender}
      options={options}
      placeholder={placeholder}
      placement={placement}
      popupMatchSelectWidth={popupMatchSelectWidth}
      showSearch={Boolean(onSearch || filterOption)}
      suffixIcon={suffixIcon}
      tagRender={tagRender}
      value={value}
      onChange={onChange}
      onClear={onClear}
      onDeselect={onDeselect}
      onDropdownVisibleChange={setOpen}
      onSearch={onSearch}
      onSelect={onSelect}
    />
  )
}

Select.Appearance = Appearance
Select.Loader = Dropdown.Loader
Select.ErrorState = Dropdown.ErrorState
