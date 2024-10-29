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

import { ElementType, ReactElement, useMemo } from 'react'
import { Input as AntInput } from 'antd'
import classnames from 'classnames'

import { Appearance, Type } from './types.ts'
import { Icon } from '../Icon'
import { InputProps } from './props.ts'
import styles from './input.module.css'

export const defaults = {
  type: Appearance.Outlined,
  htmlType: Type.Text,
  isFullWidth: true,
}

const DEFAULT_ICON_SIZE = 12 as never

function getComponentByType(htmlType: Type): ElementType {
  return htmlType === Type.Textarea ? AntInput.TextArea : AntInput
}

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
    onChange,
    placeholder,
    iconLeft,
    iconRight,
    allowClear,
    maxLength,
    rows,
  }: InputProps
) : ReactElement => {
  const className = useMemo(() => classnames([
    styles.input,
    isFullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    isReadOnly && styles.readonly,
    type === Type.Hidden && styles.hidden,
  ]), [type, isDisabled, isFullWidth, isReadOnly])

  const Component = useMemo(() => getComponentByType(type), [type])

  return (
    <Component
      allowClear={allowClear}
      className={className}
      classNames={{ prefix: styles.inputPrefix, suffix: styles.inputSuffix }}
      defaultValue={defaultValue}
      disabled={isDisabled}
      maxLength={maxLength}
      placeholder={placeholder}
      prefix={iconLeft && <Icon component={iconLeft} size={DEFAULT_ICON_SIZE} />}
      rows={rows}
      status={isError ? 'error' : undefined}
      suffix={iconRight && <Icon component={iconRight} size={DEFAULT_ICON_SIZE} />}
      type={type}
      value={value}
      variant={appearance}
      onChange={onChange}
    />
  )
}

Input.Type = Appearance
Input.HTMLType = Type
