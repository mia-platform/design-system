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
  NoUndefinedRangeValueType as AntNoUndefinedRangeValueType,
  RangeValueType as AntRangeValueType,
} from 'rc-picker/lib/PickerInput/RangePicker'
import {
  RangeTimeProps as AntRangeTimeProps,
} from 'rc-picker/lib/interface'
import { DatePicker } from 'antd'
import { Dayjs } from 'dayjs'
import { ReactNode } from 'react'

import { computeShowTime, defaultDateFormat, defaultTimeFormat } from '../utils'
import { ShowTimeOptions } from '../types'

const { RangePicker: AntdRangePicker } = DatePicker

export type NoUndefinedRangeValueType = AntNoUndefinedRangeValueType<Dayjs>
export type RangeValueType = AntRangeValueType<Dayjs>
export type RangeTimeProps = AntRangeTimeProps<Dayjs>

type RangePickerProps = {
  canClear?: boolean
  canBeEmpty?: boolean
  format?: string
  onChange?: (dates: NoUndefinedRangeValueType | null, dateStrings: [string, string]) => void;
  placeholder?: [string, string];
  showTime?: boolean | ShowTimeOptions
  defaultValue?: RangeValueType
  isDisabled?: boolean | [boolean, boolean]
  minDate?: Dayjs
  maxDate?: Dayjs
  isStatusError?: boolean
}

export const defaults: Partial<RangePickerProps> = {
  canClear: true,
  canBeEmpty: true,
  format: defaultDateFormat,
  showTime: false,
}

export const RangePicker = ({
  canClear: canAllowClear = defaults.canClear,
  canBeEmpty: canAllowEmpty = defaults.canBeEmpty,
  onChange,
  placeholder,
  showTime = defaults.showTime,
  format = !showTime ? defaults.format : `${defaults.format} ${defaultTimeFormat}`,
  defaultValue,
  isDisabled,
  minDate,
  maxDate,
  isStatusError,
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
      showTime={computeShowTime(showTime)}
      status={isStatusError ? 'error' : ''}
      onChange={onChange}
    />
  )
}
