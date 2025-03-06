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

import MockDate from 'mockdate'
import dayjs from 'dayjs'

import { render, screen, userEvent } from '../../../test-utils'
import { RangePicker } from './RangePicker'

const currentDate = dayjs('2025-02-03T15:00:00.000Z')
const dayOfMonth = 15
const start = dayjs(currentDate).set('date', dayOfMonth)
  .startOf('day')
const startFormatted = start.format('DD/MM/YYYY')
const end = start.add(1, 'month')
  .startOf('day')
const endFormatted = end.format('DD/MM/YYYY')

const daysToAdd = 3
const startDateTime = dayjs(start)
const endDateTime = startDateTime.add(daysToAdd, 'day')
const startDateTimeFormatted = startDateTime.format('DD/MM/YYYY HH:mm')
const endDateTimeFormatted = endDateTime.format('DD/MM/YYYY HH:mm')

describe('RangePicker Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    MockDate.set(currentDate.toDate())
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('renders correctly', () => {
    test('with default props', () => {
      const { asFragment } = render(<RangePicker />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with isErrorStatus prop', () => {
      const { asFragment } = render(<RangePicker isErrorStatus />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with defaultValue prop', () => {
      const { asFragment } = render(<RangePicker defaultValue={[start, end]} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with value prop', () => {
      const { asFragment } = render(<RangePicker value={[start.add(1, 'day'), end.add(1, 'day')]} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with value and defaultValue props', () => {
      const { asFragment } = render(<RangePicker defaultValue={[start, end]} value={[start.add(1, 'day'), end.add(1, 'day')]} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with custom placeholders', () => {
      const { asFragment } = render(<RangePicker placeholder={['Custom start', 'Custom end']} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with custom format', () => {
      const { asFragment } = render(<RangePicker defaultValue={[start, end]} format={'YYYY-MM-DD'} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with showTime and custom format', () => {
      const { asFragment } = render(<RangePicker defaultValue={[start, end]} format={'YYYY-MM-DD HH.mm.ss'} showTime />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with prop allowClear=false', () => {
      const { asFragment } = render(<RangePicker allowClear={false} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  test('Pickers show Today button by default', async() => {
    render(<RangePicker />)

    const startInput = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!
    expect(screen.queryByText('Today')).not.toBeInTheDocument()
    await userEvent.click(startInput)
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  test('Pickers does not show Today button if showNow={false}', async() => {
    render(<RangePicker showNow={false} />)

    const startInput = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!
    expect(screen.queryByText('Today')).not.toBeInTheDocument()
    await userEvent.click(startInput)
    expect(screen.queryByText('Today')).not.toBeInTheDocument()
  })

  describe('show Time', () => {
    test('Picker does not show time selectors and ok button by default', async() => {
      render(<RangePicker />)

      const startInput = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
      await userEvent.click(startInput)
      expect(screen.getByText('Today')).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Ok' })).not.toBeInTheDocument()
    })

    test('Picker shows time selectors and ok button if showTime=true', async() => {
      render(<RangePicker showTime={true} />)

      const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 2 lists for hour and minutes elements
      expect(lists).toHaveLength(3)
      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument()
    })

    test('Picker correclty shows time picker with only hours', async() => {
      render(<RangePicker showTime={{ showHour: true }} />)

      const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 1 list for hour elements
      expect(lists).toHaveLength(2)
    })

    test('Picker correclty show time picker with hours and minutes', async() => {
      render(<RangePicker showTime={{ showHour: true, showMinute: true }} />)

      const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 1 list for hour elements
      expect(lists).toHaveLength(3)
    })

    test('Picker correctly shows time wiht hours, minutes and seconds', async() => {
      render(<RangePicker showTime={{ showHour: true, showMinute: true, showSecond: true }} />)

      const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 1 list for hour elements
      expect(lists).toHaveLength(4)
    })
  })

  describe('onChange', () => {
    test('is triggered on clear icon click', async() => {
      const onChange = jest.fn()
      render(<RangePicker defaultValue={[start, end]} onChange={onChange} />)

      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      expect(inputs).toHaveLength(2)
      const startInput = inputs.at(0)!
      const endInput = inputs.at(1)!
      expect(startInput.value).toEqual(startFormatted)
      expect(endInput.value).toEqual(endFormatted)
      const clearIcon = screen.getByRole('img', { name: 'close-circle' })
      expect(clearIcon).toBeVisible()
      const calendarIcon = screen.getByRole('img', { name: 'calendar' })
      expect(calendarIcon).not.toBeVisible()
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(clearIcon)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(null, ['', ''])
      expect(startInput.value).toEqual('')
      expect(endInput.value).toEqual('')
      expect(calendarIcon).toBeVisible()
      expect(clearIcon).not.toBeVisible()
    })

    test('is triggered when both dates are selected', async() => {
      const onChange = jest.fn()

      render(<RangePicker onChange={onChange} />)
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const startInput = inputs.at(0)!
      const endInput = inputs.at(1)!
      await userEvent.click(startInput)
      const dayValues = screen.getAllByText(dayOfMonth)
      expect(dayValues).toHaveLength(2)
      expect(onChange).not.toHaveBeenCalled()
      // select start date (in the first month)
      await userEvent.click(dayValues.at(0)!)
      expect(onChange).not.toHaveBeenCalled()
      // select end date (same day in the second month)
      await userEvent.click(dayValues.at(1)!)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([start, end], [startFormatted, endFormatted])
      expect(startInput.value).toEqual(startFormatted)
      expect(endInput.value).toEqual(endFormatted)
      expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
      expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
    })

    test('is triggered on Ok click if both date are selected and showTime=true', async() => {
      const onChange = jest.fn()

      render(<RangePicker showTime onChange={onChange} />)
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const fromInput = inputs.at(0)!
      const toInput = inputs.at(1)!
      await userEvent.click(fromInput)
      const startDayValues = screen.getAllByText(dayOfMonth)
      // it finds the day in the calendar, the hour and the minutes
      expect(startDayValues).toHaveLength(3)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(startDayValues.at(0)!)
      await userEvent.click(screen.getByRole('button', { name: 'OK' }))
      expect(onChange).not.toHaveBeenCalled()
      const endDayValues = screen.getAllByText(dayOfMonth + daysToAdd)
      // it finds the day in the calendar, the hour and the minutes
      expect(endDayValues).toHaveLength(3)
      await userEvent.click(endDayValues.at(0)!)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(screen.getByRole('button', { name: 'OK' }))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        [startDateTime, endDateTime],
        [startDateTimeFormatted, endDateTimeFormatted]
      )
      expect(fromInput.value).toEqual(startDateTimeFormatted)
      expect(toInput.value).toEqual(endDateTimeFormatted)
      expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
      expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
    })

    test('emits the lower date in first position', async() => {
      const onChange = jest.fn()

      render(<RangePicker onChange={onChange} />)
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const fromInput = inputs.at(0)!
      const toInput = inputs.at(1)!
      await userEvent.click(fromInput)
      const calendarDays = screen.getAllByText(dayOfMonth)
      expect(calendarDays).toHaveLength(2)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(calendarDays.at(1)!)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(calendarDays.at(0)!)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([start, end], [startFormatted, endFormatted])
      expect(fromInput.value).toEqual(startFormatted)
      expect(toInput.value).toEqual(endFormatted)
      expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
      expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
    })

    test('is triggered when clicking ouside calendar after selecting the start date', async() => {
      const onChange = jest.fn()

      render(
        <div data-testid="wrapper">
          <RangePicker onChange={onChange} />
        </div>
      )
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const fromInput = inputs.at(0)!
      await userEvent.click(fromInput)
      const calendarDays = screen.getAllByText(dayOfMonth)
      await userEvent.click(calendarDays.at(0)!)
      await userEvent.click(screen.getByTestId('wrapper'))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([start, null], [startFormatted, ''])
    })

    test('is triggered when clicking ouside calendar after selecting the end date', async() => {
      const onChange = jest.fn()

      render(
        <div data-testid="wrapper">
          <RangePicker onChange={onChange} />
        </div>
      )
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const endInput = inputs.at(1)!
      await userEvent.click(endInput)
      const calendarDays = screen.getAllByText(dayOfMonth)
      await userEvent.click(calendarDays.at(1)!)
      await userEvent.click(screen.getByTestId('wrapper'))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([null, end], ['', endFormatted])
    })

    test('is not triggered when clicking ouside calendar after selecting the start date if allowEmpty=false', async() => {
      const onChange = jest.fn()

      render(
        <div data-testid="wrapper">
          <RangePicker allowEmpty={false} onChange={onChange} />
        </div>
      )
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const startInput = inputs.at(0)!
      await userEvent.click(startInput)
      const calendarDays = screen.getAllByText(dayOfMonth)
      await userEvent.click(calendarDays.at(0)!)
      await userEvent.click(screen.getByTestId('wrapper'))
      expect(onChange).not.toHaveBeenCalled()
    })

    test('is not triggered when clicking ouside calendar after selecting the end date if allowEmpty=false', async() => {
      const onChange = jest.fn()

      render(
        <div data-testid="wrapper">
          <RangePicker allowEmpty={false} onChange={onChange} />
        </div>
      )
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const endInput = inputs.at(1)!
      await userEvent.click(endInput)
      const calendarDays = screen.getAllByText(dayOfMonth)
      await userEvent.click(calendarDays.at(1)!)
      await userEvent.click(screen.getByTestId('wrapper'))
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  test('Picker dates are disabled via minDate and maxDate props', async() => {
    const minDate = start.subtract(1, 'day')
    const maxDate = end.add(1, 'day')

    const onChange = jest.fn()

    render(<RangePicker maxDate={maxDate} minDate={minDate} onChange={onChange} />)

    const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!
    await userEvent.click(input)

    expect(getComputedStyle(screen.getAllByText(dayOfMonth - 2).at(0)!.parentElement!).pointerEvents).toBe('none')
    expect(getComputedStyle(screen.getAllByText(dayOfMonth + 2).at(1)!.parentElement!).pointerEvents).toBe('none')
    expect(getComputedStyle(screen.getAllByText(dayOfMonth).at(0)!.parentElement!).pointerEvents).not.toBe('none')
    expect(getComputedStyle(screen.getAllByText(dayOfMonth).at(1)!.parentElement!).pointerEvents).not.toBe('none')
  })

  test('the default time is selected correctly', async() => {
    // I define dates whith the current time (CT, no start of the day)
    const startCT = dayjs(currentDate).set('date', dayOfMonth)

    const startDateTimeCT = dayjs(startCT)
    const endDateTimeCT = startDateTimeCT.add(daysToAdd, 'day')
    const startDateTimeCTFormatted = startDateTimeCT.format('DD/MM/YYYY HH:mm')
    const endDateTimeCTFormatted = endDateTimeCT.format('DD/MM/YYYY HH:mm')
    const onChange = jest.fn()

    render(<RangePicker showTime={{ defaultOpenValue: [currentDate, currentDate] }} onChange={onChange} />)
    expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
    const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
    const fromInput = inputs.at(0)!
    const toInput = inputs.at(1)!
    await userEvent.click(fromInput)
    const startDayValues = screen.getAllByText(dayOfMonth)
    // it finds the day in the calendar, the hour and the minutes
    expect(startDayValues).toHaveLength(3)
    expect(onChange).not.toHaveBeenCalled()
    await userEvent.click(startDayValues.at(0)!)
    await userEvent.click(screen.getByRole('button', { name: 'OK' }))
    expect(onChange).not.toHaveBeenCalled()
    const endDayValues = screen.getAllByText(dayOfMonth + daysToAdd)
    // it finds the day in the calendar, the hour and the minutes
    expect(endDayValues).toHaveLength(3)
    await userEvent.click(endDayValues.at(0)!)
    expect(onChange).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'OK' }))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      [startDateTimeCT, endDateTimeCT],
      [startDateTimeCTFormatted, endDateTimeCTFormatted]
    )
    expect(fromInput.value).toEqual(startDateTimeCTFormatted)
    expect(toInput.value).toEqual(endDateTimeCTFormatted)
    expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
    expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
  })
})
