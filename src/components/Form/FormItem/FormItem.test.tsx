/**
 * Copyright 2023 Mia srl
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

import { RenderResult, waitFor, within } from '@testing-library/react'
import { ReactElement } from 'react'
import { fireEvent } from '@testing-library/dom'

import { FormItemProps, RenderProps } from '../props.ts'
import { render, screen, userEvent } from '../../../test-utils.tsx'
import { Button } from '../../Button'
import { Checkbox } from '../../Checkbox'
import { CheckboxGroup } from '../../CheckboxGroup'
import { Form } from '../Form.tsx'
import { FormItem } from './FormItem.tsx'
import { Input } from '../../Input'
import { InputNumber } from '../../InputNumber'
import { RadioGroup } from '../../RadioGroup'
import { Search } from '../../Search'
import { Select } from '../../Select'
import { Switch } from '../../Switch'
import { TextArea } from '../../TextArea'
import { PiCircleHalfTilt } from '../../../../icons/pi/PiCircleHalfTilt'

const options = [
  ...Array(3).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
  label: `label ${id + 1}`,
}))

const exampleText = 'text'

const initalValues = {
  input: 'input',
  textarea: 'textarea',
  number: 1,
  search: options[0].value,
  select: options[0].value,
  checkboxGroup: [options[0].value],
  inputAddon: { before: options[0].value, value: 'text' },
  switch: true,
  checkbox: true,
  radioGroup: options[0].value,
  custom: 0,
}

const onValuesChange = jest.fn()

const renderItem = ({ children, ...props }: FormItemProps): RenderResult => (
  render(
    <Form initialValues={initalValues} preserve={false} onValuesChange={onValuesChange}>
      <FormItem shouldUpdate {...props}>
        {children}
      </FormItem>
    </Form>
  )
)

describe('FormItem Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('snapshots', () => {
    test('renders input FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'input',
        children: <Input />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders input required FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'input',
        isRequired: true,
        children: <Input />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders input with tooltip FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'input',
        tooltip: { title: 'tooltip' },
        children: <Input />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders input with docLink FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'input',
        tooltip: { title: 'tooltip' },
        children: <Input />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders input with extra FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'input',
        extra: 'Extra',
        extraIcon: PiCircleHalfTilt,
        children: <Input />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders inputAddon FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'inputAddon',
        children: <Input addonBefore={{ type: Input.AddonType.Select, options }} />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders textarea FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'textarea',
        children: <TextArea />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders inputNumber FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'number',
        children: <InputNumber />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders search FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'search',
        children: <Search options={options} />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders select FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'select',
        children: <Select options={options} />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders switch FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'switch',
        children: <Switch />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders checkbox FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'checkbox',
        children: <Checkbox label="label" />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders checkboxGroup FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'checkboxGroup',
        children: <CheckboxGroup direction={CheckboxGroup.Direction.Horizontal} options={options} />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders radioGroup FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'radioGroup',
        children: <RadioGroup direction={RadioGroup.Direction.Horizontal} options={options} />,
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })

    test('renders radioGroup FormItem correctly', async() => {
      const { asFragment } = renderItem({
        name: 'custom',
        children: ({ value, onChange }) => {
          const handleClick = (): void => {
            if (onChange) {
              onChange(Number(value) + 1)
            }
          }
          return (
            <Button onClick={handleClick}>{`clicked ${value} times`}</Button>
          )
        },
      })
      await waitFor(() => expect(asFragment()).toMatchSnapshot())
    })
  })

  test('click on docLink button should open a new window', async() => {
    const openLink = jest.fn()
    jest.spyOn(window, 'open').mockImplementationOnce(openLink)

    renderItem({
      name: 'input',
      docLink: '#',
      children: <Input />,
    })

    const button = screen.getByRole('button', { name: 'doc-link' })
    await userEvent.click(button)
    expect(openLink).toHaveBeenCalledWith('#', '_blank')
  })

  describe('onChange', () => {
    test('input should display value and change correctly', async() => {
      renderItem({
        name: 'input',
        children: <Input />,
      })

      const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'input' })
      expect(input.value).toEqual(initalValues.input)
      fireEvent.change(input, { target: { value: exampleText } })
      expect(input.value).toEqual(exampleText)
      expect(onValuesChange).toHaveBeenCalledWith({ input: exampleText }, { input: exampleText })
    })

    test('textarea should display value and change correctly', async() => {
      renderItem({
        name: 'textarea',
        children: <TextArea />,
      })

      const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'textarea' })
      expect(input.value).toEqual(initalValues.textarea)
      fireEvent.change(input, { target: { value: exampleText } })
      expect(input.value).toEqual(exampleText)
      expect(onValuesChange).toHaveBeenCalledWith({ textarea: exampleText }, { textarea: exampleText })
    })

    test('inputNumber should display value and change correctly', async() => {
      renderItem({
        name: 'number',
        children: <InputNumber />,
      })

      const input = screen.getByRole<HTMLInputElement>('spinbutton', { name: 'number' })
      expect(input.value).toEqual(String(initalValues.number))
      fireEvent.change(input, { target: { value: 123456 } })
      expect(input.value).toEqual(String(123456))
      expect(onValuesChange).toHaveBeenCalledWith({ number: 123456 }, { number: 123456 })
    })

    test('search should display value and change correctly', async() => {
      renderItem({
        name: 'search',
        children: <Search options={options} />,
      })
      const input = screen.getByRole<HTMLInputElement>('searchbox', { name: 'search' })

      expect(input.value).toEqual(options[0].value)

      fireEvent.change(input, { target: { value: options[1].value } })

      const option = screen.getByTitle(options[1].label)

      fireEvent.click(option)

      expect(input.value).toEqual(options[1].value)
      expect(onValuesChange).toHaveBeenCalledWith({ search: options[1].value }, { search: options[1].value })
    })

    test('select should display value and change correctly', async() => {
      renderItem({
        name: 'select',
        children: <Select options={options} />,
      })
      const input = screen.getByRole<HTMLInputElement>('combobox', { name: 'select' })

      await userEvent.click(input)

      const option = screen.getByTitle(options[1].label)
      await userEvent.click(option)

      expect(onValuesChange).toHaveBeenCalledWith({ select: options[1].value }, { select: options[1].value })
    })

    test('checkbox should display value and change correctly', async() => {
      renderItem({
        name: 'checkbox',
        children: <Checkbox />,
      })
      const input = screen.getByRole('checkbox', { name: 'checkbox' })
      expect(input).toBeChecked()
      await userEvent.click(input)
      expect(input).not.toBeChecked()
      expect(onValuesChange).toHaveBeenCalledWith({ checkbox: false }, { checkbox: false })
    })

    test('switch should display value and change correctly', async() => {
      renderItem({
        name: 'switch',
        children: <Switch />,
      })
      const input = screen.getByRole('switch', { name: 'switch' })
      expect(input).toBeChecked()
      await userEvent.click(input)
      expect(input).not.toBeChecked()
      expect(onValuesChange).toHaveBeenCalledWith({ switch: false }, { switch: false })
    })

    test('checkboxGroup should display value and change correctly', async() => {
      renderItem({
        name: 'checkboxGroup',
        children: <CheckboxGroup options={options} />,
      })
      const input = screen.getByRole('checkbox', { name: 'label 2' })
      expect(input).not.toBeChecked()
      await userEvent.click(input)
      expect(input).toBeChecked()
      expect(onValuesChange).toHaveBeenCalledWith(
        { checkboxGroup: [options[0].value, options[1].value] },
        { checkboxGroup: [options[0].value, options[1].value] },
      )
    })

    test('radioGroup should display value and change correctly', async() => {
      renderItem({
        name: 'radioGroup',
        children: <RadioGroup options={options} />,
      })
      const input = screen.getByRole('radio', { name: 'label 2' })
      expect(input).not.toBeChecked()
      await userEvent.click(input)
      expect(input).toBeChecked()
      expect(onValuesChange).toHaveBeenCalledWith(
        { radioGroup: options[1].value },
        { radioGroup: options[1].value },
      )
    })
  })

  describe('customInput', () => {
    test('custom input from component should work properly', () => {
      const CustomInput = (
        { test: value, onChange }: { test?: unknown; onChange?: (_: unknown, value: unknown) => void}
      ): ReactElement => {
        const handleClick = (): void => {
          if (onChange) {
            onChange(undefined, Number(value) + 1)
          }
        }
        return (
          <Button
            onClick={handleClick}
          >
            {String(value)}
          </Button>
        )
      }

      renderItem({
        name: 'custom',
        children: <CustomInput />,
        getValueFromEvent: (...args: unknown[]) => args[1],
        valuePropName: 'test',
      })

      const button = screen.getByRole('button', { name: String(initalValues.custom) })
      expect(within(button).getByText(initalValues.custom)).toBeInTheDocument()
      fireEvent.click(button)
      expect(within(button).getByText(initalValues.custom + 1)).toBeInTheDocument()
      expect(onValuesChange).toHaveBeenCalledWith(
        { custom: initalValues.custom + 1 }, {
          custom: initalValues.custom + 1 })
    })

    test('custom input from render function should work properly', () => {
      const customInput = ({ value, onChange }: RenderProps): ReactElement => {
        const handleClick = (): void => {
          if (onChange) {
            onChange(Number(value) + 1)
          }
        }
        return (
          <Button onClick={handleClick}>{String(value)}</Button>
        )
      }

      renderItem({
        name: 'custom',
        children: customInput,
      })

      const button = screen.getByRole('button', { name: String(initalValues.custom) })
      expect(within(button).getByText(initalValues.custom)).toBeInTheDocument()
      fireEvent.click(button)
      expect(within(button).getByText(initalValues.custom + 1)).toBeInTheDocument()
      expect(onValuesChange).toHaveBeenCalledWith(
        { custom: initalValues.custom + 1 }, {
          custom: initalValues.custom + 1 })
    })

    test('custom input from render function should work properly if no name is specified', () => {
      const customInput = (): ReactElement => {
        return <p>{exampleText}</p>
      }
      renderItem({
        children: customInput,
      })
      expect(screen.getByText(exampleText)).toBeInTheDocument()
    })
  })
})
