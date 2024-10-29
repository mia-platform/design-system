import { Meta, StoryObj } from '@storybook/react'

import { GropupRadioProps, Option } from './GroupRadio.props'
import { GroupRadio } from './GroupRadio'

const options: Option[] = [
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

const args: GropupRadioProps = {
  defaultValue: 1,
  options,
}

const meta = {
  component: GroupRadio,
  args,
} satisfies Meta<typeof GroupRadio>

export default meta

type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {}

export const Disabled: Story = {
  args: { ...args, disabled: true },
}

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

export const SelectedDisabled: Story = {
  args: { ...args, options: optionsPartiallyDisabled },
}

export const PartiallyDisabled: Story = {
  args: { ...args, defaultValue: 2, options: optionsPartiallyDisabled },
}
