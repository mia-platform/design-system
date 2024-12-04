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

import { Radio as AntRadio, RadioChangeEvent } from 'antd'
import { ReactElement, ReactNode, useMemo } from 'react'
import classnames from 'classnames'

import { Direction } from './types.ts'
import { Radio } from './components/Radio'
import { RadioGroupProps } from './props'
import styles from './RadioGroup.module.css'

const { options: optionsClass } = styles

const defaults = {
  direction: Direction.Vertical,
  disabled: false,
}

export const RadioGroup = <T, >({
  defaultValue,
  value,
  isDisabled: disabled = defaults.disabled,
  options,
  onChange,
  direction = defaults.direction,
}: RadioGroupProps<T>): ReactElement => {
  const className = useMemo(() => classnames([
    direction === Direction.Horizontal && styles.horizontal,
  ]), [direction])

  const radioOptions = useMemo((): ReactNode => {
    return options.map((option, index) => (
      <Radio
        description={option.description}
        isDisabled={option.disabled}
        key={option.key || index}
        label={option.label}
        value={option.value}
      />
    ))
  }, [options])

  const handleChange = (event: RadioChangeEvent): void => {
    if (onChange) {
      onChange({ value: event.target.value, event })
    }
  }

  return (
    <AntRadio.Group
      className={className}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={handleChange}
      {...(value !== null && value !== undefined) ? { value } : {}}
    >
      <div className={optionsClass}>{radioOptions}</div>
    </AntRadio.Group>
  )
}

RadioGroup.Direction = Direction
