import { Menu as AntMenu, MenuProps as AntMenuProps } from 'antd'
import { ReactElement, useMemo } from 'react'
import classnames from 'classnames'

import capitalizeGroupLabels from './Menu.utils'
import styles from './Menu.module.css'

const { menu } = styles

export type MenuProps = {

  /**
   * The menu groups initially open
   */
  defaultOpenKeys?: string[]

  /**
   * The menu item initially selected
   */
  defaultSelectedKey?: string

  /**
   * Whether the menu is collapsed
   */
  isCollapsed?: boolean

  /**
   * Menu items
   */
  items?: AntMenuProps['items']

  /**
   * The type of the menu
   *
   * vertical: sub-menus open as collapsibles;
   * inline: sub-menus open as popovers;
   */
  mode?: 'inline' | 'vertical'

  /**
   * Called when a menu item is clicked
   */
  onClick?: () => void

  /**
   * Called when sub-menus are opened or closed
   */
  onOpenChange?: () => void

  /**
   * The default open menus
   */
  openKeys?: string[]

  /**
   * The default selected key
   */
  selectedKey?: string
}

/**
 * UI component for presenting nested lists of elements, organized by group or category
 *
 * @returns {Menu} Menu component
 */
export const Menu = ({
  defaultOpenKeys,
  defaultSelectedKey,
  items,
  isCollapsed,
  mode,
  onClick,
  onOpenChange,
  openKeys,
  selectedKey,
}: MenuProps): ReactElement => {

  const formattedItems = useMemo(() => capitalizeGroupLabels(items), [items])

  return (
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
      selectedKeys={selectedKey ? [selectedKey] : undefined}
      onClick={onClick}
      onOpenChange={onOpenChange}
    />
  )
}

Menu.defaultProps = {
  defaultOpenKeys: [],
  defaultSelectedKey: undefined,
  isCollapsed: false,
  items: [],
  mode: 'inline' as const,
  onClick: () => undefined,
  onOpenChange: () => undefined,
  openKeys: undefined,
  selectedKey: undefined,
}
