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

import dayjs from 'dayjs'

import { render, screen, userEvent, within } from '../../test-utils'
import { DatePicker } from './DatePicker'

const selectedDay = 15
const selectedDate = dayjs().set('date', selectedDay)
  .startOf('day')
const selectedDateFormatted = selectedDate.format('DD/MM/YYYY')
const selectedDateTimeFormatted = selectedDate.format('DD/MM/YYYY HH:mm')

describe('DatePicker Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('renders correctly', () => {
    test('with default props', () => {
      const { asFragment } = render(<DatePicker />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with isErrorStatus', () => {
      const { asFragment } = render(<DatePicker isErrorStatus />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with defaultValue', () => {
      const { asFragment } = render(<DatePicker defaultValue={selectedDate} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with custom placeholder', () => {
      const { asFragment } = render(<DatePicker placeholder={'Custom placeholder'} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  test('clear input if clicked on clear icon', async() => {
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

  test('not allow to clear if canClear=false', async() => {
    render(<DatePicker defaultValue={selectedDate} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    expect(input.value).toEqual(selectedDateFormatted)
    const clearIcon = screen.getByRole('img', { name: 'close-circle' })
    expect(clearIcon).toBeVisible()
    const calendarIcon = screen.getByRole('img', { name: 'calendar' })
    expect(calendarIcon).not.toBeVisible()
    await userEvent.click(clearIcon)
    expect(input.value).toEqual('')
    expect(calendarIcon).toBeVisible()
    expect(clearIcon).not.toBeVisible()
  })

  test('calendars show Today button by default', async() => {
    render(<DatePicker />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    await userEvent.click(input)
    expect(within(screen.getByRole('listitem')).getByText('Today')).toBeInTheDocument()
  })

  test('calendars does not show Today button if hasNowButton=false', async() => {
    render(<DatePicker hasNowButton={false} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    await userEvent.click(input)
    expect(screen.queryByText('Today')).not.toBeInTheDocument()
  })

  describe('show Time', () => {
    test('calendars does not show time selectors and ok button by default', async() => {
      render(<DatePicker />)

      const input = screen.getByRole<HTMLInputElement>('textbox')

      expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      expect(lists.length).toBe(1)
      const listItem = within(lists[0]).getByRole('listitem')
      expect(within(listItem).getByText('Today')).toBeInTheDocument()
      expect(within(listItem).queryByRole('button', { name: 'Ok' })).not.toBeInTheDocument()
    })

    test('calendars show time selectors and ok button if showTime=true', async() => {
      render(<DatePicker showTime={true} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 2 lists for hour and minutes elements
      expect(lists.length).toBe(3)
      expect(screen.getByText('Now')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument()
    })

    test('calendars show only hours if showTime=hours', async() => {
      render(<DatePicker showTime={'hours'} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 1 list for hour elements
      expect(lists.length).toBe(2)
    })

    test('calendars show hours and minutes if showTime=minutes', async() => {
      render(<DatePicker showTime={'minutes'} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 2 list for hour and minute elements
      expect(lists.length).toBe(3)
    })

    test('calendars show hours and minutes if showTime=seconds', async() => {
      render(<DatePicker showTime={'seconds'} />)

      const input = screen.getByRole<HTMLInputElement>('textbox')

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 3 list for hour, minute and second elements
      expect(lists.length).toBe(4)
    })
  })

  test('does trigger on change on calendar click if no show time', async() => {
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

  test('does trigger on change on ok click if show time', async() => {
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

  test('does not trigger on change if clicked on a disabled date', async() => {
    const onChange = jest.fn()

    const minDate = selectedDate.subtract(1, 'day')
    const maxDate = selectedDate.add(1, 'day')

    render(<DatePicker maxDate={maxDate} minDate={minDate} onChange={onChange} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.click(input)
    expect(onChange).not.toHaveBeenCalled()
    expect(getComputedStyle(screen.getByText(selectedDay - 2).parentElement!).pointerEvents).toBe('none')
    expect(getComputedStyle(screen.getByText(selectedDay + 2).parentElement!).pointerEvents).toBe('none')
    await userEvent.click(screen.getByText(selectedDay))
    expect(onChange).toHaveBeenCalledTimes(1)

    expect(onChange).toHaveBeenCalledWith(selectedDate, selectedDateFormatted)

    expect(input.value).toEqual(selectedDateFormatted)
  })
})
