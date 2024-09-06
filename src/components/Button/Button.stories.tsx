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
import { PiArrowArcRight } from 'react-icons/pi'
import { action } from '@storybook/addon-actions'

import { Button } from '.'
import { Icon } from '../Icon'
import { defaults } from './Button'

const icon = <Icon component={PiArrowArcRight} size={16} />

const meta = {
  component: Button,
  args: {
    ...defaults,
    children: 'Button',
    onClick: action('click'),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryFilled: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Primary,
    type: Button.Type.Filled,
  },
}

export const PrimaryOutlined: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Primary,
    type: Button.Type.Outlined,
  },
}

export const PrimaryGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Primary,
    type: Button.Type.Ghost,
  },
}

export const NeutralOutlined: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Neutral,
    type: Button.Type.Outlined,
  },
}

export const NeutralGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Neutral,
    type: Button.Type.Ghost,
  },
}

export const DangerFilled: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Danger,
    type: Button.Type.Filled,
  },
}

export const DangerOutlined: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Danger,
    type: Button.Type.Outlined,
  },
}

export const DangerGhost: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Danger,
    type: Button.Type.Ghost,
  },
}

export const PrimaryLink: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Primary,
    type: Button.Type.Link,
  },
}

export const PrimaryLinkBold: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Primary,
    type: Button.Type.Link,
    children: <div style={{ fontWeight: 'var(--typography-bodySBold-fontWeight, 600)' }}>{'Button'}</div>,
  },
}

export const NeutralLink: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Neutral,
    type: Button.Type.Link,
  },
}

export const NeutralLinkBold: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Neutral,
    type: Button.Type.Link,
    children: <div style={{ fontWeight: 'var(--typography-bodySBold-fontWeight, 600)' }}>{'Button'}</div>,
  },
}

export const DangerLink: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Danger,
    type: Button.Type.Link,
  },
}

export const DangerLinkBold: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Danger,
    type: Button.Type.Link,
    children: <div style={{ fontWeight: 'var(--typography-bodySBold-fontWeight, 600)' }}>{'Button'}</div>,
  },
}

export const SquareShape: Story = {
  args: {
    ...meta.args,
    children: undefined,
    icon,
    shape: Button.Shape.Square,
  },
}

export const CircleShape: Story = {
  args: {
    ...meta.args,
    children: undefined,
    icon,
    shape: Button.Shape.Circle,
  },
}

export const Block: Story = {
  args: {
    ...meta.args,
    isBlock: true,
  },
}

export const SmallSize: Story = {
  args: {
    ...meta.args,
    size: Button.Size.Small,
  },
}

export const MiddleSize: Story = {
  args: {
    ...meta.args,
    size: Button.Size.Middle,
  },
}

export const LargeSize: Story = {
  args: {
    ...meta.args,
    size: Button.Size.Large,
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

export const IconOnly: Story = {
  args: {
    ...meta.args,
    children: undefined,
    icon,
  },
}

export const WithIconLeft: Story = {
  args: {
    ...meta.args,
    icon,
    iconPosition: Button.IconPosition.Left,
  },
}

export const WithIconRight: Story = {
  args: {
    ...meta.args,
    icon,
    iconPosition: Button.IconPosition.Right,
  },
}

export const NeutralWithIcon: Story = {
  args: {
    ...meta.args,
    hierarchy: Button.Hierarchy.Neutral,
    icon,
  },
}
