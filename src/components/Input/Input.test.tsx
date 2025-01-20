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
import { AddonType } from './types.ts'
import { Input } from './Input'
import { userEvent } from '../../test-utils.tsx'

const exampleText = 'test'

const textAddonValue = exampleText
const checkboxAddonLabel = exampleText

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
    const { asFragment } = render(<Input addonBefore={{ type: AddonType.Text, value: textAddonValue }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonBeforeSelect renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: AddonType.Select, options: selectAddonOptions }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonBeforeCheckbox renders correctly', () => {
    const { asFragment } = render(<Input addonBefore={{ type: AddonType.Checkbox, label: checkboxAddonLabel }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonAfterText renders correctly', () => {
    const { asFragment } = render(<Input addonAfter={{ type: AddonType.Text, value: textAddonValue }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonAfterSelect renders correctly', () => {
    const { asFragment } = render(<Input addonAfter={{ type: AddonType.Select, options: selectAddonOptions }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonAfterCheckbox renders correctly', () => {
    const { asFragment } = render(<Input addonAfter={{ type: AddonType.Checkbox, label: checkboxAddonLabel }} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonTextDisabled renders correctly', () => {
    const { asFragment } = render(
      <Input addonBefore={{ type: AddonType.Text, value: textAddonValue }} isDisabled={true} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonSelectDisabled renders correctly', () => {
    const { asFragment } = render(
      <Input addonBefore={{ type: AddonType.Select, options: selectAddonOptions }} isDisabled={true} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonCheckboxDisabled renders correctly', () => {
    const { asFragment } = render(
      <Input addonBefore={{ type: AddonType.Checkbox, label: checkboxAddonLabel }} isDisabled={true} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonTextError renders correctly', () => {
    const { asFragment } = render(
      <Input addonBefore={{ type: AddonType.Text, value: textAddonValue }} isError={true} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonSelectError renders correctly', () => {
    const { asFragment } = render(
      <Input addonBefore={{ type: AddonType.Select, options: selectAddonOptions }} isError={true} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('AddonCheckboxError renders correctly', () => {
    const { asFragment } = render(
      <Input addonBefore={{ type: AddonType.Checkbox, label: checkboxAddonLabel }} isError={true} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('Should call event handler on Change', async() => {
    const onChange = jest.fn()

    render(<Input onChange={onChange} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.change(input, { target: { value: exampleText } })

    expect(onChange).toHaveBeenCalled()
    expect(input.value).toBe(exampleText)
  })

  test('Should call event handler on Blur', async() => {
    const onBlur = jest.fn()

    render(<Input onBlur={onBlur} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.blur(input, { target: { value: exampleText } })

    expect(onBlur).toHaveBeenCalled()
    expect(input.value).toBe(exampleText)
  })

  test('Allow clear should clear input', () => {
    render(<Input allowClear defaultValue={exampleText} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    const clearIcon = screen.getByRole('img', { name: 'close-circle' })

    fireEvent.click(clearIcon)

    expect(input.value).toBe('')
  })

  test('Addon select should trigger onChange and with correct parameters', async() => {
    const onChange = jest.fn()
    const onChangeAddon = jest.fn()

    render(
      <Input
        addonBefore={{ type: AddonType.Select, options: selectAddonOptions, onChange: onChangeAddon }}
        onChange={onChange}
      />
    )

    const input = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.change(input, { target: { value: exampleText } })

    expect(onChange).toHaveBeenCalledWith({}, { value: exampleText })
    expect(input.value).toBe(exampleText)

    const select = screen.getByRole<HTMLInputElement>('combobox')

    await userEvent.click(select)

    const option = screen.getByTitle(selectAddonOptions[0].value)
    await userEvent.click(option)

    expect(onChange).toHaveBeenCalledWith(undefined, { value: exampleText, before: selectAddonOptions[0].value })
    expect(onChangeAddon).toHaveBeenCalledWith(selectAddonOptions[0].value)
  })

  test('Addon checkbox should trigger onChange with correct parameters', async() => {
    const onChange = jest.fn()
    const onChangeAddon = jest.fn()

    render(
      <Input
        addonBefore={{ type: AddonType.Checkbox, label: checkboxAddonLabel, onChange: onChangeAddon }}
        onChange={onChange}
      />
    )

    const input = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.change(input, { target: { value: exampleText } })

    expect(onChange).toHaveBeenCalledWith({}, { value: exampleText })
    expect(input.value).toBe(exampleText)

    const checkbox = screen.getByRole<HTMLInputElement>('checkbox')

    await userEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledWith(undefined, { value: exampleText, before: true })
    expect(onChangeAddon).toHaveBeenCalledWith(true)
  })

  test('defaultValue should be properly set for addons', async() => {
    const onChange = jest.fn()

    render(
      <Input
        addonBefore={{ type: AddonType.Checkbox, label: checkboxAddonLabel, defaultValue: true }}
        onChange={onChange}
      />
    )

    const checkbox = screen.getByRole<HTMLInputElement>('checkbox')

    expect(checkbox).toBeChecked()
  })

  test('should be able to set disabled for the addon', async() => {
    const onChange = jest.fn()

    render(
      <Input
        addonBefore={{ type: AddonType.Checkbox, label: checkboxAddonLabel, disabled: true }}
        onChange={onChange}
      />
    )
    const input = screen.getByRole<HTMLInputElement>('textbox')
    const checkbox = screen.getByRole<HTMLInputElement>('checkbox')

    expect(input).not.toBeDisabled()
    expect(checkbox).toBeDisabled()
  })

  test('if no addon is provided the second argument of onChange should be the string value', async() => {
    const onChange = jest.fn()

    render(<Input onChange={onChange} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.change(input, { target: { value: exampleText } })

    expect(onChange).toHaveBeenCalledWith({}, exampleText)
  })

  test('should accept an object value prop if addons are set', async() => {
    const onChange = jest.fn()

    render(
      <Input
        addonBefore={{ type: AddonType.Checkbox, label: checkboxAddonLabel }}
        defaultValue={{ value: exampleText, before: true }}
        onChange={onChange}
      />
    )

    const input = screen.getByRole<HTMLInputElement>('textbox')
    const checkbox = screen.getByRole<HTMLInputElement>('checkbox')

    fireEvent.change(input, { target: { value: exampleText } })

    expect(input.value).toBe(exampleText)
    expect(checkbox).toBeChecked()
  })

  test('should work with custom names for input and addons values', async() => {
    const onChange = jest.fn()

    render(
      <Input
        addonBefore={{ type: AddonType.Checkbox, label: checkboxAddonLabel, name: 'addonBeforeValue' }}
        defaultValue={{ inputValue: exampleText, addonBeforeValue: true }}
        valuePropName="inputValue"
        onChange={onChange}
      />
    )

    const input = screen.getByRole<HTMLInputElement>('textbox')
    const checkbox = screen.getByRole<HTMLInputElement>('checkbox')

    expect(input.value).toBe(exampleText)
    expect(checkbox).toBeChecked()

    fireEvent.change(input, { target: { value: 'changedValue' } })
    expect(onChange).toHaveBeenCalledWith({}, {
      inputValue: 'changedValue',
      addonBeforeValue: true,
    })

    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(undefined, {
      inputValue: 'changedValue',
      addonBeforeValue: false,
    })
  })
})
