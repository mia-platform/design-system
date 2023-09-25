import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '.'

const iconsUrl = 'https://react-icons.github.io/react-icons/search'

const meta = {
  component: Icon,
  parameters: {
    design: { type: 'iframe', name: 'Search', url: iconsUrl },
  },
  args: {
    ...Icon.defaultProps,
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Custom: Story = {
  args: { ...meta.args, name: 'MiaPlatform' },
}

export const Ant: Story = {
  args: { ...meta.args, name: 'AiOutlineHome' },
}

export const Feather: Story = {
  args: { ...meta.args, name: 'FiHome' },
}

export const Phosphor: Story = {
  args: { ...meta.args, name: 'PiHouse' },
}

