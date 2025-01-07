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
import { isObject } from '../../utils/object.ts'
import styles from './input.module.css'

export const defaults = {
  ...baseInputDefaults,
  htmlType: Type.Text,
  valuePropName: 'value',
}

const DEFAULT_ICON_SIZE = 12 as never

type AddonPosition = 'before' | 'after'

const getAddonDefaultValue = (position: AddonPosition, props?: InputAddonProps) : Record<string, unknown> => {
  return props && (props.value !== undefined || props.defaultValue !== undefined)
    ? { [props.name || position]: props.value || props.defaultValue }
    : {}
}

const useInputValue = (
  value: Record<string, unknown> | string | undefined,
  valuePropName: string,
  { before, after }: Record<AddonPosition, InputAddonProps | undefined>
):
  [
    Record<string, unknown>,
    React.Dispatch<React.SetStateAction<Record<string, unknown>>>
  ] => {
  return useState({
    ...(isObject(value) ? value : { [valuePropName]: value || '' }),
    ...getAddonDefaultValue('before', before),
    ...getAddonDefaultValue('after', after),
  })
}

/**
 * A UI element to insert text content in a form.
 *
 * @link https://ant.design/components/input
 * @returns {Input} Input component
 */
export const Input = (
  {
    id,
    appearance = defaults.type,
    type = defaults.htmlType,
    value,
    defaultValue,
    valuePropName = defaults.valuePropName,
    isDisabled,
    isReadOnly,
    isFullWidth = defaults.isFullWidth,
    isError,
    inputRef,
    onChange,
    placeholder,
    iconLeft,
    autoFocus,
    iconRight,
    allowClear,
    maxLength,
    minLength,
    addonAfter: addonAfterProp,
    addonBefore: addonBeforeProp,
  }: InputProps
) : ReactElement => {
  const [val, setVal] = useInputValue(value || defaultValue, valuePropName, {
    before: addonBeforeProp,
    after: addonAfterProp,
  })

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target
    const nextVal = { ...val, [valuePropName]: nextValue }
    setVal(nextVal)
    if (onChange) {
      onChange(event, addonBeforeProp || addonAfterProp ? nextVal : nextValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addonAfterProp, addonBeforeProp, onChange, valuePropName])

  const renderAddon = useCallback((
    position: AddonPosition,
    {
      value: addonValue,
      onChange: onChangeAddon,
      disabled: addonDisabled,
      name: addonName,
      ...rest
    }: InputAddonProps
  ) => {
    return (
      <InputAddon
        {...rest}
        isDisabled={addonDisabled === undefined ? isDisabled : addonDisabled}
        value={addonValue !== undefined ? addonValue : val[addonName || position]}
        onChange={(nextValue) => {
          const nextVal = { ...val, [addonName || position]: nextValue }
          setVal(nextVal)
          if (onChange) {
            onChange(undefined, nextVal)
          }
          if (onChangeAddon) {
            onChangeAddon(nextValue)
          }
        }}
      />
    )
  }, [isDisabled, onChange, setVal, val])

  const addonBefore = useMemo(() => (
    addonBeforeProp && renderAddon('before', addonBeforeProp)
  ), [addonBeforeProp, renderAddon])

  const addonAfter = useMemo(() => (
    addonAfterProp && renderAddon('after', addonAfterProp)
  ), [addonAfterProp, renderAddon])

  const getValue = useCallback((strOrObj?: string | Record<string, unknown>) => {
    return isObject(strOrObj) ? String(strOrObj[valuePropName]) : strOrObj
  }, [valuePropName])

  const inputValue = useMemo(() => {
    return getValue(value)
  }, [getValue, value])

  const inputDefaultValue = useMemo(() => {
    return getValue(defaultValue)
  }, [getValue, defaultValue])

  return (
    <BaseInput
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      appearance={appearance}
      autoFocus={autoFocus}
      className={styles.input}
      component={AntInput}
      defaultValue={inputDefaultValue}
      id={id}
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
      value={inputValue}
      onChange={handleChange}
    />
  )
}

Input.Appearance = BaseInput.Appearance
Input.Type = Type
Input.AddonType = AddonType
