import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from './Button'

const figmaUrl = 'https://www.figma.com/file/0ar6alIEDe8iYCb8kU7Rxd/%5BDS%5D-Console-Mia-Platform?node-id=2%3A162&mode=dev'

const meta = {
  component: Button,
  parameters: {
    design: { type: 'figma', url: figmaUrl },
  },
  args: {
    ...Button.defaultProps,
    children: 'Button',
    onClick: action('click'),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryFilled: Story = {
  args: {
    ...meta.args,
    hierarchy: 'primary',
    type: 'filled',
  },
}

export const PrimaryOutline: Story = {
  args: {
    ...meta.args,
    hierarchy: 'primary',
    type: 'outline',
  },
}

export const PrimaryGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: 'primary',
    type: 'ghost',
  },
}

export const NeutralOutline: Story = {
  args: {
    ...meta.args,
    hierarchy: 'neutral',
    type: 'outline',
  },
}

export const NeutralGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: 'neutral',
    type: 'ghost',
  },
}

export const DangerFilled: Story = {
  args: {
    ...meta.args,
    hierarchy: 'danger',
    type: 'filled',
  },
}

export const DangerOutline: Story = {
  args: {
    ...meta.args,
    hierarchy: 'danger',
    type: 'outline',
  },
}

export const DangerGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: 'danger',
    type: 'ghost',
  },
}

export const SquareShape: Story = {
  args: {
    ...meta.args,
    children: '+',
    shape: 'square',
  },
}

export const CircleShape: Story = {
  args: {
    ...meta.args,
    children: '+',
    shape: 'circle',
  },
}

export const SmallSize: Story = {
  args: {
    ...meta.args,
    size: 'small',
  },
}

export const MiddleSize: Story = {
  args: {
    ...meta.args,
    size: 'middle',
  },
}

export const LargeSize: Story = {
  args: {
    ...meta.args,
    size: 'large',
  },
}

export const Disabled: Story = {
  args: {
    ...meta.args,
    isDisabled: true,
  },
}

export const Loading: Story = {
  args: {
    ...meta.args,
    isLoading: true,
  },
}
