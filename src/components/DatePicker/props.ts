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
import { Dayjs } from 'dayjs'

import { ShowTimeOptions } from './types'

type CommonProps = {
  canClear?: boolean
  format?: string
  minDate?: Dayjs
  maxDate?: Dayjs
  showTime?: boolean | ShowTimeOptions
  isErrorStatus?: boolean
  hasNowButton?: boolean
}

export type DatePickerProps = CommonProps & {
  onChange?: (date: Dayjs | Dayjs[], dateString: string | string[]) => void
  placeholder?: string
  defaultValue?: Dayjs
  value?: Dayjs
  isDisabled?: boolean
}

export type NoUndefinedRangeValueType = AntNoUndefinedRangeValueType<Dayjs>
export type RangeValueType = AntRangeValueType<Dayjs>
export type RangeTimeProps = AntRangeTimeProps<Dayjs>

export type RangePickerProps = CommonProps & {
  canBeEmpty?: boolean
  format?: string
  onChange?: (dates: NoUndefinedRangeValueType | null, dateStrings: [string, string]) => void
  placeholder?: [string, string]
  showTime?: boolean | ShowTimeOptions
  value?: RangeValueType
  defaultValue?: RangeValueType
  isDisabled?: boolean | [boolean, boolean]
}
