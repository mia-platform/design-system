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

import { ReactNode } from 'react'
import { within } from '@testing-library/react'

import { render, screen, userEvent } from '../../test-utils'
import { Select } from './Select'

const options = [
  ...Array(5).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
}))

describe('Select Component', () => {
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

    await userEvent.click(input)

    const option = screen.getByTitle(options[0].value)
    await userEvent.click(option)

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

    await userEvent.click(clearIcon)

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

    await userEvent.click(input)

    const option1 = screen.getByTitle(options[0].value)
    const option2 = screen.getByTitle(options[1].value)
    await userEvent.click(option1)

    expect(onSelect).toHaveBeenCalledWith(options[0].value, options[0])
    expect(onChange).toHaveBeenCalledWith(
      [options[0].value],
      [options[0]]
    )
    await userEvent.click(option2)

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
    await userEvent.click(closeIcon)

    expect(onDeselect).toHaveBeenCalledWith(options[0].value, options[0])
    expect(onChange).toHaveBeenCalledWith([], [])
  })

  test('Should show tag placeholder if in multiple mode', async() => {
    const onDeselect = jest.fn()
    const onChange = jest.fn()

    render(
      <Select
        defaultValue={[options[0].value, options[1].value, options[2].value]}
        isMultiple
        maxTagCount={1}
        maxTagPlaceholder={`number of collapsed tag: ${options.length - 1}`}
        options={options}
        onChange={onChange}
        onDeselect={onDeselect}
      />
    )

    const placeholder = screen.getByText(`number of collapsed tag: ${options.length - 1}`)
    expect(placeholder).toBeVisible()
  })

  test('Should use option render opening the select dropdown', async() => {
    const optionsWithDescription = [
      ...Array(5).keys(),
    ].map((id) => ({
      value: `Custom value ${id + 1}`,
      id: `value ${id + 1}`,
      description: `description ${id + 1}`,
    }))
    render(
      <Select
        defaultValue={optionsWithDescription[0].id}
        optionRender={(option) => (
          <span>
            {option.data.value}
            {' - '}
            {option.data.description as ReactNode}
          </span>
        )}
        options={optionsWithDescription}
      />
    )

    const defaultSelection = screen.getByTitle('value 1')
    expect(defaultSelection).toBeInTheDocument()

    const input = screen.getByRole<HTMLInputElement>('combobox')
    await userEvent.click(input)

    expect(screen.getByTitle('Custom value 1')).toBeInTheDocument()
    expect(screen.getByText(/description 1/i)).toBeInTheDocument()
    expect(screen.getByTitle('Custom value 2')).toBeInTheDocument()
    expect(screen.getByText(/description 2/i)).toBeInTheDocument()
    expect(screen.getByTitle('Custom value 3')).toBeInTheDocument()
    expect(screen.getByText(/description 3/i)).toBeInTheDocument()
    expect(screen.getByTitle('Custom value 4')).toBeInTheDocument()
    expect(screen.getByText(/description 4/i)).toBeInTheDocument()
    expect(screen.getByTitle('Custom value 5')).toBeInTheDocument()
    expect(screen.getByText(/description 5/i)).toBeInTheDocument()
  })

  test('Should call onSearch when typing', async() => {
    const onSearch = jest.fn()
    render(
      <Select
        options={options}
        onSearch={onSearch}
      />
    )
    const input = screen.getByRole<HTMLInputElement>('combobox')
    await userEvent.click(input)

    await userEvent.type(input, 'test')
    expect(input).toHaveValue('test')

    expect(onSearch).toHaveBeenCalledTimes(4)
    expect(onSearch).toHaveBeenNthCalledWith(1, 't')
    expect(onSearch).toHaveBeenNthCalledWith(2, 'te')
    expect(onSearch).toHaveBeenNthCalledWith(3, 'tes')
    expect(onSearch).toHaveBeenNthCalledWith(4, 'test')
  })

  test('Should filter option when filterOption set to true', async() => {
    render(
      <Select
        filterOption
        options={options}
      />
    )
    const input = screen.getByRole<HTMLInputElement>('combobox')
    await userEvent.click(input)

    await userEvent.type(input, '5')
    expect(input).toHaveValue('5')

    expect(screen.getByTitle('value 5')).toBeInTheDocument()
    expect(screen.queryByTitle('value 1')).not.toBeInTheDocument()
  })

  test('Should filter option when filterOption set to a function', async() => {
    const filterOption = jest.fn((input, option) => {
      return option.value.toLowerCase().includes(input.toLowerCase())
    })
    render(
      <Select
        filterOption={filterOption}
        options={options}
      />
    )
    const input = screen.getByRole<HTMLInputElement>('combobox')
    await userEvent.click(input)

    await userEvent.type(input, '5')
    expect(input).toHaveValue('5')

    expect(filterOption).toHaveBeenCalledTimes(options.length)
    expect(filterOption).toHaveBeenNthCalledWith(1, '5', options[0])
    expect(filterOption).toHaveBeenNthCalledWith(2, '5', options[1])
    expect(filterOption).toHaveBeenNthCalledWith(3, '5', options[2])
    expect(filterOption).toHaveBeenNthCalledWith(4, '5', options[3])
    expect(filterOption).toHaveBeenNthCalledWith(5, '5', options[4])
  })
})
