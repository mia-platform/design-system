import { Menu as AntMenu, MenuProps as AntMenuProps } from 'antd'
import { ReactElement } from 'react'
import classnames from 'classnames'

import styles from './Menu.module.css'

const { menu, colored, transparent } = styles

const colorTypes = {
  colored,
  transparent,
}

type MenuProps = {

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
   * @remarks vertical menu opens sub-menus as collapsibles
   * @remarks inline menu opens sub-menus as popovers
   */
  mode?: 'inline' | 'vertical'

  /**
   * The default open menus
   */
  openKeys?: string[]

  /**
   * The default selected key
   */
  selectedKey?: string

  /**
   * Whether the menu is transparent
   */
  type?: 'colored' | 'transparent'
}

/**
 * Primary interaction UI component
 * @returns {Menu} Menu component
 */
export const Menu = ({
  defaultOpenKeys,
  defaultSelectedKey,
  items,
  isCollapsed,
  mode,
  openKeys,
  selectedKey,
  type,
}: MenuProps): ReactElement => {
  return (
    <AntMenu
      className={classnames([menu, colorTypes[type!]])}
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKey ? [defaultSelectedKey] : undefined}
      inlineCollapsed={isCollapsed}
      inlineIndent={12}
      items={items}
      mode={mode}
      multiple={false}
      openKeys={openKeys}
      selectedKeys={selectedKey ? [selectedKey] : undefined}
    />
  )
}

Menu.defaultProps = {
  defaultOpenKeys: [],
  defaultSelectedKey: undefined,
  isCollapsed: false,
  items: [],
  mode: 'inline' as const,
  openKeys: undefined,
  selectedKey: undefined,
  type: 'color' as const,
}
