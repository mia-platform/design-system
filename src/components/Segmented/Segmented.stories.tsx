import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { labeledOptions, stringOptions } from './Segmented.mocks'
import { OptionsAlignments } from './Segmented.types'
import { Segmented } from '.'

const meta = {
  component: Segmented,
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

export const Vertical: Story = {
  args: { ...meta.args, optionsAlignment: OptionsAlignments.Vertical },
}

export const Disabled: Story = {
  args: { ...meta.args, isDisabled: true },
}


