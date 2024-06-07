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
import { Dropdown, Input, MenuProps, Skeleton } from 'antd'
import React, { ChangeEvent, ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'
import { debounce } from 'lodash-es'

import { BodyL } from '../Typography/BodyX/BodyL'
import { BodyS } from '../Typography/BodyX/BodyS'
import { BreadcrumbItemMenu } from './Breadcrumb.types'
import { BreadcrumbItemProps } from './Breadcrumb.props'
import CaretFullDownSvg from './assets/caret-full-down.svg'
import { Icon } from '../Icon'
import styles from './Breadcrumb.module.css'
import { useTheme } from '../../hooks/useTheme'

const {
  breadcrumbItemLabelStyle,
  breadcrumbItemLabelWrapper,
  breadcrumbMenuIcon,
  breadcrumbItemSubmenu,
  dropdownMenuStyle,
  breadcrumbItemWrapper,
  caretOnly,
  dropdownMenuContainer,
  dropdownMenuSearch,
  last,
  separatorWrapper,
} = styles

export const BreadcrumbItem = ({
  index,
  getPopupContainer,
  icon,
  isLoading,
  isMenuHidden = false,
  itemsLength,
  label,
  menu,
  onClick,
}: BreadcrumbItemProps): ReactElement => {
  const { palette } = useTheme()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const isLastItem = useMemo(() => index === (itemsLength - 1), [index, itemsLength])

  const hasSeparator = useMemo(() => itemsLength > 1 && !isLastItem, [isLastItem, itemsLength])
  const hasLabel = useMemo(() => icon || label, [icon, label])

  const menuIcon = useMemo(() => <CaretFullDownSvg />, [])

  const breadcrumbItemLabel = useMemo(() => (
    <div
      className={classNames([breadcrumbItemLabelWrapper, isLastItem && last])}
      onClick={onClick}
    >
      {icon}
      {
        label && (
          <div className={breadcrumbItemLabelStyle}>
            <BodyL ellipsis={{ rows: 1, tooltip: label }}>
              {label}
            </BodyL>
          </div>
        )
      }
    </div>
  ), [icon, isLastItem, label, onClick])

  const itemMenu = useMemo<MenuProps>(() => {
    const items = Object.values(menu?.items ?? {})
      .filter(item => menu?.onChangeSearch || item.label.toLowerCase().includes(searchValue.toLowerCase()))
      .reduce<ItemType[]>((acc, itemData, currentIndex) => {
        return [
          ...acc,
          {
            key: itemData.key ?? `breadcrumb-menu-item-${currentIndex}`,
            icon: itemData?.icon,
            label: (
              <div onClick={itemData.onClick}>
                <BodyS ellipsis={{ rows: 1, tooltip: itemData?.label }}>
                  {itemData?.label}
                </BodyS>
              </div>
            ),
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
  }, [menu, searchValue])

  const handleChange = useCallback((
    breadcrumbItemMenu: BreadcrumbItemMenu, event: ChangeEvent<HTMLInputElement>
  ) => {
    if (breadcrumbItemMenu?.onChangeSearch) {
      breadcrumbItemMenu.onChangeSearch(event)
    } else {
      setSearchValue(event.target.value)
    }
  }, [])

  const dropdown = useCallback((dropdownMenu: ReactNode) => (
    <div className={dropdownMenuContainer}>
      {menu?.showSearch && <div className={dropdownMenuSearch}>
        <Input.Search
          allowClear={menu?.searchAllowClear ?? true}
          autoFocus
          placeholder={menu?.searchPlaceholder ?? ''}
          onChange={debounce((event) => handleChange(menu, event), 150)}
        />
      </div>}
      <div className={dropdownMenuStyle}>
        {React.cloneElement(dropdownMenu as React.ReactElement)}
      </div>
    </div>
  ), [handleChange, menu])

  const breadcrumbItemMenu = useMemo(() => {
    if (!menu) { return }

    if (isMenuHidden) {
      return (
        <div
          className={classNames([breadcrumbMenuIcon, !hasLabel && caretOnly])}
        >
          {menuIcon}
        </div>
      )
    }

    return (
      // <Dropdown
      //   destroyPopupOnHide
      //   dropdownRender={dropdown}
      //   getPopupContainer={getPopupContainer}
      //   menu={itemMenu}
      //   open={menu?.open !== undefined ? menu.open : dropdownOpen}
      //   overlayClassName={breadcrumbItemSubmenu}
      //   placement={'bottomLeft'}
      //   trigger={['click']}
      //   onOpenChange={(open) => {
      //     if (menu?.open !== undefined && menu?.onDropdownVisibleChange !== undefined) {
      //       menu.onDropdownVisibleChange(open)
      //     } else {
      //       setDropdownOpen(open)
      //     }
      //   }}
      // >
      <div className={classNames([breadcrumbMenuIcon, !hasLabel && caretOnly])} >
        {menuIcon}
      </div>
      // </Dropdown>
    )
  }, [isMenuHidden, menu, hasLabel, menuIcon])

  return (
    <>
      {
        isLoading
          ? <Skeleton.Button active />
          : (
            <div className={breadcrumbItemWrapper}>
              {breadcrumbItemLabel}
              {breadcrumbItemMenu}
            </div>
          )
      }
      {
        hasSeparator && (
          <div className={separatorWrapper}>
            <Icon color={palette?.common?.grey?.[600]} name="PiCaretRight" size={16} />
          </div>
        )
      }
    </>
  )
}
