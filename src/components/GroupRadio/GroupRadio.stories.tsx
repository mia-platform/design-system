import { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { GroupRadioOption, GroupRadioProps } from './GroupRadio.props'
import { GroupRadio } from './GroupRadio'

const baseOptions: GroupRadioOption[] = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
]

const optionsWithDescription: GroupRadioOption[] = [
  {
    label: 'Option 1',
    value: 1,
    description: 'Description 1',
  },
  {
    label: 'Option 2',
    value: 2,
    description: 'Description 2',
  },
]

const optionsPartiallyDisabled: GroupRadioOption[] = [
  {
    label: 'Option 1',
    value: 1,
    description: 'Description 1',
    disabled: true,
  },
  {
    label: 'Option 2',
    value: 2,
    description: 'Description 2',
  },
]

const allOptionsDisabled: GroupRadioOption[] = [
  {
    label: 'Option 1',
    value: 1,
    description: 'Description 1',
    disabled: true,
  },
  {
    label: 'Option 2',
    value: 2,
    description: 'Description 2',
    disabled: true,
  },
]

const getArgs = (
  options: GroupRadioOption[],
  defaultValue?: number,
  disabled = false,
): GroupRadioProps => ({
  options,
  defaultValue,
  disabled,
  onChange: action('onChange'),
})

const meta = {
  component: GroupRadio,
  args: getArgs(baseOptions),
} satisfies Meta<typeof GroupRadio>

export default meta

type Story = StoryObj<typeof meta>;

export const WithoutDefaultValue: Story = {}

export const WithDefaultValue: Story = {
  args: getArgs(baseOptions, 2),
}

export const WithNonExistentDefaultValue: Story = {
  args: getArgs(baseOptions, 3),
}

export const WithDescription: Story = {
  args: getArgs(optionsWithDescription),
}

export const Disabled: Story = {
  args: getArgs(baseOptions, undefined, true),
}

export const PartiallyDisabled: Story = {
  args: getArgs(optionsPartiallyDisabled),
}

export const PartiallyDisabledWithDefault: Story = {
  args: getArgs(optionsPartiallyDisabled, 1),
}

export const AllOptionsDisabledWithDefault: Story = {
  args: getArgs(allOptionsDisabled, 1),
}

export const AllOptionsDisabledWithoutDefault: Story = {
  args: getArgs(allOptionsDisabled),
}

