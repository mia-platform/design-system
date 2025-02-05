/**
 * Copyright 2025 Mia srl
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

import { ReactNode, useMemo } from 'react'
import { DatePicker } from 'antd'

import { ShowTimeOptions, defaultDateFormat, defaultTimeFormat } from '../types'
import { RangePickerProps } from '../props'
import { adaptShowTimeOptions } from '../utils'

const { RangePicker: AntdRangePicker } = DatePicker

export const defaults: Partial<RangePickerProps> = {
  allowClear: true,
  allowEmpty: true,
  format: defaultDateFormat,
  showTime: false,
  showNow: false,
}

export const RangePicker = ({
  allowClear = defaults.allowClear,
  allowEmpty = defaults.allowEmpty,
  onChange,
  placeholder,
  showTime = defaults.showTime,
  format = !showTime ? defaults.format : `${defaults.format} ${defaultTimeFormat}`,
  value,
  defaultValue,
  isDisabled,
  minDate,
  maxDate,
  isErrorStatus,
  showNow = defaults.showNow,
}: RangePickerProps): ReactNode => {
  const adaptedShowTime = useMemo(() => adaptShowTimeOptions(showTime), [showTime])
  return (
    <AntdRangePicker
      allowClear={allowClear}
      allowEmpty={allowEmpty}
      defaultValue={defaultValue}
      disabled={isDisabled}
      format={format}
      maxDate={maxDate}
      minDate={minDate}
      needConfirm={Boolean(showTime)}
      placeholder={placeholder}
      showNow={showNow}
      showTime={adaptedShowTime}
      status={isErrorStatus ? 'error' : undefined}
      value={value}
      onChange={onChange}
    />
  )
}

RangePicker.ShowTimeOptions = ShowTimeOptions
