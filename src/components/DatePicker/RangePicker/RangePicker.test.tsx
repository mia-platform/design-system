import dayjs from 'dayjs'

import { render, screen, userEvent, within } from '../../../test-utils'
import { RangePicker } from './RangePicker'
import { ShowTimeOptions } from '../types'

const day = 15
const firstMonthDate = dayjs('2025-02-03').set('date', day)
  .startOf('day')
const fromFormatted = firstMonthDate.format('DD/MM/YYYY')
const secondMonthDate = firstMonthDate.add(1, 'month')
  .startOf('day')
const toFormatted = secondMonthDate.format('DD/MM/YYYY')
const fromWithTimeFormatted = firstMonthDate.format('DD/MM/YYYY HH:mm')

describe('RangePicker Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('renders correctly', () => {
    test('with default props', () => {
      const { asFragment } = render(<RangePicker />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with isErrorStatus', () => {
      const { asFragment } = render(<RangePicker isErrorStatus />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with defaultValue', () => {
      const { asFragment } = render(<RangePicker defaultValue={[firstMonthDate, secondMonthDate]} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with value', () => {
      const { asFragment } = render(<RangePicker value={[firstMonthDate.add(1, 'day'), secondMonthDate.add(1, 'day')]} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with value and defaultValue', () => {
      const { asFragment } = render(<RangePicker defaultValue={[firstMonthDate, secondMonthDate]} value={[firstMonthDate.add(1, 'day'), secondMonthDate.add(1, 'day')]} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with custom placeholder', () => {
      const { asFragment } = render(<RangePicker placeholder={['Custom start', 'Custom end']} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with custom format', () => {
      const { asFragment } = render(<RangePicker defaultValue={[firstMonthDate, secondMonthDate]} format={'YYYY-MM-DD'} />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with time and custom format', () => {
      const { asFragment } = render(<RangePicker defaultValue={[firstMonthDate, secondMonthDate]} format={'YYYY-MM-DD HH.mm.ss'} showTime />)
      expect(asFragment()).toMatchSnapshot()
    })

    test('with canClear=false', () => {
      const { asFragment } = render(<RangePicker canClear={false} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  test('clear input if clicked on clear icon', async() => {
    const onChange = jest.fn()
    render(<RangePicker defaultValue={[firstMonthDate, secondMonthDate]} onChange={onChange} />)

    const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
    expect(inputs).toHaveLength(2)
    const fromInput = inputs.at(0)!
    const toInput = inputs.at(1)!
    expect(fromInput.value).toEqual(fromFormatted)
    expect(toInput.value).toEqual(toFormatted)
    const clearIcon = screen.getByRole('img', { name: 'close-circle' })
    expect(clearIcon).toBeVisible()
    const calendarIcon = screen.getByRole('img', { name: 'calendar' })
    expect(calendarIcon).not.toBeVisible()
    expect(onChange).not.toHaveBeenCalled()
    await userEvent.click(clearIcon)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(null, ['', ''])
    expect(fromInput.value).toEqual('')
    expect(toInput.value).toEqual('')
    expect(calendarIcon).toBeVisible()
    expect(clearIcon).not.toBeVisible()
  })

  test('calendars does not show Today button by default', async() => {
    render(<RangePicker />)

    const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!

    expect(screen.queryByText('Today')).not.toBeInTheDocument()
    await userEvent.click(input)
    expect(screen.queryByText('Today')).not.toBeInTheDocument()
  })

  test('calendars show Today button if hasNowButton=true', async() => {
    render(<RangePicker hasNowButton />)

    const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!

    expect(screen.queryByText('Today')).not.toBeInTheDocument()
    await userEvent.click(input)
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  describe('show Time', () => {
    test('calendars does not show time selectors and ok button by default', async() => {
      render(<RangePicker hasNowButton />)

      const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!

      expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      expect(lists).toHaveLength(1)
      const listItem = within(lists[0]).getByRole('listitem')
      expect(within(listItem).getByText('Today')).toBeInTheDocument()
      expect(within(listItem).queryByRole('button', { name: 'Ok' })).not.toBeInTheDocument()
    })

    test('calendars show time selectors and ok button if showTime=true', async() => {
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

    test('calendars show only hours if showTime=hours', async() => {
      render(<RangePicker showTime={ShowTimeOptions.Hours} />)

      const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 1 list for hour elements
      expect(lists).toHaveLength(2)
    })

    test('calendars show only hours if showTime=minutes', async() => {
      render(<RangePicker showTime={ShowTimeOptions.Minutes} />)

      const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!

      expect(screen.queryByRole('list')).not.toBeInTheDocument()
      await userEvent.click(input)
      const lists = screen.getAllByRole('list')
      // 1 list for the footer buttons
      // 1 list for hour elements
      expect(lists).toHaveLength(3)
    })

    test('calendars show only hours if showTime=seconds', async() => {
      render(<RangePicker showTime={ShowTimeOptions.Seconds} />)

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
    test('is triggered when second date is selected. First selection start Date', async() => {
      const onChange = jest.fn()

      render(<RangePicker onChange={onChange} />)
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const fromInput = inputs.at(0)!
      const toInput = inputs.at(1)!
      await userEvent.click(fromInput)
      const calendarDays = screen.getAllByText(day)
      expect(calendarDays).toHaveLength(2)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(calendarDays.at(0)!)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(calendarDays.at(1)!)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([firstMonthDate, secondMonthDate], [fromFormatted, toFormatted])
      expect(fromInput.value).toEqual(fromFormatted)
      expect(toInput.value).toEqual(toFormatted)
      expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
      expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
    })

    test('is triggered when second date is selected on Ok click if show time. First selection start Date', async() => {
      const onChange = jest.fn()

      const from = firstMonthDate
      const daysToAdd = 3
      const to = firstMonthDate.add(daysToAdd, 'day')
      const toWithTimeFormatted = to.format('DD/MM/YYYY HH:mm')
      render(<RangePicker showTime onChange={onChange} />)
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const fromInput = inputs.at(0)!
      const toInput = inputs.at(1)!
      await userEvent.click(fromInput)
      const firstSelectionDays = screen.getAllByText(day)
      // the day in the calendar, the hour and the minutes
      expect(firstSelectionDays).toHaveLength(3)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(firstSelectionDays.at(0)!)
      await userEvent.click(screen.getByRole('button', { name: 'OK' }))
      expect(onChange).not.toHaveBeenCalled()
      const secondSelectionDays = screen.getAllByText(day + daysToAdd)
      // the day in the calendar, the hour and the minutes
      expect(secondSelectionDays).toHaveLength(3)
      await userEvent.click(secondSelectionDays.at(0)!)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(screen.getByRole('button', { name: 'OK' }))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([from, to], [fromWithTimeFormatted, toWithTimeFormatted])
      expect(fromInput.value).toEqual(fromWithTimeFormatted)
      expect(toInput.value).toEqual(toWithTimeFormatted)
      expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
      expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
    })

    test('is triggered with the lower date in first position even if selected as end Date', async() => {
      const onChange = jest.fn()

      render(<RangePicker onChange={onChange} />)
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const fromInput = inputs.at(0)!
      const toInput = inputs.at(1)!
      await userEvent.click(fromInput)
      const calendarDays = screen.getAllByText(day)
      expect(calendarDays).toHaveLength(2)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(calendarDays.at(1)!)
      expect(onChange).not.toHaveBeenCalled()
      await userEvent.click(calendarDays.at(0)!)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([firstMonthDate, secondMonthDate], [fromFormatted, toFormatted])
      expect(fromInput.value).toEqual(fromFormatted)
      expect(toInput.value).toEqual(toFormatted)
      expect(screen.queryByRole('img', { name: 'calendar' })).not.toBeVisible()
      expect(screen.getByRole('img', { name: 'close-circle' })).toBeVisible()
    })

    test('is triggered if from date is selected', async() => {
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
      const calendarDays = screen.getAllByText(day)
      await userEvent.click(calendarDays.at(0)!)
      await userEvent.click(screen.getByTestId('wrapper'))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([firstMonthDate, null], [fromFormatted, ''])
    })

    test('is not trigger if from date is selected and canBeEmpty=false', async() => {
      const onChange = jest.fn()

      render(
        <div data-testid="wrapper">
          <RangePicker canBeEmpty={false} onChange={onChange} />
        </div>
      )
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const fromInput = inputs.at(0)!
      await userEvent.click(fromInput)
      const calendarDays = screen.getAllByText(day)
      await userEvent.click(calendarDays.at(0)!)
      await userEvent.click(screen.getByTestId('wrapper'))
      expect(onChange).not.toHaveBeenCalled()
    })

    test('is triggered if to date is selected', async() => {
      const onChange = jest.fn()

      render(
        <div data-testid="wrapper">
          <RangePicker onChange={onChange} />
        </div>
      )
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const toInput = inputs.at(1)!
      await userEvent.click(toInput)
      const calendarDays = screen.getAllByText(day)
      await userEvent.click(calendarDays.at(1)!)
      await userEvent.click(screen.getByTestId('wrapper'))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([null, secondMonthDate], ['', toFormatted])
    })

    test('is not trigger if to date is selected and canBeEmpty=false', async() => {
      const onChange = jest.fn()

      render(
        <div data-testid="wrapper">
          <RangePicker canBeEmpty={false} onChange={onChange} />
        </div>
      )
      expect(screen.getByRole('img', { name: 'calendar' })).toBeVisible()
      const inputs = screen.getAllByRole<HTMLInputElement>('textbox')
      const tpInput = inputs.at(1)!
      await userEvent.click(tpInput)
      const calendarDays = screen.getAllByText(day)
      await userEvent.click(calendarDays.at(1)!)
      await userEvent.click(screen.getByTestId('wrapper'))
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  test('minDate and maxDate props disable certain dates', async() => {
    const minDate = firstMonthDate.subtract(1, 'day')
    const maxDate = secondMonthDate.add(1, 'day')

    const onChange = jest.fn()

    render(<RangePicker maxDate={maxDate} minDate={minDate} onChange={onChange} />)

    const input = screen.getAllByRole<HTMLInputElement>('textbox').at(0)!
    await userEvent.click(input)

    expect(getComputedStyle(screen.getAllByText(day - 2).at(0)!.parentElement!).pointerEvents).toBe('none')
    expect(getComputedStyle(screen.getAllByText(day + 2).at(1)!.parentElement!).pointerEvents).toBe('none')
    expect(getComputedStyle(screen.getAllByText(day).at(0)!.parentElement!).pointerEvents).not.toBe('none')
    expect(getComputedStyle(screen.getAllByText(day).at(1)!.parentElement!).pointerEvents).not.toBe('none')
  })
})
