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

import { fireEvent, render, screen } from '../../test-utils'
import { Search } from './Search'

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
    const { asFragment } = render(<Search options={options} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Should call onChange handler on typing', async() => {
    const onChange = jest.fn()
    const text = 'text'

    render(<Search options={options} onChange={onChange} />)

    const input = screen.getByRole<HTMLInputElement>('searchbox')

    fireEvent.change(input, { target: { value: text } })

    expect(onChange).toHaveBeenCalledWith(text, {})
    expect(input.value).toBe(text)
  })

  test('Should onSearch handler on typing', async() => {
    const onSearch = jest.fn()
    const text = 'text'

    render(<Search options={options} onChange={onSearch} />)

    const input = screen.getByRole<HTMLInputElement>('searchbox')

    fireEvent.change(input, { target: { value: text } })

    expect(onSearch).toHaveBeenCalledWith(text, {})
    expect(input.value).toBe(text)
  })

  test('Allow clear should clear input', () => {
    const [{ value: defaultValue }] = options

    render(<Search allowClear defaultValue={defaultValue} options={options} />)

    const input = screen.getByRole<HTMLInputElement>('searchbox')
    const clearIcon = screen.getByRole('img', { name: 'close-circle' })

    fireEvent.click(clearIcon)

    expect(input.value).toBe('')
  })

  test('Should show the options on typing', () => {
    render(<Search allowClear options={options} />)

    const input = screen.getByRole<HTMLInputElement>('searchbox')

    fireEvent.change(input, { target: { value: 'value' } })

    options.forEach(({ value }) => {
      expect(screen.getByTitle(value)).toBeInTheDocument()
    })
  })

  test('Pressing an option should trigger onSelect', () => {
    const onSelect = jest.fn()

    render(<Search allowClear options={options} onSelect={onSelect} />)

    const input = screen.getByRole<HTMLInputElement>('searchbox')

    fireEvent.change(input, { target: { value: 'value' } })

    const option = screen.getByTitle('value 1')

    fireEvent.click(option)

    expect(onSelect).toHaveBeenCalledWith(options[0].value, options[0])
  })
})
