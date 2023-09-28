import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '.'

const meta = {
  title: 'Typography',
  args: {
    children: 'Text',
  },
  argTypes: {
    children: { control: { type: 'text' } },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  argTypes: {
    children: { control: 'hidden' },
  },
  render: () => (
    <>
      <Typography.H1>{'H1'}</Typography.H1>
      <Typography.H2>{'H2'}</Typography.H2>
      <Typography.H3>{'H3'}</Typography.H3>
      <Typography.H4>{'H4'}</Typography.H4>
    </>
  ),
}

export const H1: Story = {
  render: (args) => <Typography.H1 {...args} />,
}

export const H2: Story = {
  render: (args) => <Typography.H2 {...args} />,
}

export const H3: Story = {
  render: (args) => <Typography.H3 {...args} />,
}

export const H4: Story = {
  render: (args) => <Typography.H4 {...args} />,
}
