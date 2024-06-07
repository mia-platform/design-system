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
import { Dropdown, DropdownProps, Input, MenuProps, Skeleton } from 'antd'
import React, { ChangeEvent, ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'
import { debounce } from 'lodash-es'

import { BreadcrumbItemMenu, BreadcrumbItemMenuItem } from './Breadcrumb.types'
import { BodyL } from '../Typography/BodyX/BodyL'
import { BodyS } from '../Typography/BodyX/BodyS'
import { BreadcrumbItemProps } from './Breadcrumb.props'
import CaretFullDownSvg from './assets/caret-full-down.svg'
import { Icon } from '../Icon'
import styles from './Breadcrumb.module.css'
import { useTheme } from '../../hooks/useTheme'

export const BreadcrumbItem = ({
  containerRef,
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

  const [dropdownOpen, setDropdownOpen] = useState(menu?.open !== undefined ? menu.open : false)
  const [searchValue, setSearchValue] = useState('')

  const isLastItem = useMemo(() => index === (itemsLength - 1), [index, itemsLength])
  const hasSeparator = useMemo(() => itemsLength > 1 && !isLastItem, [isLastItem, itemsLength])
  const hasLabel = useMemo(() => icon || label, [icon, label])
  const hasMenu = useMemo(() => Boolean(menu?.items), [menu?.items])

  const filteredMenuItems = useMemo<BreadcrumbItemMenuItem[]>(() => {
    if (!menu?.items) { return [] }

    if (searchValue === '') { return menu.items }

    return menu.items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
  }, [menu?.items, searchValue])

  const dropdownMenuProps = useMemo<MenuProps>(() => {
    const items = filteredMenuItems.map<ItemType>((itemData, currentIndex) => {
      return {
        onClick: ({ domEvent }) => itemData.onClick?.(domEvent),
        key: itemData.key ?? `breadcrumb-menu-item-${currentIndex}`,
        icon: itemData?.icon,
        label: (
          <BodyS ellipsis={{ rows: 1, tooltip: itemData?.label }}>
            {itemData?.label}
          </BodyS>
        ),
      }
    })

    return { items, selectedKeys: menu?.activeKey ? [menu.activeKey] : [] }
  }, [filteredMenuItems, menu])

  const handleChange = useCallback((
    breadcrumbItemMenu: BreadcrumbItemMenu, event: ChangeEvent<HTMLInputElement>
  ) => {
    if (breadcrumbItemMenu?.onChangeSearch) {
      breadcrumbItemMenu.onChangeSearch(event)
    } else {
      setSearchValue(event.target.value)
    }
  }, [])

  const dropdownRender = useCallback((dropdownMenu: ReactNode) => {
    return (
      <div className={styles.dropdownMenuContainer}>
        {
          menu?.showSearch && (
            <div className={dropdownMenuSearch}>
              <Input.Search
                allowClear={menu?.searchAllowClear ?? true}
                autoFocus
                placeholder={menu?.searchPlaceholder ?? ''}
                onChange={debounce((event) => handleChange(menu, event), 150)}
              />
            </div>
          )
        }
        {
          filteredMenuItems.length > 0
            ? (
              <div className={styles.dropdownMenu}>
                {React.cloneElement(dropdownMenu as React.ReactElement)}
              </div>
            )
            : (
              <div className={styles.noItemsContainer}>
                <BodyS>
                  {/* TODO: personalize text */}
                  No items
                </BodyS>
              </div>
            )
        }
      </div>
    )
  }, [filteredMenuItems, handleChange, menu])


  const itemButton = useMemo(() => {
    if (!hasLabel && !hasMenu) {
      return (
        <div
          className={styles.breadcrumbItemButton}
          onClick={onClick}
        >
          <div
            className={classNames([
              styles.breadcrumbItemButtonEmpty,
              !onClick && styles.breadcrumbItemButtonNoInteraction,
            ])}
          />
        </div>
      )
    }

    const dropdownProps: DropdownProps = {
      dropdownRender,
      getPopupContainer: (trigger) => getPopupContainer?.(trigger) ?? containerRef.current ?? trigger,
      menu: dropdownMenuProps,
      open: hasMenu && (menu?.open !== undefined ? menu.open : dropdownOpen),
      placement: 'bottomLeft',
      trigger: ['click'],
      onOpenChange: (next: boolean): void => {
        menu?.onDropdownVisibleChange?.(next)

        if (menu?.open === undefined) {
          setDropdownOpen(next)
        }
      },
    }

    const isButtonConnected = Boolean(!onClick && hasLabel && hasMenu)
    if (isButtonConnected) {
      return (
        <Dropdown {...dropdownProps}>
          <div className={classNames([isLastItem && styles.breadcrumbItemLast])}>
            <div className={classNames([styles.breadcrumbItemButton, styles.breadcrumbItemButtonConnected])}>
              {icon}
              {
                label && (
                  <div className={styles.breadcrumbItemLabelText}>
                    <BodyL ellipsis={{ rows: 1, tooltip: label }}>
                      {label}
                    </BodyL>
                  </div>
                )
              }
              <CaretFullDownSvg />
            </div>
          </div>
        </Dropdown>
      )
    }

    return (
      <div className={classNames([isLastItem && styles.breadcrumbItemLast])}>
        <div
          className={classNames([
            styles.breadcrumbItemButton,
            styles.breadcrumbItemButtonSegmented,
            !onClick && styles.breadcrumbItemButtonNoInteraction,
          ])}
        >
          {
            hasLabel && (
              <div
                className={classNames([styles.breadcrumbItemLabel, hasMenu && styles.withMenu])}
                onClick={onClick}
              >
                {icon}
                {
                  label && (
                    <div className={styles.breadcrumbItemLabelText}>
                      <BodyL ellipsis={{ rows: 1, tooltip: label }}>
                        {label}
                      </BodyL>
                    </div>
                  )
                }
              </div>
            )
          }
          {
            hasMenu && (
              <Dropdown {...dropdownProps}>
                <div className={classNames([styles.breadcrumbMenuIcon, hasLabel && styles.withLabel])}>
                  <CaretFullDownSvg />
                </div>
              </Dropdown>
            )
          }
        </div>
      </div>
    )
  }, [
    containerRef,
    dropdownMenuProps,
    dropdownRender,
    getPopupContainer,
    hasLabel,
    hasMenu,
    icon,
    isLastItem,
    label,
    onClick,
    dropdownOpen,
    menu,
  ])

  return (
    <>
      {isLoading ? <Skeleton.Button active /> : itemButton}
      {
        hasSeparator && (
          <div className={styles.separatorWrapper}>
            <Icon color={palette?.common?.grey?.[600]} name="PiCaretRight" size={16} />
          </div>
        )
      }
    </>
  )
}
