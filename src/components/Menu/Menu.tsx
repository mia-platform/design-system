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

import { Menu as AntMenu, ConfigProvider, Skeleton } from 'antd'
import { ReactElement, useMemo, useState } from 'react'
import classnames from 'classnames'

import { Hierarchies, Item, Modes } from './Menu.types'
import defaultTheme, { primaryTheme } from './Menu.theme'
import formatLabels from './Menu.utils'
import styles from './Menu.module.css'
import useTheme from '../../hooks/useTheme'

const { Default, Primary } = Hierarchies
const { Inline } = Modes
const { menu } = styles

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
   * - default: menu associated with general purpose navigation items;
   * - primary: menu associated with the most significant (and therefore primary) navigation items.
   */
  hierarchy?: Hierarchies,

  /**
   * Whether the menu is collapsed.
   */
  isCollapsed?: boolean

  /**
   * Whether the menu is in a loading state (if so, a skeleton is shown).
   */
  isLoading?: boolean

  /**
   * Menu items.
   */
  items?: Item[]

  /**
   * The mode in which sub-menu items are shown. Either:
   *
   * - inline: sub-menus open as popovers;
   * - vertical: sub-menus open as collapsible elements, expanding the menu downward.
   */
  mode?: Modes,

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

/**
 * UI component for presenting nested lists of elements, organized by group or category
 *
 * @link https://ant.design/components/menu
 * @returns {Menu} Menu component
 */
export const Menu = ({
  defaultOpenKeys,
  defaultSelectedKey,
  hierarchy,
  items,
  isCollapsed,
  isLoading,
  mode,
  onClick,
  onOpenChange,
  openKeys,
  selectedKey,
}: MenuProps): ReactElement => {
  const theme = useTheme()
  const menuTheme = hierarchy === Primary ? primaryTheme(theme) : defaultTheme(theme)

  const [selectedItem, setSelectedItem] = useState(defaultSelectedKey)

  const formattedItems = useMemo(() => (
    formatLabels(items, selectedKey || selectedItem, isCollapsed)
  ), [items, selectedKey, selectedItem, isCollapsed])

  return (
    <ConfigProvider theme={{ components: { Menu: menuTheme } }}>
      <Skeleton
        active
        loading={isLoading}
        paragraph={{ rows: 6, width: ['30%', '80%', '65%', '30%', '70%', '60%'] }}
      >
        <AntMenu
          className={classnames([menu])}
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKey ? [defaultSelectedKey] : undefined}
          inlineCollapsed={isCollapsed}
          inlineIndent={12}
          items={formattedItems}
          mode={mode}
          multiple={false}
          openKeys={openKeys}
          selectable
          selectedKeys={(selectedKey && [selectedKey]) || (selectedItem && [selectedItem]) || undefined}
          onClick={onClick}
          onOpenChange={onOpenChange}
          onSelect={({ key }) => setSelectedItem(key)}
        />
      </Skeleton>
    </ConfigProvider>
  )
}

Menu.defaultProps = {
  defaultOpenKeys: [],
  hierarchy: Default,
  isCollapsed: false,
  isLoading: false,
  items: [],
  mode: Inline,
}
