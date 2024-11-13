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

import { fireEvent, render, screen } from '../../test-utils'
import { Input } from './Input'

const textAddonValue = 'test'

const checkboxAddonLabel = 'test'

const selectAddonOptions = [
  ...Array(5).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
}))

describe('Input Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly', () => {
    const { asFragment } = render(<Input />)
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
    const { asFragment } = render(<Input allowClear defaultValue="text" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('TextArea renders correctly', () => {
    const { asFragment } = render(<Input type={Input.Type.Textarea} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Search renders correctly', () => {
    const { asFragment } = render(<Input type={Input.Type.Search} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Password renders correctly', () => {
    const { asFragment } = render(<Input type={Input.Type.Number} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Hidden renders correctly', () => {
    const { asFragment } = render(<Input type={Input.Type.Hidden} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonBeforeText renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'text', value: textAddonValue }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonBeforeSelect renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'select', options: selectAddonOptions }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonBeforeCheckbox renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'checkbox', label: checkboxAddonLabel }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonAfterText renders correctly', () => {
    const { asFragment } = render(<Input addonAfter={{ type: 'text', value: textAddonValue }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonAfterSelect renders correctly', () => {
    const { asFragment } = render(<Input addonAfter={{ type: 'select', options: selectAddonOptions }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonAfterCheckbox renders correctly', () => {
    const { asFragment } = render(<Input addonAfter={{ type: 'checkbox', label: checkboxAddonLabel }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonTextDisabled renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'text', value: textAddonValue }} isDisabled={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonSelectDisabled renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'select', options: selectAddonOptions }} isDisabled={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  // Test per la storia AddonCheckboxDisabled
  test('AddonCheckboxDisabled renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'checkbox', label: checkboxAddonLabel }} isDisabled={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  // Test per la storia AddonCheckboxDisabledChecked
  test('AddonCheckboxDisabledChecked renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ defaultValue: true, type: 'checkbox', label: checkboxAddonLabel }} isDisabled={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  // Test per la storia AddonTextError
  test('AddonTextError renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'text', value: textAddonValue }} isError={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  // Test per la storia AddonSelectError
  test('AddonSelectError renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'select', options: selectAddonOptions }} isError={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  // Test per la storia AddonCheckboxError
  test('AddonCheckboxError renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: 'checkbox', label: checkboxAddonLabel }} isError={true} />)
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
