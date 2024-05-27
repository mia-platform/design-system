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
        onClick: action('click'),
        label: 'first',
      },
      {
        icon,
        onClick: action('click'),
        label: 'second',
      },
      {
        label: 'third',
      },
      {
        icon,
        onClick: action('click'),
        label: 'fourth',
      },
    ],
  },
}

export const OneItemTitleOnly: Story = {
  args: {
    items: [{
      onClick: action('click'),
      label,
    }],
  },
}

export const OneItemIconAndTitle: Story = {
  args: {
    items: [{
      icon,
      onClick: action('click'),
      label,
    }],
  },
}

export const TwoItems: Story = {
  args: {
    items: [
      {
        icon,
        onClick: action('click'),
        label: 'first',
      },
      {
        icon,
        onClick: action('click'),
        label: 'second',
      },
    ],
  },
}

export const MultipleItemsWithMenu: Story = {
  args: {
    items: [
      {
        icon,
        onClick: action('click'),
        menu: {
          items: [{
            icon,
            onClick: action('click'),
            label: 'first nested',
          }],
        },
        label: 'first',
      },
      {
        icon,
        onClick: action('click'),
        menu: {
          items: [],
        },
        label: 'empty items',
      },
      {
        icon,
        onClick: action('click'),
        menu: {
          showSearch: true,
          items: [{
            icon,
            onClick: action('click'),
            label: 'first nested',
          },
          {
            icon,
            onClick: action('click'),
            label: 'second nested',
          }],
        },
        label: 'with search',
      },
      {
        menu: {
          items: [{
            icon,
            onClick: action('click'),
            label: 'first nested',
          },
          {
            icon,
            onClick: action('click'),
            label: 'second nested',
          }],
          searchAllowClear: false,
          searchPlaceholder: 'Search...',
        },
      },
      {
        menu: {
          activeKey: '2',
          items: [{
            key: '1',
            icon: <Icon color="black" name="PiAddressBook" size={16} />,
            label: 'first nested',
          },
          {
            key: '2',
            label: 'without search',
          },
          {
            key: '3',
            icon,
            onClick: action('click'),
            label: 'third nested',
          },
          {
            key: '4',
            icon: <Icon color="black" name="PiAddressBook" size={16} />,
            label: 'fourth nested',
          },
          {
            key: '5',
            icon,
            onClick: action('click'),
            label: 'fifth nested',
          },
          {
            key: '6',
            label: 'sixth nested',
          },
          {
            key: '7',
            label: 'seventh nested',
          },
          {
            key: '8',
            label: 'eighth nested',
          },
          {
            key: '9',
            label: 'ninth nested',
          },
          {
            key: '10',
            icon,
            onClick: action('click'),
            label: 'tenth nested',
          }],
        },
      },
    ],
  },
}
