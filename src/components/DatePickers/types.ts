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

import {
  DisabledDate as AntDisabledDate,
} from 'rc-picker/lib/interface'
import { Dayjs } from 'dayjs'

export type DisabledDate = AntDisabledDate<Dayjs>
export enum ShowTimeOptions {
  Hours = 'hours',
  Minutes = 'minutes',
  Seconds = 'seconds'
}

export type AntShowTimeOptions = boolean | {
  showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
}

export type NoUndefinedRangeValueType = [start: Dayjs | null, end: Dayjs | null];

export type RangeValueType = [
  start: Dayjs | null | undefined,
  end: Dayjs | null | undefined
];

export const defaultTimeFormat = 'HH:mm'
export const defaultDateFormat = 'DD/MM/YYYY'
