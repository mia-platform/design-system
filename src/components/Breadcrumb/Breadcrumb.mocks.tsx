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

import { action } from '@storybook/addon-actions'

import { BreadcrumbProps } from './Breadcrumb.props'
import { Icon } from '../Icon'

export const breadcrumbIcon = <Icon color="black" name="PiCircleHalfTiltLight" size={16} />
export const breadcrumbLabel = 'Text'

export const oneItemTitleOnlyProps: BreadcrumbProps = {
  items: [{
    onClick: action('click'),
    label: breadcrumbLabel,
  }],
}

export const oneItemIconAndTitleProps: BreadcrumbProps = {
  items: [{
    icon: breadcrumbIcon,
    onClick: action('click'),
    label: breadcrumbLabel,
  }],
}

export const twoItemsProps: BreadcrumbProps = {
  items: [
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      label: 'first',
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      label: 'second',
    },
  ],
}

export const multipleItemsProps: BreadcrumbProps = {
  items: [
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      label: 'first',
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      label: 'second',
    },
    {
      label: 'third',
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      label: 'fourth',
    },
  ],
}

export const multipleItemsLoadingProps: BreadcrumbProps = {
  ...multipleItemsProps,
  isLoading: true,
}

export const multipleItemsWithMenuProps: BreadcrumbProps = {
  items: [
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      menu: {
        items: [{
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'first nested',
        }],
      },
      label: 'first',
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      menu: {
        items: [],
      },
      label: 'empty items',
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      menu: {
        showSearch: true,
        items: [{
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'first nested',
        },
        {
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'second nested',
        }],
      },
      label: 'with search',
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      menu: {
        showSearch: true,
        onChangeSearch: action('search'),
        items: [{
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'first nested',
        },
        {
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'second nested',
        }],
      },
      label: 'with controlled search',
    },
    {
      menu: {
        items: [{
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'first nested',
        },
        {
          icon: breadcrumbIcon,
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
          icon: breadcrumbIcon,
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
          icon: breadcrumbIcon,
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
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'tenth nested',
        }],
      },
    },
  ],
}

export const multipleItemsWithEllipsisProps: BreadcrumbProps = {
  items: [
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      menu: {
        items: [{
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'first nested',
        }],
      },
      label: 'first',
    },
    {
      onClick: action('click'),
      label: 'second',
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
          label: 'selected',
        }],
      },
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      menu: {
        items: [],
      },
      label: 'empty items',
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      label: 'third',
    },
    {
      icon: breadcrumbIcon,
      onClick: action('click'),
      menu: {
        showSearch: true,
        items: [{
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'first nested',
        },
        {
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'second nested',
        }],
      },
      label: 'with search',
    },
    {
      onClick: action('click'),
      label: 'fourth',
    },
    {
      menu: {
        items: [{
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'first nested',
        },
        {
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'second nested',
        }],
        searchAllowClear: false,
        searchPlaceholder: 'Search...',
      },
    },
    {
      onClick: action('click'),
      label: 'fifth',
    },
    {
      onClick: action('click'),
      label: 'sixth',
    },
    {
      onClick: action('click'),
      label: 'seventh',
    },
    {
      onClick: action('click'),
      label: 'eighth',
    },
    {
      onClick: action('click'),
      label: 'nineth',
    },
    {
      onClick: action('click'),
      label: 'tenth',
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
          icon: breadcrumbIcon,
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
          icon: breadcrumbIcon,
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
          icon: breadcrumbIcon,
          onClick: action('click'),
          label: 'tenth nested',
        }],
      },
    },
  ],
}
