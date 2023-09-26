import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ButtonHierarchies, ButtonIconPositions, ButtonShapes, ButtonSizes, ButtonTypes } from './Button.types'
import { Button } from './Button'
import { Icon } from '../Icon'

const { Primary, Neutral, Danger } = ButtonHierarchies
const { Left, Right } = ButtonIconPositions
const { Square, Circle } = ButtonShapes
const { Small, Middle, Large } = ButtonSizes
const { Filled, Outline, Ghost } = ButtonTypes

const icon = <Icon color="white" name="PiCircleHalfTiltLight" size={16} />

const meta = {
  component: Button,
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
    hierarchy: Primary,
    type: Filled,
  },
}

export const PrimaryOutline: Story = {
  args: {
    ...meta.args,
    hierarchy: Primary,
    type: Outline,
  },
}

export const PrimaryGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: Primary,
    type: Ghost,
  },
}

export const NeutralOutline: Story = {
  args: {
    ...meta.args,
    hierarchy: Neutral,
    type: Outline,
  },
}

export const NeutralGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: Neutral,
    type: Ghost,
  },
}

export const DangerFilled: Story = {
  args: {
    ...meta.args,
    hierarchy: Danger,
    type: Filled,
  },
}

export const DangerOutline: Story = {
  args: {
    ...meta.args,
    hierarchy: Danger,
    type: Outline,
  },
}

export const DangerGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: Danger,
    type: Ghost,
  },
}

export const SquareShape: Story = {
  args: {
    ...meta.args,
    children: undefined,
    icon,
    shape: Square,
  },
}

export const CircleShape: Story = {
  args: {
    ...meta.args,
    children: undefined,
    icon,
    shape: Circle,
  },
}

export const SmallSize: Story = {
  args: {
    ...meta.args,
    size: Small,
  },
}

export const MiddleSize: Story = {
  args: {
    ...meta.args,
    size: Middle,
  },
}

export const LargeSize: Story = {
  args: {
    ...meta.args,
    size: Large,
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

export const WithIconLeft: Story = {
  args: {
    ...meta.args,
    icon,
    iconPosition: Left,
  },
}

export const WithIconRight: Story = {
  args: {
    ...meta.args,
    icon,
    iconPosition: Right,
  },
}
