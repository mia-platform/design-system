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
import classNames from 'classnames'

import { Hierarchy, Mode } from './Menu.types'
import defaultTheme, { primaryTheme } from './Menu.theme'
import { MenuProps } from './Menu.props'
import formatLabels from './Menu.utils'
import styles from './Menu.module.css'
import { useTheme } from '../../hooks/useTheme'

const { Default, Primary } = Hierarchy
const { Inline } = Mode
const { menu } = styles

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
  const isPrimary = hierarchy === Primary

  const theme = useTheme()
  const menuTheme = isPrimary ? primaryTheme(theme) : defaultTheme(theme)

  const menuClassNames = useMemo(() => classNames([
    menu,
    isPrimary && 'primary',
  ]), [isPrimary])

  const [selectedItem, setSelectedItem] = useState(defaultSelectedKey)

  const formattedItems = useMemo(() => (
    formatLabels(items, selectedKey || selectedItem, isCollapsed, hierarchy)
  ), [items, selectedKey, selectedItem, isCollapsed, hierarchy])

  return (
    <ConfigProvider theme={{ components: { Menu: menuTheme } }}>
      <Skeleton
        active
        loading={isLoading}
        paragraph={Menu.skeletonParagraph}
      >
        <AntMenu
          className={menuClassNames}
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKey ? [defaultSelectedKey] : undefined}
          // getPopupContainer is needed for nested menus to inherit CSS properties in the vertical mode
          getPopupContainer={() => document.querySelector(`.${menu}`)!}
          inlineCollapsed={isCollapsed}
          inlineIndent={0}
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

Menu.skeletonParagraph = {
  rows: 6,
  width: ['30%', '80%', '65%', '30%', '70%', '60%'],
}

Menu.defaultProps = {
  defaultOpenKeys: [],
  hierarchy: Default,
  isCollapsed: false,
  isLoading: false,
  items: [],
  mode: Inline,
}
