import { Meta, StoryObj } from '@storybook/react'

import { GroupRadio } from './GroupRadio'
import { Option } from './GroupRadio.props'

const baseOptions: Option[] = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
]

const optionsWithDescription: Option[] = [
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

const optionsPartiallyDisabled: Option[] = [
  {
    label: 'Option 1',
    value: 1,
    description: 'Description 1',
  },
  {
    label: 'Option 2',
    value: 2,
    description: 'Description 2',
    disabled: true,
  },
]

const getArgs = (
  defaultValue: number,
  options: Option[],
  disabled = false
): { defaultValue: number; options: Option[]; disabled: boolean } => ({
  defaultValue,
  options,
  disabled,
})

const meta = {
  component: GroupRadio,
  args: getArgs(1, baseOptions),
} satisfies Meta<typeof GroupRadio>

export default meta

type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {}

export const WithDescription: Story = {
  args: getArgs(1, optionsWithDescription),
}

export const Disabled: Story = {
  args: getArgs(1, baseOptions, true),
}

export const PartiallyDisabled: Story = {
  args: getArgs(1, optionsPartiallyDisabled),
}

export const SelectedDisabled: Story = {
  args: getArgs(2, optionsPartiallyDisabled),
}

