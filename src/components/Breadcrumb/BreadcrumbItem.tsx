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
import { Dropdown, Input } from 'antd'
import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'

import { BreadcrumbItemProps } from './Breadcrumb.props'
import { Icon } from '../Icon'
import styles from './Breadcrumb.module.css'
import { useTheme } from '../../hooks/useTheme'


const {
  breadcrumbItemLabelStyle,
  breadcrumbMenuIcon,
  breadcrumbItemWrapper,
  caretOnly,
  dropdownMenuContainer,
  dropdownMenuSearch,
  dropdownMenuStyle,
  last,
  initial,
  withMenu,
} = styles

export const BreadcrumbItem = ({
  icon,
  index,
  itemsLength,
  label,
  menu,
  onClick,
}: BreadcrumbItemProps): ReactElement => {
  const { palette } = useTheme()

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isInitialItem = useMemo(() => index === 0, [index])
  const isLastItem = useMemo(() => index === (itemsLength - 1), [index, itemsLength])

  const hasSeparator = useMemo(() => itemsLength > 1 && !isLastItem, [isLastItem, itemsLength])
  const hasMenu = useMemo(() => menu && Object.values(menu?.items ?? {}).length > 0, [menu])

  const breadcrumbItemWrapperClassNames = useMemo(() => classNames(
    [
      breadcrumbItemWrapper,
      isInitialItem && initial,
      isLastItem && last,
      hasMenu && withMenu,
    ]
  ), [hasMenu, isInitialItem, isLastItem])

  const breadcrumbItemLabelClassNames = useMemo(() => classNames([breadcrumbItemLabelStyle]), [])

  const itemLabel = useMemo(() => label
    ?? (menu?.activeKey && Object.values(menu?.items ?? {}).find(({ key }) => key === menu.activeKey)?.label)
      ?? menu?.placeholder
  , [label, menu])

  const itemIcon = useMemo(() => icon
   ?? (menu?.activeKey && Object.values(menu?.items ?? {}).find(({ key }) => key === menu.activeKey)?.icon)
  , [icon, menu])

  const hasLabel = itemIcon || itemLabel

  const breadcrumbItemMenuClassNames = useMemo(() => classNames([
    breadcrumbMenuIcon,
    !hasLabel && caretOnly,
  ]), [hasLabel])

  const menuIcon = useMemo(() => (
    <Icon color={palette?.common?.grey?.[600]} name="AiOutlineCaretDown" size={16} />
  ), [palette?.common?.grey])

  const separatorIcon = useMemo(() => (
    <Icon color={palette?.common?.grey?.[600]} name="PiCaretRight" size={16} />
  ), [palette?.common?.grey])

  const breadcrumbItemLabel = useMemo(() => (
    <div className={breadcrumbItemLabelClassNames} onClick={onClick}>
      {itemIcon}
      {itemLabel}
    </div>
  ), [breadcrumbItemLabelClassNames, itemIcon, itemLabel, onClick])

  const itemMenu = useMemo(() => {
    const items = Object.values(menu?.items ?? {})
      .reduce<ItemType[]>((acc, itemData, currentIndex) => {
        return [
          ...acc,
          {
            key: itemData.key ?? `breadcrumb-menu-item-${currentIndex}`,
            label: itemData.label,
          },
        ]
      }, [])

    return {
      items,
      onClick: () => {
        setDropdownOpen(false)
      },
      selectedKeys: menu?.activeKey ? [menu.activeKey] : [],
    }
  }, [menu])


  const dropdown = useCallback((dropdownMenu: ReactNode) => (
    <div className={dropdownMenuContainer}>
      <div className={dropdownMenuSearch}>
        <Input.Search
          allowClear
          autoFocus
        />
      </div>
      <div className={dropdownMenuStyle}>
        {React.cloneElement(dropdownMenu as React.ReactElement, { style: { borderRadius: '0px', boxShadow: 'none' } })}
      </div>
    </div>
  ), [])

  const breadcrumbItemMenu = useMemo(() => (
    <Dropdown
      destroyPopupOnHide
      dropdownRender={dropdown}
      getPopupContainer={(trigger) => trigger}
      menu={itemMenu}
      open={dropdownOpen}
      placement={'bottomLeft'}
      trigger={['click']}
      onOpenChange={setDropdownOpen}
    >
      <div className={breadcrumbItemMenuClassNames}>
        {menuIcon}
      </div>
    </Dropdown>
  ), [dropdown, itemMenu, dropdownOpen, breadcrumbItemMenuClassNames, menuIcon])

  return (
    <>
      <div className={breadcrumbItemWrapperClassNames}>
        {hasLabel && breadcrumbItemLabel}
        {hasMenu && breadcrumbItemMenu}
      </div>
      {hasSeparator && separatorIcon}
    </>
  )
}
