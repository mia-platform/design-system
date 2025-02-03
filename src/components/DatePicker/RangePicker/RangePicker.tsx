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

import { DatePicker } from 'antd'
import { ReactNode } from 'react'

import { computeShowTime, defaultDateFormat, defaultTimeFormat } from '../utils'
import { RangePickerProps } from '../props'

const { RangePicker: AntdRangePicker } = DatePicker

export const defaults: Partial<RangePickerProps> = {
  canClear: true,
  canBeEmpty: true,
  format: defaultDateFormat,
  showTime: false,
  hasNowButton: false,
}

export const RangePicker = ({
  canClear: canAllowClear = defaults.canClear,
  canBeEmpty: canAllowEmpty = defaults.canBeEmpty,
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
  hasNowButton = defaults.hasNowButton,
}: RangePickerProps): ReactNode => {
  return (
    <AntdRangePicker
      allowClear={canAllowClear}
      allowEmpty={canAllowEmpty}
      defaultValue={defaultValue}
      disabled={isDisabled}
      format={format}
      maxDate={maxDate}
      minDate={minDate}
      needConfirm={Boolean(showTime)}
      placeholder={placeholder}
      showNow={hasNowButton}
      showTime={computeShowTime(showTime)}
      status={isErrorStatus ? 'error' : ''}
      value={value}
      onChange={onChange}
    />
  )
}
