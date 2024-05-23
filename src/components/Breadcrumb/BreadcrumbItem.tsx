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

import { BodyL } from '../Typography/BodyX/BodyL'
import { BreadcrumbItemProps } from './Breadcrumb.props'
import { Icon } from '../Icon'
import styles from './Breadcrumb.module.css'
import { useTheme } from '../../hooks/useTheme'

const {
  breadcrumbItemLabelStyle,
  breadcrumbItemLabelWrapper,
  breadcrumbMenuIcon,
  breadcrumbItemWrapper,
  caretOnly,
  dropdownMenuContainer,
  dropdownMenuSearch,
  last,
  initial,
  withoutMenu,
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

  const breadcrumbItemWrapperClassNames = useMemo(() => classNames([breadcrumbItemWrapper]), [])

  const breadcrumbItemLabelWrapperClassNames = useMemo(() => classNames([
    breadcrumbItemLabelWrapper,
    isInitialItem && !hasMenu && initial,
    isLastItem && last,
    !hasMenu && withoutMenu,
  ]), [hasMenu, isInitialItem, isLastItem])

  const breadcrumbItemLabelStyleClassnames = useMemo(() => classNames([breadcrumbItemLabelStyle]), [])

  const itemLabel = useMemo(() =>
    (menu?.activeKey && Object.values(menu?.items ?? {}).find(({ key }) => key === menu.activeKey)?.label)
    ?? label
  , [label, menu])

  const itemIcon = useMemo(() =>
    (menu?.activeKey && Object.values(menu?.items ?? {}).find(({ key }) => key === menu.activeKey)?.icon)
    ?? icon
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
    <div className={breadcrumbItemLabelWrapperClassNames} onClick={onClick}>
      {itemIcon}
      <div className={breadcrumbItemLabelStyleClassnames}>
        <BodyL ellipsis={{ rows: 1, tooltip: itemLabel }}>{itemLabel}</BodyL>
      </div>
    </div>
  ), [breadcrumbItemLabelStyleClassnames, breadcrumbItemLabelWrapperClassNames, itemIcon, itemLabel, onClick])

  const itemMenu = useMemo(() => {
    const items = Object.values(menu?.items ?? {})
      .reduce<ItemType[]>((acc, itemData, currentIndex) => {
        return [
          ...acc,
          {
            key: itemData.key ?? `breadcrumb-menu-item-${currentIndex}`,
            icon: itemData.icon,
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
      {menu?.showSearch && <div className={dropdownMenuSearch}>
        <Input.Search
          allowClear={menu?.searchAllowClear ?? true}
          autoFocus
          placeholder={menu?.searchPlaceholder ?? ''}
          onSearch={menu?.onSearch}
        />
      </div>}
      {React.cloneElement(dropdownMenu as React.ReactElement, { style: { borderRadius: '0px', boxShadow: 'none' } })}
    </div>
  ), [menu?.onSearch, menu?.searchAllowClear, menu?.searchPlaceholder, menu?.showSearch])

  const breadcrumbItemMenu = useMemo(() => (
    <Dropdown
      destroyPopupOnHide
      dropdownRender={dropdown}
      getPopupContainer={(trigger) => trigger}
      menu={itemMenu}
      open={menu?.open !== undefined ? menu.open : dropdownOpen}
      placement={'bottomLeft'}
      trigger={['click']}
      onOpenChange={(open) => {
        if (menu?.open !== undefined && menu?.onDropdownVisibleChange !== undefined) {
          menu.onDropdownVisibleChange(open)
        } else {
          setDropdownOpen(open)
        }
      }}
    >
      <div className={breadcrumbItemMenuClassNames}>
        {menuIcon}
      </div>
    </Dropdown>
  ), [dropdown, itemMenu, menu, dropdownOpen, breadcrumbItemMenuClassNames, menuIcon])

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
