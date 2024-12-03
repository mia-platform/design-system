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

import { ComponentType, ReactElement, useCallback, useMemo, useRef, useState } from 'react'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { RadioChangeEvent } from 'antd'
import classnames from 'classnames'

import { InputType, Layout } from './types.ts'
import { CardSelectionProps } from './props.ts'
import { Checkbox } from '../Checkbox'
import { Icon } from '../Icon'
import { Radio } from '../RadioGroup/components/Radio'
import styles from './CardSelection.module.css'

export const defaults = {}

export const CardSelection = <T, >({
  children,
  layout,
  inputType,
  icon,
  title,
  subtitle,
  value,
  isDisabled,
  isChecked: isCheckedProp,
  isInitiallyChecked,
  onClick,
  onChange,
}: CardSelectionProps<T>): ReactElement => {
  const [isCheckedState, setIsCheckedState] = useState(isInitiallyChecked)
  const isControlled = useRef(isCheckedProp !== undefined).current

  const isChecked = isControlled ? isCheckedProp : isCheckedState

  const isInput = inputType === InputType.Radio || inputType === InputType.Checkbox

  const isHorizontal = layout === Layout.Horizontal

  const className = useMemo(() => classnames([
    styles.card,
    isDisabled && styles.disabled,
  ]), [isDisabled])

  const ItemComponent = useMemo(() => {
    switch (inputType) {
    case InputType.Radio:
      return Radio
    case InputType.Checkbox:
      return Checkbox
    default:
      return 'div' as unknown as ComponentType
    }
  }, [inputType])

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(value)
    }
  }, [onClick, value])

  const handleChange = useCallback(({ target }: CheckboxChangeEvent | RadioChangeEvent) => {
    const nextChecked = target.checked
    if (!isControlled) {
      setIsCheckedState(nextChecked)
    }
    if (onChange) {
      onChange(nextChecked, value)
    }
  }, [isControlled, onChange, value])

  return (
    <ItemComponent
      className={className}
      onClick={!isDisabled ? handleClick : undefined}
      {...isInput && {
        isChecked,
        isDisabled,
        value,
        onChange: !isDisabled ? handleChange : undefined,
      }}
    >
      <div className={classnames(styles.content, isHorizontal && styles.horizontal)}>
        <div className={styles.header}>
          {
            icon && <Icon component={icon} size={isHorizontal ? 24 : 32} />
          }
          <span className={styles.title}>{title}</span>
        </div>
        {subtitle && (
          <span className={styles.subtitle}>{subtitle}</span>
        )}
        {children}
      </div>
    </ItemComponent>
  )
}

CardSelection.Layout = Layout
CardSelection.InputType = InputType
