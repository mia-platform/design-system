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

export type ShowTime = boolean | {
  showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
}
