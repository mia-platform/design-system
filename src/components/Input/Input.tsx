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

import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { Input as AntInput } from 'antd'

import { AddonType, Type } from './types'
import { BaseInput, defaults as baseInputDefaults } from '../BaseInput/BaseInput'
import { InputAddon, InputAddonProps } from './InputAddon.tsx'
import { Icon } from '../Icon'
import { InputProps } from './props'
import styles from './input.module.css'

export const defaults = {
  ...baseInputDefaults,
  htmlType: Type.Text,
}

const DEFAULT_ICON_SIZE = 12 as never

type AddonPosition = 'before' | 'after'

const getAddonDefaultValue = (
  position: AddonPosition,
  props?: InputAddonProps
): Record<string, unknown> => {
  return props && (props.value !== undefined || props.defaultValue !== undefined)
    ? { [position]: props.value || props.defaultValue } : {}
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
    inputRef,
    onChange,
    placeholder,
    iconLeft,
    iconRight,
    allowClear,
    maxLength,
    minLength,
    addonAfter: addonAfterProp,
    addonBefore: addonBeforeProp,
  }: InputProps
) : ReactElement => {
  const [val, setVal] = useState({
    value: value || defaultValue || '',
    ...getAddonDefaultValue('before', addonBeforeProp),
    ...getAddonDefaultValue('after', addonAfterProp),
  })

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target
    const nextVal = { ...val, value: nextValue }
    setVal(nextVal)
    if (onChange) {
      onChange(event, nextVal)
    }
  }, [onChange, val])

  const renderAddon = useCallback((position: AddonPosition, props: InputAddonProps) => {
    const { onChange: onChangeAddon, disabled: addonDisabled, ...rest } = props

    const isAddonDisabled = addonDisabled === undefined
      ? isDisabled
      : addonDisabled

    const handleChangeAddon = (nextValue: unknown) : void => {
      const nextVal = { ...val, [position]: nextValue }
      setVal(nextVal)
      if (onChangeAddon) {
        onChangeAddon(nextValue)
      }
      if (onChange) {
        onChange(undefined, nextVal)
      }
    }

    return (
      <InputAddon
        isDisabled={isAddonDisabled}
        onChange={handleChangeAddon}
        {...rest}
      />
    )
  }, [isDisabled, onChange, val])

  const addonBefore = useMemo(() => (
    addonBeforeProp && renderAddon('before', addonBeforeProp)
  ), [addonBeforeProp, renderAddon])

  const addonAfter = useMemo(() => (
    addonAfterProp && renderAddon('after', addonAfterProp)
  ), [addonAfterProp, renderAddon])

  return (
    <BaseInput
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      appearance={appearance}
      className={styles.input}
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
      onChange={handleChange}
    />
  )
}

Input.Appearance = BaseInput.Appearance
Input.Type = Type
Input.AddonType = AddonType
