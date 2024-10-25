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

import { FiSearch } from 'react-icons/fi'

import { fireEvent, render, screen } from '../../test-utils.tsx'
import { Input } from './Input.tsx'

describe('Input Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly', () => {
    const { asFragment } = render(<Input />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Borderless renders correctly', () => {
    const { asFragment } = render(<Input appearance={Input.Type.Borderless} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Read only renders correctly', () => {
    const { asFragment } = render(<Input isReadOnly />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Error renders correctly', () => {
    const { asFragment } = render(<Input isError={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Disabled renders correctly', () => {
    const { asFragment } = render(<Input isDisabled={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('With left icon renders correctly', () => {
    const { asFragment } = render(<Input iconLeft={FiSearch} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('With right icon renders correctly', () => {
    const { asFragment } = render(<Input iconRight={FiSearch} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AllowClear renders correctly', () => {
    const { asFragment } = render(<Input allowClear={true} defaultValue="text" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('TextArea renders correctly', () => {
    const { asFragment } = render(<Input type={Input.HTMLType.Textarea} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Search renders correctly', () => {
    const { asFragment } = render(<Input type={Input.HTMLType.Search} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Password renders correctly', () => {
    const { asFragment } = render(<Input type={Input.HTMLType.Number} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Hidden renders correctly', () => {
    const { asFragment } = render(<Input type={Input.HTMLType.Hidden} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Should call event handler on Change', async() => {
    const onChange = jest.fn()
    const text = 'text'

    render(<Input onChange={onChange} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.change(input, { target: { value: text } })

    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe(text)
  })

  test('Allow clear should clear input', () => {
    const text = 'text'

    render(<Input allowClear defaultValue={text} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    const clearIcon = screen.getByRole('img', { name: 'close-circle' })

    fireEvent.click(clearIcon)

    expect(input.value).toBe('')
  })
})
