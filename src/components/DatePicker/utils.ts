import { ShowTime, ShowTimeOptions } from './types'

export const computeShowTime = (showTime?: boolean | ShowTimeOptions): ShowTime => {
  if (!showTime) {
    return false
  }
  switch (showTime) {
  case ShowTimeOptions.Hours:
    return { showHour: true, showMinute: false, showSecond: false }
  case ShowTimeOptions.Minutes:
    return { showHour: true, showMinute: true, showSecond: false }
  case ShowTimeOptions.Seconds:
    return { showHour: true, showMinute: true, showSecond: true }
  default:
    return { showHour: true, showMinute: true, showSecond: false }
  }
}

export const defaultTimeFormat = 'HH:mm'
export const defaultDateFormat = 'DD/MM/YYYY'
