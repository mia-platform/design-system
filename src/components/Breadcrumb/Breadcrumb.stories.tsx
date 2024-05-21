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

import { Breadcrumb } from './Breadcrumb'
import { Icon } from '../Icon'

const icon = <Icon color="black" name="PiCircleHalfTiltLight" size={16} />
const label = 'Text'

const meta = {
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        icon,
        label: 'first',
      },
      {
        icon,
        label: 'second',
      },
      {
        label: 'third',
      },
      {
        icon,
        label: 'fourth',
      },
    ],
  },
}

export const OneItemTitleOnly: Story = {
  args: {
    items: [{
      label,
    }],
  },
}

export const OneItemIconAndTitle: Story = {
  args: {
    items: [{
      icon,
      label,
    }],
  },
}

export const TwoItems: Story = {
  args: {
    items: [
      {
        icon,
        label: 'first',
      },
      {
        icon,
        label: 'second',
      },
    ],
  },
}

export const MultipleItems: Story = {
  args: {
    items: [
      {
        icon,
        label: 'first',
      },
      {
        icon,
        label: 'second',
      },
      {
        label: 'third',
      },
      {
        icon,
        label: 'fourth',
      },
    ],
  },
}

export const MultipleItemsWithMenu: Story = {
  args: {
    items: [
      {
        icon,
        menu: {
          items: [],
        },
        label: 'first',
      },
      {
        icon,
        menu: {
          items: [{
            icon,
            label: 'first nested',
          }],
        },
        label: 'second',
      },
      {
        menu: {
          items: [{
            icon,
            label: 'first nested',
          },
          {
            icon,
            label: 'second nested',
          },
          {
            icon,
            label: 'third nested',
          }],
        },
      },
      {
        menu: {
          activeKey: '1',
          items: [{
            key: '1',
            icon,
            label: 'first nested',
          },
          {
            key: '2',
            icon,
            label: 'second nested',
          },
          {
            key: '3',
            icon,
            label: 'third nested',
          }],
        },
      },
    ],
  },
}
