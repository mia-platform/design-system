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

import dayjs from 'dayjs'

import { render, screen, userEvent, within } from '../../../test-utils'
import { DatePicker } from './DatePicker'

const currentDay = 3
const currentDate = dayjs('2025-02-03T15:00:00.000Z')
const selectedDay = 15
const selectedDate = dayjs(currentDate).set('date', selectedDay)
  .startOf('day')
const selectedDateFormatted = selectedDate.format('DD/MM/YYYY')
const selectedDateTimeFormatted = selectedDate.format('DD/MM/YYYY HH:mm')

Date.now = jest.fn().mockImplementation(() => {
  return currentDate.toDate()
})

describe('DatePicker Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('renders correctly', () => {
    test('with default props', () => {
      const { asFragment } = render(<DatePicker />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with isErrorStatus prop', () => {
      const { asFragment } = render(<DatePicker isErrorStatus />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with defaultValue prop', () => {
      const { asFragment } = render(<DatePicker defaultValue={selectedDate} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with custom placeholder', () => {
      const { asFragment } = render(<DatePicker placeholder={'Custom placeholder'} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with custom format', () => {
      const { asFragment } = render(<DatePicker defaultValue={selectedDate} format={'YYYY-MM-DD'} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with showTime and custom format', () => {
      const { asFragment } = render(<DatePicker defaultValue={selectedDate} format={'YYYY-MM-DD HH.mm.ss'} showTime />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with allowClear=false', () => {
      const { asFragment } = render(<DatePicker allowClear={false} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  test('Picker show Today button by default', async() => {
    render(<DatePicker />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    expect(screen.queryByText('Today')).not.toBeInTheDocument()
    await userEvent.click(input)
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  test('Picker does not show Today button if showNow=false', async() => {
    render(<DatePicker showNow={false} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    await userEvent.click(input)
    expect(screen.queryByText('Today')).not.toBeInTheDocument()
  })

  describe('show Time', () => {
    test('Picker does not show time selectors and ok button by default', async() => {
      render(<DatePicker />)

      const input = screen.getByRole<HTMLInputElement>('textbox')
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      expect(lists).toHaveLength(1)
      const listItem = within(lists[0]).getByRole('listitem')
      expect(within(listItem).getByText('Today')).toBeInTheDocument()
      expect(within(listItem).queryByRole('button', { name: 'Ok' })).not.toBeInTheDocument()
    })

    test('Picker shows time selectors and ok button if showTime=true', async() => {
      render(<DatePicker showTime={true} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 2 lists for hour and minutes elements
      expect(lists).toHaveLength(3)
      expect(screen.getByText('Now')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument()
    })

    test('Pickers show only hours if showTime=hours', async() => {
      render(<DatePicker showTime={{ showHour: true }} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 1 list for hour elements
      expect(lists).toHaveLength(2)
    })

    test('Pickers show hours and minutes if showTime=minutes', async() => {
      render(<DatePicker showTime={{ showHour: true, showMinute: true }} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 2 list for hour and minute elements
      expect(lists).toHaveLength(3)
    })

    test('Picker show hours, minutes and seconds if showTime=seconds', async() => {
      render(<DatePicker showTime={{ showHour: true, showMinute: true, showSecond: true }} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 3 list for hour, minute and second elements
      expect(lists).toHaveLength(4)
    })
  })

  describe('onChange', () => {
    test('is triggered on clear icon click', async() => {
      const onChange = jest.fn()
      render(<DatePicker defaultValue={selectedDate} onChange={onChange} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')
      expect(input.value).toEqual(selectedDateFormatted)
      const clearIcon = screen.getByRole('img', { name: 'close-circle' })
      expect(clearIcon).toBeVisible()
      const calendarIcon = screen.getByRole('img', { name: 'calendar' })
      expect(calendarIcon).not.toBeVisible()
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(clearIcon)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(null, '')
      expect(input.value).toEqual('')
      expect(calendarIcon).toBeVisible()
      expect(clearIcon).not.toBeVisible()
    })

    test('is triggered on date selection', async() => {
      const onChange = jest.fn()
      render(<DatePicker onChange={onChange} />)

      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const input = screen.getByRole<HTMLInputElement>('textbox')
      await userEvent.click(input)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(screen.getByText(selectedDay))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(selectedDate, selectedDateFormatted)
      expect(input.value).toEqual(selectedDateFormatted)
      expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
      expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
    })

    test('is triggered on Ok click if showTime=true', async() => {
      const onChange = jest.fn()
      render(<DatePicker showTime onChange={onChange} />)

      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const input = screen.getByRole<HTMLInputElement>('textbox')
      await userEvent.click(input)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(screen.getAllByText(selectedDay)[0])
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(screen.getByRole('button', { name: 'OK' }))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(selectedDate, selectedDateTimeFormatted)
      expect(input.value).toEqual(selectedDateTimeFormatted)
      expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
      expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
    })
  })

  test('calendar dates are disabled via minDate and maxDate props', async() => {
    const minDate = selectedDate.subtract(1, 'day')
    const maxDate = selectedDate.add(1, 'day')

    render(<DatePicker maxDate={maxDate} minDate={minDate} />)
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.click(input)
    expect(getComputedStyle(screen.getByText(selectedDay - 2).parentElement!).pointerEvents).toBe('none')
    expect(getComputedStyle(screen.getByText(selectedDay + 2).parentElement!).pointerEvents).toBe('none')
    expect(getComputedStyle(screen.getByText(selectedDay).parentElement!).pointerEvents).not.toBe('none')
  })

  test('the default time is selected correctly', async() => {
    const onChange = jest.fn()
    render(<DatePicker showTime={{ defaultOpenValue: currentDate }} onChange={onChange} />)
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.click(input)
    const okButton = screen.getByRole('button', { name: 'OK' })
    expect(okButton).toBeDisabled()
    await userEvent.click(screen.getAllByText(currentDay)[0])
    expect(okButton).not.toBeDisabled()
    await userEvent.click(okButton)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(currentDate, currentDate.format('DD/MM/YYYY HH:mm'))
    expect(input.value).toEqual(currentDate.format('DD/MM/YYYY HH:mm'))
  })
})
