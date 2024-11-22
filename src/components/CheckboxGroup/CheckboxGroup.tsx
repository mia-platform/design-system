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

import { ReactElement, useCallback, useMemo } from 'react'
import { Checkbox as AntCheckbox } from 'antd'
import classnames from 'classnames'

import { Checkbox } from '../Checkbox'
import { CheckboxGroupProps } from './props.ts'
import { Direction } from './types.ts'
import styles from './CheckboxGroup.module.css'

const defaults = {
  direction: Direction.Vertical,
}

export const CheckboxGroup = <T, >(
  {
    isDisabled,
    options,
    onChange,
    value,
    defaultValue,
    direction = defaults.direction,
  }: CheckboxGroupProps<T>
): ReactElement => {
  const className = useMemo(() => classnames([
    direction === Direction.Horizontal && styles.horizontal,
  ]), [direction])

  const checkboxOptions = useMemo(() => {
    return options?.map((option, index) => {
      return (
        <Checkbox
          description={option.description}
          isDisabled={option.disabled || isDisabled}
          /* eslint-disable-next-line react/no-array-index-key */
          key={index}
          label={option.label}
          value={option.value}
        />
      )
    })
  }, [isDisabled, options])

  const handleChange = useCallback((val: T[]) => {
    if (onChange) {
      onChange(val)
    }
  }, [onChange])

  return (
    <AntCheckbox.Group
      className={className}
      defaultValue={defaultValue}
      {...(value !== null && value !== undefined) ? { value } : {}}
      onChange={handleChange}
    >
      <div className={styles.options}>
        {checkboxOptions}
      </div>
    </AntCheckbox.Group>
  )
}

CheckboxGroup.Direction = Direction
