/**
 * Copyright 2024 Mia srl
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

import { Button } from '../Button'
import { Dropdown } from '.'
import { DropdownProps } from './props'
import { Tag } from '../Tag'

const defaults: Partial<DropdownProps> = {
  items: [{
    id: 'id1',
    label: 'value 1',
  }, {
    id: 'id2',
    label: 'value 2',
    secondaryLabel: 'Some additional info 2',
  }, {
    id: 'id3',
    label: 'I am danger!',
    danger: true,
    secondaryLabel: 'Some additional info 3',
  }, {
    id: 'id4-with-nested-items',
    label: 'Many Items here',
    secondaryLabel: 'just hover me',
    children: [{
      id: 'id4-c1',
      label: 'value 4.1',
    }, {
      id: 'id4-c2',
      label: 'value 4.2',
      children: [{
        id: 'id4-c2-c1',
        label: 'value 4.2-1',
      }],
    }],
  }, {
    id: 'id5-with-tag',
    label: 'with tag',
    secondaryLabel: 'Some additional info 2',
    tag: <Tag>{'Tag'}</Tag>,
  }],
  children: <Button >{'click me'}</Button>,
  onClick: action('on click'),
  onOpenChange: action('on open change'),
}

const meta = {
  component: Dropdown,
  args: defaults,
  argTypes: {
    children: { control: false },
  },
  render: (_, { args }) => <Dropdown {...args} />,
} satisfies Meta<typeof Dropdown>

type Story = StoryObj<typeof meta>

export default meta

export const BasicExample: Story = {}

export const VerticalLayout: Story = {
  args: {
    itemLayout: Dropdown.ItemLayout.Vertical,
  },
}

export const HighlightSelection: Story = {
  args: {
    initialSelectedItems: ['id1'],
  },
}

export const MultipleHighlightSelection: Story = {
  args: {
    initialSelectedItems: [],
    multiple: true,
  },
}

export const MultipleHighlightSelectionWithVerticalLayout: Story = {
  args: {
    initialSelectedItems: [],
    itemLayout: Dropdown.ItemLayout.Vertical,
    multiple: true,
  },
}

export const HoverTrigger: Story = {
  args: {
    triggers: [Dropdown.Trigger.Hover],
  },
}

export const ContextMenuTrigger: Story = {
  args: {
    children: <span>{'right-click on me'}</span>,
    triggers: [Dropdown.Trigger.ContextMenu],
  },
}

export const WithCustomFooter: Story = {
  args: {
    footer: (<div>{'This is a custom footer'}</div>),
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const SelectionIsNotPersisted: Story = {
  args: {
    persistSelection: false,
  },
}
