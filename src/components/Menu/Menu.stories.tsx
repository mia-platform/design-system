import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { category, divider, group, item } from './Menu.mocks'
import { Menu } from './'

const figmaUrl = 'https://www.figma.com/file/0ar6alIEDe8iYCb8kU7Rxd/%5BDS%5D-Console-Mia-Platform?node-id=987%3A10396&mode=dev'

const meta = {
  component: Menu,
  parameters: {
    design: { type: 'figma', url: figmaUrl },
  },
  args: {
    ...Menu.defaultProps,
    items: [
      item,
      divider,
      category,
      divider,
      group,
    ],
    onClick: action('click'),
    onOpenChange: action('open change'),
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {
  args: meta.args,
}

export const Vertical: Story = {
  args: {
    ...meta.args,
    mode: 'vertical',
  },
  decorators: [Story => (
    <div style={{ width: '75%' }}>
      <Story />
    </div>
  )],
}

export const Category: Story = {
  args: {
    items: [category],
  },
}

export const Group: Story = {
  args: {
    items: [group],
  },
}

export const Divider: Story = {
  args: {
    items: [
      {
        key: 'before divider',
        label: 'Before Divider',
        title: 'Before Divider',
      },
      divider,
      {
        key: 'after divider',
        label: 'After Divider',
        title: 'After Divider',
      },
    ],
  },
}

export const Item: Story = {
  args: {
    items: [item],
  },
}

export const ItemDisabled: Story = {
  args: {
    items: [
      { ...item, disabled: true },
    ],
  },
}

export const ItemDanger: Story = {
  args: {
    items: [
      { ...item, danger: true },
    ],
  },
}
