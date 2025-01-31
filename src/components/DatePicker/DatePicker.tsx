
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
import { Dayjs } from 'dayjs'
import { ReactNode } from 'react'

import { computeShowTime, defaultDateFormat, defaultTimeFormat } from './utils'
import { RangePicker } from './RangePicker/RangePicker'
import { ShowTimeOptions } from './types'

type DatePickerProps = {
  canClear?: boolean
  format?: string
  onChange?: (date: Dayjs | Dayjs[], dateString: string | string[]) => void;
  placeholder?: string;
  showTime?: boolean | ShowTimeOptions
  defaultValue?: Dayjs
  isDisabled?: boolean
  minDate?: Dayjs
  maxDate?: Dayjs
  isErrorStatus?: boolean
  hasNowButton?: boolean
}

export const defaults: Partial<DatePickerProps> = {
  canClear: true,
  format: defaultDateFormat,
  showTime: false,
  hasNowButton: true,
}

export const DatePicker = ({
  canClear = defaults.canClear,
  onChange,
  placeholder,
  showTime = defaults.showTime,
  format = showTime ? `${defaults.format} ${defaultTimeFormat}` : defaults.format,
  defaultValue,
  isDisabled,
  minDate,
  maxDate,
  isErrorStatus,
  hasNowButton: hasNow = defaults.hasNowButton,
}: DatePickerProps): ReactNode => {
  return (
    <AntDatePicker
      allowClear={canClear}
      defaultValue={defaultValue}
      disabled={isDisabled}
      format={format}
      maxDate={maxDate}
      minDate={minDate}
      needConfirm={Boolean(showTime)}
      placeholder={placeholder}
      showNow={hasNow}
      showTime={computeShowTime(showTime)}
      status={isErrorStatus ? 'error' : ''}
      onChange={onChange}
    />
  )
}

DatePicker.RangePicker = RangePicker
