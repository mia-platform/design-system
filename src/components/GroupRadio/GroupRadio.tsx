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
import { ReactElement, ReactNode, useMemo, useState } from 'react'

import { GroupRadioProps } from './GroupRadio.props'
import { Radio } from './components/Radio'
import styles from './GroupRadio.module.css'

const { options: optionsClass, groupRadio } = styles

const defaults = {
  disabled: false,
}

export const GroupRadio = ({
  defaultValue,
  disabled = defaults.disabled,
  options,
  onChange,
}: GroupRadioProps): ReactElement => {
  const [value, setValue] = useState<string | number | boolean >(defaultValue)

  const radioOptions = useMemo((): ReactNode => {
    return options.map((option) => (
      <div key={option.value.toString()}>
        <Radio
          description={option.description}
          disabled={option.disabled}
          label={option.label}
          value={option.value}
        />
      </div>
    ))
  }, [options])

  const handleChange = (event: RadioChangeEvent): void => {
    setValue(event.target.value)
    if (onChange) {
      onChange({ value: event.target.value, event })
    }
  }

  return (
    <div className={groupRadio}>
      <AntRadio.Group
        className={groupRadio}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      >
        <div className={optionsClass}>{radioOptions}</div>
      </AntRadio.Group>
    </div>
  )
}
