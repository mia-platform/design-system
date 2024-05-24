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

import { Hierarchy, Mode } from './Menu.types'
import { category, divider, group, item, nestedGroup } from './Menu.mocks'
import { Menu } from './'
import { defaults } from './Menu'

const meta = {
  component: Menu,
  args: {
    ...defaults,
    items: [
      item,
      divider,
      category,
      divider,
      group,
      divider,
      nestedGroup,
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
    mode: Mode.Vertical,
  },
  decorators: [Story => (
    <div style={{ width: '75%' }}>
      <Story />
    </div>
  )],
}

export const Collapsed: Story = {
  args: {
    ...meta.args,
    isCollapsed: true,
  },
}

export const Primary: Story = {
  args: {
    ...meta.args,
    hierarchy: Hierarchy.Primary,
  },
}

export const Loading: Story = {
  args: {
    ...meta.args,
    isLoading: true,
  },
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
