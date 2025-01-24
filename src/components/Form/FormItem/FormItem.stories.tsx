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

import { Meta, type StoryObj } from '@storybook/react'
import { PiCircleHalfTilt } from 'react-icons/pi'

import { Button } from '../../Button'
import { Checkbox as CheckboxComponent } from '../../Checkbox'
import { CheckboxGroup as CheckboxGroupComponent } from '../../CheckboxGroup'
import { Form } from '../Form.tsx'
import { FormItem } from './FormItem.tsx'
import { Input as InputComponent } from '../../Input'
import { InputNumber as InputNumberComponent } from '../../InputNumber'
import { RadioGroup as RadioGroupComponent } from '../../RadioGroup'
import { Search as SearchComponent } from '../../Search'
import { Select as SelectComponent } from '../../Select'
import { Switch as SwitchComponent } from '../../Switch'
import { TextArea as TextAreaComponent } from '../../TextArea'

const options = [
  ...Array(3).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
  label: `label ${id + 1}`,
}))

const initialValues = {
  input: 'input',
  textarea: 'textarea',
  number: 1,
  search: options[0].value,
  select: options[0].value,
  multiselect: [options[0].value, options[1].value],
  checkboxGroup: [options[0].value],
  inputAddon: { before: options[0].value, value: 'text' },
  switch: true,
  checkbox: true,
  radioGroup: options[0].value,
  custom: 0,
}

const meta = {
  component: FormItem,
  decorators: (story) => {
    const handleFinish = (values: unknown): void => alert(`onFinish:\n${JSON.stringify(values)}`)
    return (
      <Form initialValues={initialValues} preserve={false} onFinish={handleFinish}>{story()}</Form>
    )
  },
  args: {
    isFullWidth: true,
  },
  argTypes: {},
  excludeStories: ['children'],
} satisfies Meta<typeof FormItem>

export default meta
type Story = StoryObj<typeof meta>

export const Input: Story = {
  args: {
    name: 'input',
    children: <InputComponent />,
  },
}

export const Required: Story = {
  args: {
    name: 'input',
    isRequired: true,
    children: <InputComponent />,
  },
}

export const InputWithTooltip: Story = {
  args: {
    name: 'input',
    tooltip: { title: 'title' },
    children: <InputComponent />,
  },
}

export const InputWithDoclink: Story = {
  args: {
    name: 'input',
    docLink: '#',
    children: <InputComponent />,
  },
}

export const InputWithDoclinkAndTooltip: Story = {
  args: {
    name: 'input',
    docLink: '#',
    tooltip: { title: 'title' },
    children: <InputComponent />,
  },
}

export const InputWithExtra: Story = {
  args: {
    name: 'input',
    extra: 'Extra',
    extraIcon: PiCircleHalfTilt,
    children: <InputComponent />,
  },
}

export const InputWithAddon: Story = {
  args: {
    name: 'inputAddon',
    children: <InputComponent addonBefore={{ type: InputComponent.AddonType.Select, options }} />,
  },
}

export const TextArea: Story = {
  args: {
    name: 'textarea',
    children: <TextAreaComponent />,
  },
}

export const InputNumber: Story = {
  args: {
    name: 'number',
    children: <InputNumberComponent />,
  },
}

export const Search: Story = {
  args: {
    name: 'search',
    children: <SearchComponent options={options} />,
  },
}

export const Select: Story = {
  args: {
    name: 'select',
    children: <SelectComponent options={options} />,
  },
}

export const Switch: Story = {
  args: {
    name: 'switch',
    children: <SwitchComponent />,
  },
}

export const Checkbox: Story = {
  args: {
    name: 'checkbox',
    children: <CheckboxComponent label="label" />,
  },
}

export const CheckboxGroup: Story = {
  args: {
    name: 'checkboxGroup',
    children: <CheckboxGroupComponent direction={CheckboxGroupComponent.Direction.Horizontal} options={options} />,
  },
}

export const RadioGroup: Story = {
  args: {
    name: 'radioGroup',
    children: <RadioGroupComponent direction={RadioGroupComponent.Direction.Horizontal} options={options} />,
  },
}

export const Custom: Story = {
  args: {
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
  },
}

export const ReadOnlyInput = {
  args: {
    name: 'input',
    isReadOnly: true,
    children: <InputComponent/>,
  },
}

export const ReadOnlySelect = {
  args: {
    name: 'select',
    isReadOnly: true,
    children: <SelectComponent options={options}/>,
  },
}

export const ReadOnlyMultiSelect = {
  args: {
    name: 'multiselect',
    isReadOnly: true,
    children: <SelectComponent isMultiple options={options}/>,
  },
}
