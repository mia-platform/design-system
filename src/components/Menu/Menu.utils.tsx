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

import { MenuProps } from 'antd'

import { Hierarchy, ItemTypes } from './Menu.types'

const { Primary } = Hierarchy
// const { Category, Divider, Group } = ItemType

/**
 * Formats menu items to ensure optimal display.
 *
 * @param {items} items - Menu items to format.
 * @param {string} selectedItem - The currently selected menu item.
 * @param {boolean} isCollapsed - Whether the menu is collapsed.
 * @param {Hierarchy} hierarchy - Whether the menu is primary.
 *
 * @returns {AntItemType[]} array of formatted menu items.
 */
function formatLabels(
  items: MenuProps['items'] = [],
  selectedItem?: string,
  isCollapsed?: boolean,
  hierarchy?: Hierarchy
): MenuProps['items'] {
  return items.flatMap((item) => {
    if (item?.type === ItemTypes.Category && isCollapsed) {
      return formatLabels(item?.children, selectedItem, isCollapsed, hierarchy) || []
    }

    return [{
      ...item,
      ...item?.type === ItemTypes.Item && {
        icon: item?.icon && <div>{item?.icon}</div>,
      },
      ...item?.type === ItemTypes.Category && {
        label: `${item?.label}`?.toUpperCase(),
        // title: `${item?.title}`?.toUpperCase(),
      },
      ...item?.type === ItemTypes.Divider && {
        type: item?.type,
      },
      ...selectedItem === item?.key && hierarchy === Primary && {
        style: { boxShadow: '0px 1px 4px -1px rgba(0, 0, 0, 0.12)' },
      },
      ...item?.type === ItemTypes.SubMenu && {
        key: item?.key,
        children: formatLabels(item.children, selectedItem, isCollapsed, hierarchy) || [],
      },
    }]
  })
}

export default formatLabels
