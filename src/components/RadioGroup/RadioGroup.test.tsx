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

import { render, screen, waitFor } from '@testing-library/react'

import { RadioGroupOption, RadioGroupProps } from './props'
import { RadioGroup } from './RadioGroup'
import { userEvent } from '../../test-utils'

const baseOptions: RadioGroupOption<number>[] = [
  {
    value: 1,
    label: 'option 1',
  },
  {
    value: 2,
    label: 'option 2',
  },
]

const optionsWithDescription: RadioGroupOption<number>[] = [
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

const partiallyDisabledOptions: RadioGroupOption<number>[] = [
  {
    value: 1,
    label: 'disabled option',
    disabled: true,
  },
  {
    value: 2,
    label: 'enabled option',
  },
  {
    value: 3,
    label: 'another enabled option',
  },
]

const baseProps: RadioGroupProps<number> = {
  defaultValue: 1,
  options: baseOptions,
}

describe('RadioGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('renders correctly', () => {
    it('with base props', () => {
      const { asFragment } = render(<RadioGroup {...baseProps} />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('with descriptions', () => {
      const { asFragment } = render(
        <RadioGroup {...{ ...baseProps, options: optionsWithDescription }} />
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('when disabled', () => {
      const { asFragment } = render(
        <RadioGroup {...{ ...baseProps, isDisabled: true }} />
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('with partially disabled options', () => {
      const { asFragment } = render(
        <RadioGroup {...{ ...baseProps, options: partiallyDisabledOptions }} />
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('should invoke onChange with correct value on user selection', () => {
    it('with a number value type', async() => {
      const onChange = jest.fn()
      const props: RadioGroupProps<number> = {
        ...baseProps,
        onChange,
      }

      render(<RadioGroup {...props} />)

      const firstRadio = screen.getByRole('radio', { name: /option 1/ })
      const secondRadio = screen.getByRole('radio', { name: /option 2/ })

      expect(firstRadio).toBeChecked()
      expect(secondRadio).not.toBeChecked()

      userEvent.click(secondRadio)
      await waitFor(() => expect(onChange).toHaveBeenCalled())
      expect(firstRadio).not.toBeChecked()
      expect(secondRadio).toBeChecked()
      expect(onChange).toHaveBeenCalledTimes(1)
      const [[invocation1]] = onChange.mock.calls
      expect(invocation1.event.target.value).toEqual(2)
      expect(invocation1.value).toEqual(2)
    })

    it('with a string value type', async() => {
      const options: RadioGroupOption<string>[] = [
        {
          value: 'one',
          label: 'option 1',
        },
        {
          value: 'two',
          label: 'option 2',
        },
      ]

      const onChange = jest.fn()
      const props: RadioGroupProps<string> = {
        defaultValue: 'one',
        options,
        onChange,
      }

      render(<RadioGroup {...props} />)

      const firstRadio = screen.getByRole('radio', { name: /option 1/ })
      const secondRadio = screen.getByRole('radio', { name: /option 2/ })

      expect(firstRadio).toBeChecked()
      expect(secondRadio).not.toBeChecked()

      userEvent.click(secondRadio)
      await waitFor(() => expect(onChange).toHaveBeenCalled())
      expect(firstRadio).not.toBeChecked()
      expect(secondRadio).toBeChecked()
      expect(onChange).toHaveBeenCalledTimes(1)
      const [[invocation1]] = onChange.mock.calls
      expect(invocation1.event.target.value).toEqual('two')
      expect(invocation1.value).toEqual('two')
    })

    it('with a boolean value type', async() => {
      const options: RadioGroupOption<boolean>[] = [
        {
          value: true,
          label: 'option 1',
        },
        {
          value: false,
          label: 'option 2',
        },
      ]

      const onChange = jest.fn()
      const props: RadioGroupProps<boolean> = {
        defaultValue: true,
        options,
        onChange,
      }

      render(<RadioGroup {...props} />)

      const firstRadio = screen.getByRole('radio', { name: /option 1/ })
      const secondRadio = screen.getByRole('radio', { name: /option 2/ })

      expect(firstRadio).toBeChecked()
      expect(secondRadio).not.toBeChecked()

      userEvent.click(secondRadio)
      await waitFor(() => expect(onChange).toHaveBeenCalled())
      expect(firstRadio).not.toBeChecked()
      expect(secondRadio).toBeChecked()
      expect(onChange).toHaveBeenCalledTimes(1)
      const [[invocation1]] = onChange.mock.calls
      expect(invocation1.event.target.value).toEqual(false)
      expect(invocation1.value).toEqual(false)
    })

    it('with a object value type', async() => {
      type optionType = {a: number, b: number}
      const optionValue1 = { a: 1, b: 2 }
      const optionValue2 = { a: 3, b: 4 }
      const options = [{
        value: optionValue1,
        label: 'option 1',
      },
      {
        value: optionValue2,
        label: 'option 2',
      }]

      const onChange = jest.fn()
      const props: RadioGroupProps<optionType> = {
        defaultValue: optionValue1,
        options,
        onChange,
      }

      render(<RadioGroup {...props} />)

      const firstRadio = screen.getByRole('radio', { name: /option 1/ })
      const secondRadio = screen.getByRole('radio', { name: /option 2/ })

      expect(firstRadio).toBeChecked()
      expect(secondRadio).not.toBeChecked()

      userEvent.click(secondRadio)
      await waitFor(() => expect(onChange).toHaveBeenCalled())
      expect(firstRadio).not.toBeChecked()
      expect(secondRadio).toBeChecked()
      expect(onChange).toHaveBeenCalledTimes(1)
      const [[invocation1]] = onChange.mock.calls
      expect(invocation1.event.target.value).toEqual(optionValue2)
      expect(invocation1.value).toEqual(optionValue2)
    })
  })

  it('should not invoke onChange if an already selected option is clicked', async() => {
    const onChange = jest.fn()
    const props: RadioGroupProps<number> = {
      ...baseProps,
      onChange,
    }

    render(<RadioGroup {...props} />)

    const radio = screen.getByRole('radio', { name: /option 1/ })
    userEvent.click(radio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
  })

  it('should prevent selecting any option if the component is disabled', async() => {
    const onChange = jest.fn()
    const props: RadioGroupProps<number> = {
      ...baseProps,
      isDisabled: true,
      onChange,
    }

    render(<RadioGroup {...props} />)

    const firstRadio = screen.getByRole('radio', { name: /option 1/ })
    const secondRadio = screen.getByRole('radio', { name: /option 2/ })

    expect(firstRadio).toBeChecked()
    expect(secondRadio).not.toBeChecked()

    userEvent.click(firstRadio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
    userEvent.click(secondRadio)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
    expect(firstRadio).toBeChecked()
    expect(secondRadio).not.toBeChecked()
  })

  it('should allow selection only of enabled options', async() => {
    const onChange = jest.fn()
    const props: RadioGroupProps<number> = {
      options: partiallyDisabledOptions,
      defaultValue: 2,
      onChange,
    }

    render(<RadioGroup {...props} />)

    const enabledOption = screen.getByRole('radio', {
      name: /another enabled option/,
    })
    const disabledOption = screen.getByRole('radio', {
      name: /disabled option/,
    })

    userEvent.click(enabledOption)
    await waitFor(() => expect(onChange).toHaveBeenCalled())
    expect(onChange).toHaveBeenCalledTimes(1)
    const [[invocation]] = onChange.mock.calls
    expect(invocation.value).toEqual(3)
    expect(invocation.event.target.value).toEqual(3)

    onChange.mockClear()

    userEvent.click(disabledOption)
    await waitFor(() => expect(onChange).not.toHaveBeenCalled())
  })
})
