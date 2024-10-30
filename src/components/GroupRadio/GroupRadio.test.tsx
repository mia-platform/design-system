import { render, screen, waitFor } from '@testing-library/react'

import { GroupRadioOption, GroupRadioProps } from './GroupRadio.props'
import { GroupRadio } from './GroupRadio'
import { userEvent } from '../../test-utils'

const baseOptions: GroupRadioOption[] = [
  {
    value: 1,
    label: 'option 1',
  },
  {
    value: 2,
    label: 'option 2',
  },
]

const optionsWithDescription: GroupRadioOption[] = [
  {
    value: 1,
    label: 'option 1',
    description: 'description 1',
  },
  {
    value: 2,
    label: 'option 2',
    description: 'description 2',
  },
]

const partiallyDisabledOptions: GroupRadioOption[] = [
  {
    value: 1,
    label: 'option disabled',
    disabled: true,
  },
  {
    value: 2,
    label: 'option enabled',
  },
  {
    value: 3,
    label: 'another option enabled',
  }]

const baseProps: GroupRadioProps = {
  options: baseOptions,
}

const basePropsWithDefault: GroupRadioProps = {
  defaultValue: 1,
  options: baseOptions,
}

describe('GroupRadio', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with base props', () => {
    const { asFragment } = render(<GroupRadio {...baseProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with default value', () => {
    const { asFragment } = render(<GroupRadio {...baseProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with descriptions', () => {
    const { asFragment } = render(<GroupRadio {...{ options: optionsWithDescription }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when disabled', () => {
    const { asFragment } = render(<GroupRadio {...{ ...baseProps, disabled: true }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with partially disabled options', () => {
    const { asFragment } = render(<GroupRadio {...{ options: partiallyDisabledOptions }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should select first option if no default is passed and no option is disabled', async() => {
    const onChange = jest.fn()
    const props: GroupRadioProps = {
      ...baseProps,
      onChange,
    }

    render(<GroupRadio {...props} />)

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(2)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation]] = onChange.mock.calls
    expect(invocation.event).toBeUndefined()
    expect(invocation.value).toEqual(1)
  })

  it('should select default option if passed and trigger onChange with correct value', async() => {
    const onChange = jest.fn()
    const props: GroupRadioProps = {
      ...basePropsWithDefault,
      onChange,
    }

    render(<GroupRadio {...props} />)

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(2)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation]] = onChange.mock.calls
    expect(invocation.event).toBeUndefined()
    expect(invocation.value).toEqual(1)
  })

  it('should invoke onChange with correct value on user selection', async() => {
    const onChange = jest.fn()
    const props: GroupRadioProps = {
      ...basePropsWithDefault,
      onChange,
    }
    render(<GroupRadio {...props} />)

    onChange.mockClear()

    const secondRadio = screen.getByRole('radio', { name: /option 2/ })
    userEvent.click(secondRadio)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation1]] = onChange.mock.calls
    expect(invocation1.event.target.value).toEqual(2)
    expect(invocation1.value).toEqual(2)
  })

  it('should select default option and trigger onChange with correct value', async() => {
    const onChange = jest.fn()
    const props: GroupRadioProps = {
      ...basePropsWithDefault,
      onChange,
    }

    render(<GroupRadio {...props} />)

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(2)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation]] = onChange.mock.calls
    expect(invocation.event).toBeUndefined()
    expect(invocation.value).toEqual(1)
    onChange.mockClear()

    const secondRadio = screen.getByRole('radio', { name: /option 2/ })
    userEvent.click(secondRadio)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation1]] = onChange.mock.calls
    expect(invocation1.event.target.value).toEqual(2)
    expect(invocation1.value).toEqual(2)
  })

  it('should prevent selecting any option if the component is disabled', async() => {
    const onChange = jest.fn()
    const props: GroupRadioProps = {
      ...baseProps,
      disabled: true,
      onChange,
    }

    render(<GroupRadio {...props} />)

    const firstRadio = screen.getByRole('radio', { name: /option 1/ })
    const secondRadio = screen.getByRole('radio', { name: /option 2/ })
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation]] = onChange.mock.calls
    expect(invocation.event).toBeUndefined()
    expect(invocation.value).toEqual(undefined)

    onChange.mockClear()

    userEvent.click(firstRadio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
    userEvent.click(secondRadio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
  })

  it('should select the first non disabled option and allow selection only of enabled options', async() => {
    const options: GroupRadioOption[] = [
      {
        value: 1,
        label: 'option disabled',
        disabled: true,
      },
      {
        value: 2,
        label: 'option enabled',
      },
      {
        value: 3,
        label: 'another option enabled',
      },
    ]
    const onChange = jest.fn()
    const props: GroupRadioProps = {
      options,
      onChange,
    }

    render(<GroupRadio {...props} />)

    // the first enabled option is selected and emit onChange
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation]] = onChange.mock.calls
    expect(invocation.value).toEqual(2)
    expect(invocation.event).toEqual(undefined)
  })

  it('should allow selection only of enabled options', async() => {
    const options: GroupRadioOption[] = [
      {
        value: 1,
        label: 'option disabled',
        disabled: true,
      },
      {
        value: 2,
        label: 'option enabled',
      },
      {
        value: 3,
        label: 'another option enabled',
      },
    ]
    const onChange = jest.fn()
    const props: GroupRadioProps = {
      options,
      onChange,
    }

    render(<GroupRadio {...props} />)

    const secondEnabledOption = screen.getByRole('radio', { name: /another option enabled/ })
    const disabledRadio = screen.getByRole('radio', { name: /option disabled/ })

    onChange.mockClear()

    userEvent.click(secondEnabledOption)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation1]] = onChange.mock.calls
    expect(invocation1.value).toEqual(3)
    expect(invocation1.event.target.value).toEqual(3)

    onChange.mockClear()

    userEvent.click(disabledRadio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
  })
})
