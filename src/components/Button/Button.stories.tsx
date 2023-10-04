/**
 * Copyright 2023 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ButtonHierarchies, ButtonIconPositions, ButtonShapes, ButtonSizes, ButtonTypes } from './Button.types'
import { Button } from '.'
import { Icon } from '../Icon'

const { Primary, Neutral, Danger } = ButtonHierarchies
const { Left, Right } = ButtonIconPositions
const { Square, Circle } = ButtonShapes
const { Small, Middle, Large } = ButtonSizes
const { Filled, Outlined, Ghost } = ButtonTypes

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
    type: Outlined,
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
    type: Outlined,
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
    type: Outlined,
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
