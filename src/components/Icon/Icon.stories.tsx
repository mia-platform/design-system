import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '.'

const figmaUrl = 'https://www.figma.com/file/0ar6alIEDe8iYCb8kU7Rxd/%5BDS%5D-Console-Mia-Platform?node-id=95%3A11839&mode=dev'
const iconsUrl = 'https://react-icons.github.io/react-icons/search'

const meta = {
  component: Icon,
  parameters: {
    design: [
      { type: 'iframe', name: 'Search', url: iconsUrl },
      { type: 'figma', name: 'Figma', url: figmaUrl, allowFullscreen: true },
    ],
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

