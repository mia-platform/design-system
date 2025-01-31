import {
  DisabledDate as AntDisabledDate,
} from 'rc-picker/lib/interface'
import { Dayjs } from 'dayjs'

export type DisabledDate = AntDisabledDate<Dayjs>
export type ShowTimeOptions = 'hours' | 'minutes' | 'seconds'

export type ShowTime = boolean | {
  showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
}
