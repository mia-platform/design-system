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

const baseProps: GroupRadioProps = {
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

  it('renders correctly with base props', () => {
    const { asFragment } = render(<GroupRadio {...baseProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with base props and change selected radio', async() => {
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
    onChange.mockClear()

    const secondRadio = screen.getByRole('radio', { name: /option 2/ })
    userEvent.click(secondRadio)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation1]] = onChange.mock.calls
    expect(invocation1.event.target.value).toEqual(2)
    expect(invocation1.value).toEqual(2)
  })

  it('cannot select any options if the component is disabled', async() => {
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
    expect(invocation.value).toEqual(1)

    onChange.mockClear()

    userEvent.click(firstRadio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
    userEvent.click(secondRadio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
  })

  it('can select only non disabled options', async() => {
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
    ]
    const onChange = jest.fn()
    const props: GroupRadioProps = {
      defaultValue: 1,
      options,
      onChange,
    }

    render(<GroupRadio {...props} />)

    const enabeldRadio = screen.getByRole('radio', { name: /option enabled/ })
    const disabledRadio = screen.getByRole('radio', { name: /option disabled/ })
    userEvent.click(enabeldRadio)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    onChange.mockClear()
    userEvent.click(disabledRadio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
  })
})
