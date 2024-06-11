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

const getPopupContainer: BreadcrumbProps['getPopupContainer'] = (containerNode) => containerNode.parentElement ?? containerNode

export const withoutMenuProps: BreadcrumbProps = {
  items: [
    { onClick: action('click'), label: 'Text only' },
    { onClick: action('click'), icon: breadcrumbIcon },
    { onClick: action('click'), label: 'Text & icon', icon: breadcrumbIcon },
    { onClick: action('click'), label: 'Very long text that should be ellipsed at some point' },
    { label: 'Not clickable' },
    { onClick: action('click'), label: 'Last item' },
  ],
}

export const withMenuProps: BreadcrumbProps = {
  items: [
    {
      onClick: action('click'),
      icon: breadcrumbIcon,
      label: 'Clickable button',
      menu: {
        items: [
          { key: 'sibling-1', label: 'Sibling 1', icon: breadcrumbIcon },
          { key: 'sibling-2', label: 'Sibling 2' },
          { key: 'sibling-3', label: 'Sibling 3 with a very long text that should be ellipsed at some point' },
        ],
        onDropdownVisibleChange: action('dropdown open'),
        onClick: action('click'),
      },
    },
    {
      icon: breadcrumbIcon,
      label: 'Not clickable button',
      menu: {
        items: [
          { key: 'sibling-1', label: 'Sibling 1', icon: breadcrumbIcon },
          { key: 'sibling-2', label: 'Sibling 2' },
        ],
        onDropdownVisibleChange: action('dropdown open'),
        onClick: action('click'),
      },
    },
    {
      label: 'With search',
      menu: {
        items: [
          { key: 'orders', label: 'Orders', icon: breadcrumbIcon },
          { key: 'shipping', label: 'Shipping', icon: breadcrumbIcon },
          { key: 'refunds', label: 'Refunds', icon: breadcrumbIcon },
          { key: 'packaging', label: 'Packaging', icon: breadcrumbIcon },
        ],
        onDropdownVisibleChange: action('dropdown open'),
        onClick: action('click'),
        search: { allowClear: true },
      },
    },
    {
      menu: {
        activeKey: 'sibling-1',
        items: [
          { key: 'sibling-1', label: 'Sibling 1', icon: breadcrumbIcon },
          { key: 'sibling-2', label: 'Sibling 2' },
        ],
        onDropdownVisibleChange: action('dropdown open'),
        onClick: action('click'),
      },
    },
  ],
  getPopupContainer,
}

export const uncontrolledProps: BreadcrumbProps = {
  items: [
    {
      label: 'Fallback label',
      menu: {
        onClick: action('click'),
        items: [
          { key: 'orders', label: 'Orders', icon: breadcrumbIcon },
          { key: 'shipping', label: 'Shipping', icon: breadcrumbIcon },
          { key: 'refunds', label: 'Refunds', icon: breadcrumbIcon },
          { key: 'packaging', label: 'Packaging', icon: breadcrumbIcon },
        ],
        search: true,
      },
    },
  ],
  getPopupContainer,
}

export const controlledProps: BreadcrumbProps = {
  items: [
    {
      label: 'Fallback label',
      menu: {
        activeKey: 'orders',
        items: [
          { key: 'orders', label: 'Orders', icon: breadcrumbIcon },
          { key: 'shipping', label: 'Shipping', icon: breadcrumbIcon },
          { key: 'refunds', label: 'Refunds', icon: breadcrumbIcon },
          { key: 'packaging', label: 'Packaging', icon: breadcrumbIcon },
        ],
        onClick: action('click'),
        open: true,
        onDropdownVisibleChange: action('dropdown open'),
        search: {
          onChange: action('search'),
        },
      },
    },
  ],
  getPopupContainer,
}

export const loadingProps: BreadcrumbProps = {
  isLoading: true,
  items: [
    { onClick: action('click'), label: 'Text' },
    { onClick: action('click'), label: 'Text' },
    { onClick: action('click'), label: 'Text' },
  ],
}

export const collapsedProps: BreadcrumbProps = {
  items: [
    { onClick: action('click'), label: 'Text 1' },
    { onClick: action('click'), icon: breadcrumbIcon, label: 'Text 2' },
    {
      icon: breadcrumbIcon,
      label: 'Text 3',
      menu: { items: [], onDropdownVisibleChange: action('dropdown open') },
    },
    {
      onClick: action('click'),
      label: 'Text 4',
      menu: { items: [], onDropdownVisibleChange: action('dropdown open') },
    },
    { label: 'Text 5' },
    { label: 'Text 6' },
    { label: 'Text 7' },
  ],
  getPopupContainer: (containerNode) => containerNode.parentElement?.parentElement ?? containerNode,
}
