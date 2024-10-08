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
import { PiArrowDown, PiArrowLeft, PiArrowRight, PiArrowUp, PiArrowUpFill, PiCaretDown, PiCaretLeft, PiCaretRight, PiCaretUp, PiCaretUpFill } from 'react-icons/pi'
import { TreeDataNode } from 'antd'

import { Icon } from '../Icon'
import { Tree } from '.'
import { defaults } from './Tree'

const treeData: TreeDataNode[] = [
  {
    title: 'Fruits',
    key: 'fruits',
    children: [
      {
        title: 'Favorites',
        key: 'favorites',
        children: [
          {
            title: 'Apple',
            key: 'apple',
          },
          {
            title: 'Banana',
            key: 'banana',
          },
          {
            title: 'Peach',
            key: 'peach',
          },
        ],
      },
      {
        title: 'Others',
        key: 'others',
        children: [
          {
            title: 'Strawberry',
            key: 'strawberry',
          },
          {
            title: 'Pineapple',
            key: 'pineapple',
          },
          {
            title: 'Fig',
            key: 'fig',
          },
        ],
      },
    ],
  },
  {
    title: 'Vegetables',
    key: 'vegetables',
    children: [
      {
        title: 'Spinach',
        key: 'spinach',
      },
      {
        title: 'Leek',
        key: 'leek',
      },
    ],
  },
]

const meta = {
  args: {
    ...defaults,
    treeData,
    // eslint-disable-next-line no-console
    onSelect: (selectedItems, event) => console.log({ selectedItems, event }),
  },
  component: Tree,
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultTree: Story = {
  args: { ...meta.args },
}

export const TreeWithoutLines: Story = {
  args: { ...meta.args, showLine: false },
}

export const TreeWithIcons: Story = {
  args: {
    ...meta.args,
    showIcon: true,
    treeData: [
      {
        title: 'Arrows',
        key: 'arrow',
        icon: <Icon component={PiArrowUpFill} size={16} />,
        children: [
          {
            title: 'Up',
            key: 'arrow-up',
            icon: <Icon component={PiArrowUp} size={16} />,
          },
          {
            title: 'Left',
            key: 'arrow-left',
            icon: <Icon component={PiArrowLeft} size={16} />,
          },
          {
            title: 'Down',
            key: 'arrow-down',
            icon: <Icon component={PiArrowDown} size={16} />,
          },
          {
            title: 'Right',
            key: 'arrow-right',
            icon: <Icon component={PiArrowRight} size={16} />,
          },
        ],
      },
      {
        title: 'Carets',
        key: 'caret',
        icon: <Icon component={PiCaretUpFill} size={16} />,
        children: [
          {
            title: 'Up',
            key: 'caret-up',
            icon: <Icon component={PiCaretUp} size={16} />,
          },
          {
            title: 'Left',
            key: 'caret-left',
            icon: <Icon component={PiCaretLeft} size={16} />,
          },
          {
            title: 'Down',
            key: 'caret-down',
            icon: <Icon component={PiCaretDown} size={16} />,
          },
          {
            title: 'Right',
            key: 'caret-right',
            icon: <Icon component={PiCaretRight} size={16} />,
          },
        ],
      },
    ],
  },
}

export const TreeWithCheckboxesAndNotSelectable: Story = {
  args: {
    ...meta.args,
    checkable: true,
    selectable: false,
    // eslint-disable-next-line no-console
    onCheck: (checkedItems, event) => console.log({ checkedItems, event }),
  },
}

export const ControlledTreeWithCheckboxes: Story = {
  args: {
    ...meta.args,
    checkable: true,
    checkedKeys: ['apple'],
    // eslint-disable-next-line no-console
    onCheck: (checkedItems, event) => console.log({ checkedItems, event }),
  },
}

export const TreeWithLimitedHeight: Story = {
  args: {
    ...meta.args,
    height: 200,
  },
}

export const TreeWithVirtualScrolling: Story = {
  args: {
    ...meta.args,
    height: 200,
    virtual: true,
  },
}
