import { Meta, type StoryObj } from '@storybook/react'

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

const meta = {
  component: FormItem,
  decorators: (story) => {
    const handleFinish = (values: unknown): void => alert(`onFinish:\n${JSON.stringify(values)}`)
    return (
      <Form initialValues={initalValues} preserve={false} onFinish={handleFinish}>{story()}</Form>
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
        onChange(Number(value) + 1)
      }
      return (
        <Button onClick={handleClick}>{`clicked ${value} times`}</Button>
      )
    },
  },
}