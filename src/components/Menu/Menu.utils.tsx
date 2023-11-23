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

import { ItemType } from 'antd/es/menu/hooks/useItems'

import { Item, MenuItemType } from './Menu.types'

const { Category } = MenuItemType

/**
 * Formats menu items to ensure optimal display.
 *
 * @param {items} items - Menu items to format.
 * @param {selectedItem} selectedItem - The currently selected menu item.
 * @param {isCollapsed} isCollapsed - Whether the menu is collapsed.
 *
 * @returns {ItemType[]} array of formatted menu items.
 */
function formatLabels(
  items: Item[] = [],
  selectedItem?: string,
  isCollapsed?: boolean,
): ItemType[] {
  return items.map(({ title, label, type, key, children, icon, ...item }) => {
    if (type === Category && isCollapsed) {
      return formatLabels(children, selectedItem, isCollapsed)
    }

    return {
      ...item,
      label,
      title,
      key,
      type,
      icon: icon && <div>{icon}</div>,
      ...type === Category && {
        type: 'group',
        label: typeof label === 'string' && label?.toUpperCase(),
        title: title?.toUpperCase(),
      },
      ...selectedItem === key && {
        style: {
          boxShadow: '0px 1px 4px -1px rgba(0, 0, 0, 0.12)',
        },
      },
      ...children && Array.isArray(children) && {
        children: formatLabels(children, selectedItem, isCollapsed),
      },
    }
  }).flat()
}

export default formatLabels
