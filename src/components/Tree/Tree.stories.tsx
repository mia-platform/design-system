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
import { TreeDataNode } from 'antd'

import { Icon } from '../Icon'
import { Tree } from '.'
import { defaults } from './Tree'

const icon = <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="PiFile" size={16} /></div>

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <Icon name="PiFile" size={16} />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <Icon name="PiFile" size={16} />,
          },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <Icon name="PiFile" size={16} />,
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            icon: <Icon name="PiFile" size={16} />,
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <Icon name="PiFile" size={16} />,
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
            icon: <Icon name="PiFile" size={16} />,
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <Icon name="PiFile" size={16} />,
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
            icon: <Icon name="PiFile" size={16} />,
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <Icon name="PiFile" size={16} />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <Icon name="PiFile" size={16} />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <Icon name="PiFile" size={16} />,
        children: [
          {
            title: 'leaf',
            key: '0-1-0-0',
            icon: <Icon name="PiFile" size={16} />,
          },
          {
            title: 'leaf',
            key: '0-1-0-1',
            icon: <Icon name="PiFile" size={16} />,
          },
        ],
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
  args: { ...meta.args, showIcon: true },
}

export const TreeWithCheckboxes: Story = {
  args: {
    ...meta.args,
    checkable: true,
    // eslint-disable-next-line no-console
    onCheck: (checkedItems, event) => console.log({ selectedItems: checkedItems, event }),
  },
}
