import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Hierarchies, OptionsAlignments } from './Segmented.types'
import { labeledOptions, stringOptions } from './Segmented.mocks'
import { Segmented } from '.'

const meta = {
  component: Segmented,
  argTypes: {
    defaultValue: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    ...Segmented.defaultProps,
    onChange: action('onChange'),
    options: labeledOptions,
  },
} satisfies Meta<typeof Segmented>

export default meta
type Story = StoryObj<typeof meta>

export const LabeledOptions: Story = {
  args: { ...meta.args },
}

export const StringOptions: Story = {
  args: { ...meta.args, options: stringOptions },
}

export const Primary: Story = {
  args: { ...meta.args, hierarchy: Hierarchies.Primary },
}

export const Vertical: Story = {
  args: { ...meta.args, optionsAlignment: OptionsAlignments.Vertical },
}

export const Disabled: Story = {
  args: { ...meta.args, isDisabled: true },
}

export const DefaultValue: Story = {
  args: { ...meta.args, defaultValue: 'five' },
}

export const MultiLine: Story = {
  args: { ...meta.args },
  decorators: [Story => (
    <div style={{ width: '40%' }}>
      <Story />
    </div>
  )],
}

export const MultiLineVertical: Story = {
  args: { ...meta.args, optionsAlignment: OptionsAlignments.Vertical },
  decorators: [Story => (
    <div style={{ width: '40%' }}>
      <Story />
    </div>
  )],
}
