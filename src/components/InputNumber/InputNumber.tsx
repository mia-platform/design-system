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

import { InputNumber as AntInputNumber } from 'antd'
import { ReactElement } from 'react'

import { BaseInput, defaults as baseInputDefaults } from '../BaseInput/BaseInput'
import { Appearance } from '../BaseInput/types'
import { InputNumberProps } from './props'
import styles from './inputNumber.module.css'

export const defaults = {
  ...baseInputDefaults,
}

/**
 * A UI element to insert number content in a form.
 *
 * @link https://ant.design/components/InputNumber
 * @returns {InputNumber} InputNumber component
 */
export const InputNumber = (
  {
    id,
    appearance = defaults.type,
    value,
    defaultValue,
    isDisabled,
    isReadOnly,
    isFullWidth = defaults.isFullWidth,
    isError,
    inputRef,
    onChange,
    placeholder,
    min,
    max,
    step,
    precision,
    autoFocus,
  }: InputNumberProps) : ReactElement => {
  return (
    <BaseInput
      appearance={appearance}
      autoFocus={autoFocus}
      className={styles.inputNumber}
      component={AntInputNumber}
      defaultValue={defaultValue}
      id={id}
      inputRef={inputRef}
      isDisabled={isDisabled}
      isError={isError}
      isFullWidth={isFullWidth}
      isReadOnly={isReadOnly}
      max={max}
      min={min}
      placeholder={placeholder}
      precision={precision}
      step={step}
      value={value}
      onChange={onChange}
    />
  )
}

InputNumber.Appearance = Appearance
