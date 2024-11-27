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

import { ReactElement, useCallback, useMemo, useRef, useState } from 'react'
import classnames from 'classnames'

import { CardSelectionProps } from './props.ts'
import { Checkbox } from '../Checkbox'
import { Icon } from '../Icon'
import { Radio } from '../RadioGroup/components/Radio'
import { Type } from './types.ts'
import styles from './CardSelection.module.css'

export const defaults = {}

export const CardSelection = <T, >({
  children,
  horizontal,
  type,
  icon,
  title,
  subtitle,
  value,
  isDisabled,
  isChecked: isCheckedProp,
  isInitiallyChecked,
  onClick,
}: CardSelectionProps<T>): ReactElement => {
  const [isCheckedState, setIsCheckedState] = useState(isInitiallyChecked)
  const isControlled = useRef(isCheckedProp !== undefined).current

  const isChecked = isControlled ? isCheckedProp : isCheckedState

  const className = useMemo(() => classnames([
    styles.card,
    horizontal && styles.horizontal,
    isChecked && styles.selected,
    isDisabled && styles.disabled,
  ]), [horizontal, isChecked, isDisabled])

  const action = useMemo(() => {
    switch (type) {
    case Type.Radio:
      return <Radio isChecked={isChecked} isDisabled={isDisabled} />
    case Type.Checkbox:
      return <Checkbox isChecked={isChecked} isDisabled={isDisabled} />
    default:
      return undefined
    }
  }, [isChecked, isDisabled, type])

  const handleClick = useCallback(() => {
    const nextChecked = !isChecked
    if (!isControlled) {
      setIsCheckedState(nextChecked)
    }
    if (onClick) {
      onClick(nextChecked, value)
    }
  }, [isChecked, isControlled, onClick, value])

  return (
    <div className={className} onClick={!isDisabled ? handleClick : undefined}>
      <div className={styles.header}>
        {
          icon && <Icon component={icon} size={horizontal ? 24 : 32} />
        }
        <span className={styles.title}>{title}</span>
      </div>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      {
        action && (
          <div className={styles.actionContainer}>
            {action}
          </div>
        )
      }
      {children}
    </div>
  )
}

CardSelection.Type = Type
