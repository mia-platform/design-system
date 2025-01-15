import { DatePicker as AntDatePicker } from 'antd'
import { ReactElement } from 'react'
import dayjs from 'dayjs'

export type DisabledTime = {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
}

export type DatePickerProps = {
  onChange?: (value: dayjs.Dayjs, dateString: string | string[]) => void
  disabledDate?: (current: dayjs.Dayjs) => boolean
  disabledTime?: (current: dayjs.Dayjs) => DisabledTime
  placeholder?: string
}

export const DatePicker = ({
  onChange,
  disabledDate,
  disabledTime,
  placeholder,
}: DatePickerProps): ReactElement => {
  return (
    <AntDatePicker
      disabledDate={disabledDate}
      disabledTime={disabledTime}
      placeholder={placeholder}
      showSecond={false}
      showTime
      onChange={onChange}
    />
  )
}
