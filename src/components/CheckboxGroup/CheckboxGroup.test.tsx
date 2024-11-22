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

import { render, screen, waitFor, within } from '@testing-library/react'

import { CheckboxGroupOption, CheckboxGroupProps } from './props'
import { CheckboxGroup } from './CheckboxGroup'
import { userEvent } from '../../test-utils.tsx'

const baseOptions: CheckboxGroupOption<number>[] = [
  {
    value: 1,
    label: 'checkbox 1',
  },
  {
    value: 2,
    label: 'checkbox 2',
  },
]

const optionsWithDescription: CheckboxGroupOption<number>[] = [
  {
    ...baseOptions[0],
    description: 'description 1',
  },
  {
    ...baseOptions[0],
    description: 'description 2',
  },
]

const partiallyDisabledOptions: CheckboxGroupOption<number>[] = [
  {
    ...baseOptions[0],
    description: 'description 1',
    disabled: true,
  },
  {
    ...baseOptions[0],
    description: 'description 2',
  },
]

const baseProps: CheckboxGroupProps<number> = {
  options: baseOptions,
}

describe('CheckboxGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('renders correctly', () => {
    it('with base props', () => {
      const { asFragment } = render(<CheckboxGroup {...baseProps} />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('with descriptions', () => {
      const { asFragment } = render(
        <CheckboxGroup {...{ ...baseProps, options: optionsWithDescription }} />
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('when disabled', () => {
      const { asFragment } = render(
        <CheckboxGroup {...{ ...baseProps, isDisabled: true }} />
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('with partially disabled options', () => {
      const { asFragment } = render(
        <CheckboxGroup {...{ ...baseProps, options: partiallyDisabledOptions }} />
      )
      expect(asFragment()).toMatchSnapshot()
    })

    it('horizontal', () => {
      const { asFragment } = render(
        <CheckboxGroup {...{ ...baseProps, direction: CheckboxGroup.Direction.Horizontal }} />
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })

  it('should invoke onChange with correct value on user selection', async() => {
    const onChange = jest.fn()
    const props: CheckboxGroupProps<number> = {
      ...baseProps,
      onChange,
    }

    render(<CheckboxGroup {...props} />)

    const firstCheckbox = within(screen.getByText('checkbox 1')).getByRole('checkbox')
    const secondCheckbox = within(screen.getByText('checkbox 2')).getByRole('checkbox')

    expect(firstCheckbox).not.toBeChecked()
    expect(secondCheckbox).not.toBeChecked()

    await userEvent.click(firstCheckbox)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([baseOptions[0].value])
    })
    expect(firstCheckbox).toBeChecked()

    await userEvent.click(secondCheckbox)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([
        baseOptions[0].value,
        baseOptions[1].value,
      ])
    })

    expect(secondCheckbox).toBeChecked()
  })

  it('should invoke onChange with correct value on user deselection', async() => {
    const onChange = jest.fn()
    const props: CheckboxGroupProps<number> = {
      ...baseProps,
      defaultValue: [baseOptions[0].value],
      onChange,
    }

    render(<CheckboxGroup {...props} />)

    const checkbox = within(screen.getByText('checkbox 1')).getByRole('checkbox')

    expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([])
    })
    expect(checkbox).not.toBeChecked()
  })

  it('should not trigger onChange if disabled', async() => {
    const onChange = jest.fn()
    const props: CheckboxGroupProps<number> = {
      ...baseProps,
      isDisabled: true,
      onChange,
    }

    render(<CheckboxGroup {...props} />)

    const checkbox = within(screen.getByText('checkbox 1')).getByRole('checkbox')

    await waitFor(() => {
      expect(userEvent.click(checkbox)).rejects.toBeTruthy()
    })
  })

  it('should work fine with controlled values', async() => {
    const onChange = jest.fn()
    const props: CheckboxGroupProps<number> = {
      ...baseProps,
      value: [baseOptions[0].value],
      onChange,
    }

    render(<CheckboxGroup {...props} />)

    const firstCheckbox = within(screen.getByText('checkbox 1')).getByRole('checkbox')
    const secondCheckbox = within(screen.getByText('checkbox 2')).getByRole('checkbox')

    expect(firstCheckbox).toBeChecked()
    expect(secondCheckbox).not.toBeChecked()

    await userEvent.click(firstCheckbox)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([])
    })
    expect(firstCheckbox).toBeChecked()

    await userEvent.click(secondCheckbox)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([baseOptions[1].value])
    })

  })

})
