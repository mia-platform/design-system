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

import { AntdMenuItemType, Hierarchy, Item, ItemType } from './Menu.types'

const { Primary } = Hierarchy
const { Category, Divider, Group } = ItemType

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
  items: Item[] = [],
  selectedItem?: string,
  isCollapsed?: boolean,
  hierarchy?: Hierarchy
): AntdMenuItemType[] {
  return items.map(({ title, label, type, key, children, icon, ...item }) => {
    if (type === Category && isCollapsed) {
      return formatLabels(children, selectedItem, isCollapsed, hierarchy)
    }

    return {
      ...item,
      label,
      key,
      icon: icon && <div>{icon}</div>,
      ...type === Category && {
        type: 'group',
        label: typeof label === 'string' && label?.toUpperCase(),
        title: title?.toUpperCase(),
      },
      ...type === Divider && { type },
      ...type === Group && {},
      ...selectedItem === key && hierarchy === Primary && {
        style: {
          boxShadow: '0px 1px 4px -1px rgba(0, 0, 0, 0.12)',
        },
      },
      ...children && Array.isArray(children) && children.length > 0 && {
        children: formatLabels(children, selectedItem, isCollapsed, hierarchy),
      },
    }
  }).flat()
}

export default formatLabels
