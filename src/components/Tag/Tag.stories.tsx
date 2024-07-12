import { Meta, StoryObj } from '@storybook/react'

import { Tag } from '.'
import { defaults } from './Tag'

const meta = {
  component: Tag,
  args: {
    ...defaults,
    children: 'Tag text',
  },
  argTypes: {
    children: { control: false },
    closeIcon: { type: 'boolean' },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const BasicExample: Story = {}

export const Colored: Story = {
  args: {
    color: 'magenta',
  },
}

export const Bordered: Story = {
  args: {
    isBordered: true,
  },
}

export const WithDefaultCloseIcon: Story = {
  args: {
    closeIcon: true,
  },
}

export const WithCustomCloseIcon: Story = {
  args: {
    closeIcon: <span>X</span>,
  },
}

