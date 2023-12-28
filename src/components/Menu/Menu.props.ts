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

import { Hierarchy, Item, Mode } from './Menu.types'

export type MenuProps = {

  /**
   * Array with the keys of initially opened sub-menus.
   */
  defaultOpenKeys?: string[]

  /**
   * Key of the initially selected menu item.
   */
  defaultSelectedKey?: string

  /**
   * Defines the menu hierarchy. Either:
   *
   * - "default": menu associated with general purpose navigation items;
   * - "primary": menu associated with the most significant (and therefore primary) navigation items.
   */
  hierarchy?: Hierarchy,

  /**
   * Whether the menu is collapsed.
   */
  isCollapsed?: boolean

  /**
   * Whether the menu is in a loading state (if so, a skeleton is shown).
   */
  isLoading?: boolean

  /**
   * Menu items. Either one of the following:
   *
   * - item `object`:
   *    - key: The unique key of the item <br> `React.Key`
   *    - label: The display label of the item <br> `ReactNode`
   *    - title: The display title of the collapsed item <br> `string`
   *    - icon: The icon associated with the item <br> `ReactNode`
   *
   * - category `object`:
   *    - key: The unique key of the category <br> `React.Key`
   *    - label: The display label of the category <br> `ReactNode`
   *    - type: The type of the category <br> `"category"`
   *    - children: The children items within the category <br> `Item[]`
   *
   * - group `object`:
   *    - key: The unique key of the group <br> `React.Key`
   *    - label: The display label of the group <br> `ReactNode`
   *    - icon: The icon associated with the group <br> `ReactNode`
   *    - children: The children items within the group <br> `Item[]`
   *
   * - divider `object`:
   *    - key: The unique key of the divider <br> `React.Key`
   *    - type: The type of the divider <br> `"divider"`
   *    - dashed: Indicates whether the divider is dashed <br> `boolean`
   */
  items?: Item[]

  /**
   * The mode in which sub-menu items are shown. Either:
   *
   * - "inline": sub-menus open as popovers;
   * - "vertical": sub-menus open as collapsible elements, expanding the menu downward.
   */
  mode?: Mode,

  /**
   * Called when a menu item is clicked.
   */
  onClick?: () => void

  /**
   * Called when sub-menus are opened or closed.
   */
  onOpenChange?: () => void

  /**
   * Array with the keys of opened sub-menus.
   */
  openKeys?: string[]

  /**
   * Key of the selected menu item.
   */
  selectedKey?: string
}
