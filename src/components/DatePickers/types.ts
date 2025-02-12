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

import { SharedTimeProps as AntTimeProps } from 'rc-picker'
import { Dayjs } from 'dayjs'

export type TimeProps = AntTimeProps<Dayjs>

export type DisabledTimes = {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
  disabledMilliseconds?: (hour: number, minute: number, second: number) => number[];
}

export type RangeTimeProps = Omit<AntTimeProps<Dayjs>, 'defaultValue' | 'defaultOpenValue' | 'disabledTime'> & {
    defaultOpenValue?: Dayjs[];
    disabledTime?: (date: Dayjs, range: 'start' | 'end', info: {
        from?: Dayjs;
    }) => DisabledTimes;
};

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
