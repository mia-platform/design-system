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

import { Input as AntInput } from 'antd'
import { ReactElement } from 'react'

import { BaseInput, defaults as baseInputDefaults } from '../BaseInput/BaseInput'
import { Icon } from '../Icon'
import { InputProps } from './props'
import { Type } from './types'

export const defaults = {
  ...baseInputDefaults,
  htmlType: Type.Text,
}

const DEFAULT_ICON_SIZE = 12 as never

/**
 * A UI element to insert text content in a form.
 *
 * @link https://ant.design/components/input
 * @returns {Input} Input component
 */
export const Input = (
  {
    appearance = defaults.type,
    type = defaults.htmlType,
    value,
    defaultValue,
    isDisabled,
    isReadOnly,
    isFullWidth = defaults.isFullWidth,
    isError,
    inputRef,
    onChange,
    placeholder,
    iconLeft,
    iconRight,
    allowClear,
    maxLength,
    minLength,
  }: InputProps
) : ReactElement => {
  return (
    <BaseInput
      allowClear={allowClear}
      appearance={appearance}
      component={AntInput}
      defaultValue={defaultValue}
      inputRef={inputRef}
      isDisabled={isDisabled}
      isError={isError}
      isFullWidth={isFullWidth}
      isReadOnly={isReadOnly}
      maxLength={maxLength}
      minLength={minLength}
      placeholder={placeholder}
      prefix={iconLeft && <Icon component={iconLeft} size={DEFAULT_ICON_SIZE} />}
      suffix={iconRight && <Icon component={iconRight} size={DEFAULT_ICON_SIZE} />}
      type={type}
      value={value}
      onChange={onChange}
    />
  )
}

Input.Type = BaseInput.Appearance
Input.HTMLType = Type
