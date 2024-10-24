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
// eslint-disable-next-line sort-imports
import { ReactElement, useMemo } from 'react'
import classnames from 'classnames'

import { HTMLType, Type } from './Input.types.ts'
import { Icon } from '../Icon'
import { InputProps } from './Input.props'
import styles from './Input.module.css'

export const defaults: Partial<InputProps> = {
  type: Type.Outlined,
  htmlType: HTMLType.Text,
  isFullWidth: true,
}

const ICON_SIZE = 12 as never

export const Input = (
  props: InputProps
) : ReactElement => {
  const {
    type = defaults.type,
    htmlType = defaults.htmlType,
    value,
    defaultValue,
    isDisabled,
    isReadOnly,
    isFullWidth = defaults.isFullWidth,
    isError,
    placeholder,
    iconLeft,
    iconRight,
    allowClear,
    maxLength,
  } = props

  const className = useMemo(() => classnames([
    styles.input,
    isFullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    isReadOnly && styles.readonly,
  ]), [isDisabled, isFullWidth, isReadOnly])

  return (
    <AntInput
      allowClear={allowClear}
      className={className}
      classNames={{ prefix: styles.inputPrefix, suffix: styles.inputSuffix }}
      defaultValue={defaultValue}
      disabled={isDisabled}
      maxLength={maxLength}
      placeholder={placeholder}
      prefix={iconLeft && <Icon component={iconLeft} size={ICON_SIZE} />}
      status={isError ? 'error' : undefined}
      suffix={iconRight && <Icon component={iconRight} size={ICON_SIZE} />}
      type={htmlType}
      value={value}
      variant={type}
    />
  )
}

Input.Type = Type
Input.HTMLType = HTMLType
