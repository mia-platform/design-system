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

import { RenderResult, waitFor } from '@testing-library/react'

import { Button } from '../../Button'
import { Checkbox } from '../../Checkbox'
import { CheckboxGroup } from '../../CheckboxGroup'
import { Form } from '../Form.tsx'
import { FormItem } from './FormItem.tsx'
import { FormItemProps } from '../props.ts'
import { Input } from '../../Input'
import { InputNumber } from '../../InputNumber'
import { RadioGroup } from '../../RadioGroup'
import { Search } from '../../Search'
import { Select } from '../../Select'
import { Switch } from '../../Switch'
import { TextArea } from '../../TextArea'
import { render } from '../../../test-utils.tsx'

const options = [
  ...Array(3).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
  label: `label ${id + 1}`,
}))

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

const renderItem = ({ children, ...props }: FormItemProps): RenderResult =>
  render(
    <Form initialValues={initalValues} preserve={false}>
      <FormItem {...props}>
        {children}
      </FormItem>
    </Form>
  )

describe('FormItem Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders input FormItem correctly', async() => {
    const { asFragment } = renderItem({
      name: 'input',
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
          onChange(Number(value) + 1)
        }
        return (
          <Button onClick={handleClick}>{`clicked ${value} times`}</Button>
        )
      },
    })
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
})
