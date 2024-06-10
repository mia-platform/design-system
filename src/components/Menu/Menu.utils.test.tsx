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

import { MenuProps } from 'antd'

import { Hierarchy, ItemTypes } from './Menu.types'
import formatLabels from './Menu.utils'

type TestCaseType = Record<string, {
  params: {
    items?: MenuProps['items'],
    selectedItem?: string,
    isCollapsed?: boolean,
    hierarchy?: Hierarchy
  },
  expectedResult: unknown[]
}>

describe('Menu Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const testCases: TestCaseType = {
    'expect to return empty array': {
      params: {
        items: undefined,
        selectedItem: 'key',
        isCollapsed: false,
        hierarchy: Hierarchy.Default,
      },
      expectedResult: [],
    },
    'expect to return corretly items': {
      params: {
        items: [{
          label: 'menu-item',
          key: 'uniqueKey',
          title: 'title',
          icon: <div />,
        }],
        selectedItem: 'key',
        isCollapsed: false,
        hierarchy: Hierarchy.Default,
      },
      expectedResult: [{
        key: 'uniqueKey',
        label: 'menu-item',
        title: 'title',
        icon: <div><div /></div>,
      }],
    },
    'expect to return divider type': {
      params: {
        items: [{
          type: ItemTypes.Divider,
          key: 'divider',
        }],
      },
      expectedResult: [{
        type: ItemTypes.Divider,
        key: 'divider',
        icon: undefined,
        label: undefined,
      }],
    },
    'expect to return category type': {
      params: {
        items: [{
          type: ItemTypes.Category,
          label: 'category label',
          key: 'category',
        }],
      },
      expectedResult: [{
        key: 'category',
        children: [],
        type: 'group',
        label: 'CATEGORY LABEL',
      }],
    },
    'expect to return category type with children and collapse set to true': {
      params: {
        items: [{
          type: ItemTypes.Category,
          label: 'category label',
          key: 'category',
          children: [{
            key: 'uniqueKey',
            label: 'menu-item',
            icon: <div />,
          }],
        }],
        isCollapsed: true,
      },
      expectedResult: [{
        key: 'uniqueKey',
        label: 'menu-item',
        icon: <div><div /></div>,
      }],
    },
    'expect to return empty category type with children and collapse set to true': {
      params: {
        items: [{
          type: ItemTypes.Category,
          label: 'category label',
          key: 'category',
          children: [],
        }],
        isCollapsed: true,
      },
      expectedResult: [],
    },
    'expect to see styles for Primary item': {
      params: {
        items: [{ label: 'menu-item', key: 'uniqueKey', icon: <div /> }],
        selectedItem: 'uniqueKey',
        hierarchy: Hierarchy.Primary,
      },
      expectedResult: [{
        key: 'uniqueKey',
        label: 'menu-item',
        icon: <div><div /></div>,
        style: {
          boxShadow: '0px 1px 4px -1px rgba(0, 0, 0, 0.12)',
        },
      }],
    },
    'expect to see empty items': {
      params: { items: [] },
      expectedResult: [],
    },
  }

  Object.entries(testCases).forEach(([testName, { params, expectedResult }]) => {
    test(testName, () => {
      const { items, selectedItem, isCollapsed, hierarchy } = params
      const result = formatLabels(items, selectedItem, isCollapsed, hierarchy)
      expect(result).toEqual(expectedResult)
    })
  })
})
