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

import { DatePicker as AntDatePicker } from 'antd'
import { ReactNode } from 'react'

import { ShowTimeOptions, defaultDateFormat, defaultTimeFormat } from '../types'
import { DatePickerProps } from '../props'
import { convertToAntTimeOptions } from '../utils'

export const defaults = {
  allowClear: true,
  format: defaultDateFormat,
  showTime: false,
  hasNowButton: true,
}

export const DatePicker = ({
  allowClear = defaults.allowClear,
  onChange,
  placeholder,
  showTime = defaults.showTime,
  format = showTime ? `${defaults.format} ${defaultTimeFormat}` : defaults.format,
  defaultValue,
  isDisabled,
  minDate,
  maxDate,
  isErrorStatus,
  showNow = defaults.hasNowButton,
  value,
}: DatePickerProps): ReactNode => {
  return (
    <AntDatePicker
      allowClear={allowClear}
      defaultValue={defaultValue}
      disabled={isDisabled}
      format={format}
      maxDate={maxDate}
      minDate={minDate}
      needConfirm={Boolean(showTime)}
      placeholder={placeholder}
      showNow={showNow}
      showTime={convertToAntTimeOptions(showTime)}
      status={isErrorStatus ? 'error' : undefined}
      value={value}
      onChange={onChange}
    />
  )
}

DatePicker.ShowTimeOptions = ShowTimeOptions
