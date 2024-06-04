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

import { } from '../../test-utils'
import { Hierarchy, Item, ItemType } from './Menu.types'
import formatLabels from './Menu.utils'

type TestCaseType = Record<string, {
  params: {
    items?: Item[],
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
        items: [{ label: 'menu-item', key: 'uniqueKey', icon: <div /> }],
        selectedItem: 'key',
        isCollapsed: false,
        hierarchy: Hierarchy.Default,
      },
      expectedResult: [{
        key: 'uniqueKey',
        label: 'menu-item',
        icon: <div><div /></div>,
      }],
    },
    'expect to return divider type': {
      params: {
        items: [{
          type: ItemType.Divider,
          key: 'divider',
        }],
      },
      expectedResult: [{
        type: ItemType.Divider,
        key: 'divider',
        icon: undefined,
        label: undefined,
      }],
    },
    'expect to return group type': {
      params: {
        items: [{
          type: ItemType.Group,
          key: 'group',
        }],
      },
      expectedResult: [{
        key: 'group',
        icon: undefined,
        label: undefined,
      }],
    },
    'expect to return category type': {
      params: {
        items: [{
          type: ItemType.Category,
          label: 'category label',
          key: 'category',
          title: 'title',
        }],
      },
      expectedResult: [{
        key: 'category',
        icon: undefined,
        type: 'group',
        label: 'CATEGORY LABEL',
        title: 'TITLE',
      }],
    },
    'expect to return category type with children and collapse set to true': {
      params: {
        items: [{
          type: ItemType.Category,
          label: 'category label',
          key: 'category',
          title: 'title',
          children: [{
            key: 'uniqueKey',
            label: 'menu-item',
            icon: <div><div /></div>,
          }],
        }],
        isCollapsed: true,
      },
      expectedResult: [{
        key: 'uniqueKey',
        label: 'menu-item',
        // TOFIX: this is a possible bug
        icon: <div><div><div /></div></div>,
      }],
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
  }

  Object.entries(testCases).forEach(([testName, { params, expectedResult }]) => {
    test(testName, () => {
      const { items, selectedItem, isCollapsed, hierarchy } = params
      const result = formatLabels(items, selectedItem, isCollapsed, hierarchy)
      expect(result).toEqual(expectedResult)
    })
  })
})
