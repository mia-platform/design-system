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

import { within } from '@testing-library/react'

import { render, screen, userEvent } from '../../test-utils'
import { Select } from './Select'

const options = [
  ...Array(5).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
}))

describe('Input Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly', () => {
    const { asFragment } = render(<Select options={options} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Borderless renders correctly', () => {
    const { asFragment } = render(<Select appearance={Select.Appearance.Borderless} options={options} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Read only renders correctly', () => {
    const { asFragment } = render(<Select isReadOnly options={options} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Error renders correctly', () => {
    const { asFragment } = render(<Select isError options={options} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Disabled renders correctly', () => {
    const { asFragment } = render(<Select isDisabled options={options} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Should call event handler on Change', async() => {
    const onChange = jest.fn()

    render(<Select options={options} onChange={onChange} />)

    const input = screen.getByRole<HTMLInputElement>('combobox')

    await await userEvent.click(input)

    const option = screen.getByTitle(options[0].value)
    await await userEvent.click(option)

    expect(onChange).toHaveBeenCalledWith(options[0].value, options[0])
  })

  test('Allow clear should clear input', async() => {
    const onClear = jest.fn()

    render(
      <Select
        allowClear
        defaultValue={options[0].value}
        options={options}
        onClear={onClear}
      />
    )

    const clearIcon = screen.getByRole('img', { name: 'close-circle', hidden: true })

    await await userEvent.click(clearIcon)

    expect(onClear).toHaveBeenCalled()
  })

  test('Should call select handlers onChange and onSelect if multiple', async() => {
    const onSelect = jest.fn()
    const onChange = jest.fn()

    render(
      <Select
        isMultiple
        options={options}
        onChange={onChange}
        onSelect={onSelect}
      />
    )

    const input = screen.getByRole<HTMLInputElement>('combobox')

    await await userEvent.click(input)

    const option1 = screen.getByTitle(options[0].value)
    const option2 = screen.getByTitle(options[1].value)
    await await userEvent.click(option1)

    expect(onSelect).toHaveBeenCalledWith(options[0].value, options[0])
    expect(onChange).toHaveBeenCalledWith(
      [options[0].value],
      [options[0]]
    )
    await await userEvent.click(option2)

    expect(onSelect).toHaveBeenCalledWith(options[1].value, options[1])
    expect(onChange).toHaveBeenCalledWith(
      [options[0].value, options[1].value],
      [options[0], options[1]]
    )
  })

  test('Should call select handlers onChange and onDeselect on tag click if multiple', async() => {
    const onDeselect = jest.fn()
    const onChange = jest.fn()

    render(
      <Select
        defaultValue={[options[0].value]}
        isMultiple
        options={options}
        onChange={onChange}
        onDeselect={onDeselect}
      />
    )

    const option = screen.getByText(options[0].value)
    const closeIcon = within(option).getByRole('img', { name: 'close' })
    await await userEvent.click(closeIcon)

    screen.logTestingPlaygroundURL()

    expect(onDeselect).toHaveBeenCalledWith(options[0].value, options[0])
    expect(onChange).toHaveBeenCalledWith([], [])
  })
})
