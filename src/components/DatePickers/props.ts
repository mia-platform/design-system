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

import { Dayjs } from 'dayjs'

import { NoUndefinedRangeValueType, RangeValueType, ShowTimeOptions } from './types'

type CommonProps = {

  /**
   * If false remove the clear button
   */
  allowClear?: boolean

  /**
   * To set the date format, refer to https://day.js.org/docs/en/display/format
   */
  format?: string

  /**
   * The minimum date, which also limits the range of panel switching
   */
  minDate?: Dayjs

  /**
   * The maximum date, which also limits the range of panel switching
   */
  maxDate?: Dayjs

  /**
   * To provide an additional time selection
   */
  showTime?: boolean | ShowTimeOptions

  /**
   * Error validation status
   */
  isErrorStatus?: boolean

  /**
   * Show the fast access of current datetime
   */
  showNow?: boolean
}

export type DatePickerProps = CommonProps & {

  /**
   * Callback function when the selected datetime changes
   */
  onChange?: (date: Dayjs | Dayjs[], dateString: string | string[]) => void

  /**
   * The placeholder of the date input
   */
  placeholder?: string

  /**
   * To set default date
   */
  defaultValue?: Dayjs

  /**
   * To set date
   */
  value?: Dayjs

  /**
   * To disable the datepicker
   */
  isDisabled?: boolean
}

export type RangePickerProps = CommonProps & {

  /**
   * Allow to leave start or end date empty
   */
  allowEmpty?: boolean

  /**
   * Callback function when the selected datetime changes
   */
  onChange?: (dates: NoUndefinedRangeValueType | null, dateStrings: [string, string]) => void

  /**
   * The placeholder of date input
   */
  placeholder?: [string, string]

  /**
   * To set dates
   */
  value?: RangeValueType

  /**
   * To set default dates
   */
  defaultValue?: RangeValueType

  /**
   * To disable the start or end datepicker
   */
  isDisabled?: boolean | [boolean, boolean]
}
