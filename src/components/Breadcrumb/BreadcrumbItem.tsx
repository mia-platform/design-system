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
import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'
import { debounce } from 'lodash-es'

import { BreadcrumbItemMenu, BreadcrumbItemMenuItem, BreadcrumbItemType, SearchOptions } from './Breadcrumb.types'
import { BodyL } from '../Typography/BodyX/BodyL'
import { BodyS } from '../Typography/BodyX/BodyS'
import CaretFullDownSvg from './assets/caret-full-down.svg'
import { Icon } from '../Icon'
import styles from './Breadcrumb.module.css'
import { useTheme } from '../../hooks/useTheme'

type Props = {
  item: BreadcrumbItemType
  containerRef: React.RefObject<HTMLDivElement>
  isLoading?: boolean;
  isMenuHidden?: boolean;
  isLastItem: boolean
}

export const getSearchOption = <K extends keyof SearchOptions, >(search: BreadcrumbItemMenu['search'], opt: K): SearchOptions[K] | undefined => {
  return typeof search === 'boolean' ? undefined : search?.[opt]
}

export const BreadcrumbItem = ({ item, containerRef, isLoading, isMenuHidden, isLastItem }: Props): ReactElement => {
  const { palette } = useTheme()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const hasMenu = useMemo(() => Boolean(item.menu?.items), [item])

  const label = useMemo(() => {
    const maybeSubItem = item.menu?.items?.find(({ key }) => key === item.menu?.activeKey)
    const labelText = maybeSubItem?.label ?? item.label
    const labelIcon = maybeSubItem?.icon ?? item.icon

    return (!labelText && !labelIcon)
      ? undefined
      : (
        <>
          {labelIcon}
          {
            labelText && (
              <div className={styles.breadcrumbItemLabelText}>
                <BodyL ellipsis={{ rows: 1, tooltip: labelText }}>
                  {labelText}
                </BodyL>
              </div>
            )
          }
        </>
      )
  }, [item])

  const filteredMenuItems = useMemo<BreadcrumbItemMenuItem[]>(() => {
    if (!item.menu?.items) { return [] }

    if (searchValue === '') { return item.menu.items }

    return item.menu.items.filter((subItem) => subItem.label?.toLowerCase().includes(searchValue.toLowerCase()))
  }, [item, searchValue])

  const dropdownMenuProps = useMemo<MenuProps>(() => {
    const menuItems = filteredMenuItems.map<ItemType>((menuItemData, currentIndex) => {
      return {
        key: menuItemData.key ?? `breadcrumb-menu-item-${currentIndex}`,
        icon: menuItemData?.icon,
        label: (
          <BodyS ellipsis={{ rows: 1, tooltip: menuItemData?.label }}>
            {menuItemData?.label}
          </BodyS>
        ),
      }
    })

    return {
      items: menuItems,
      onClick: ({ key, domEvent }) => {
        item.menu?.onClick?.(key, domEvent)

        if (item.menu?.open === undefined) {
          setDropdownOpen(false)
        }
      },
      selectedKeys: item.menu?.activeKey ? [item.menu.activeKey] : [],
    }
  }, [filteredMenuItems, item])

  const dropdownRender = useCallback((dropdownMenu: ReactNode) => {
    return (
      <div className={styles.dropdownMenuContainer}>
        {
          Boolean(item.menu?.search) && (
            <div className={styles.dropdownMenuSearch}>
              <Input
                allowClear={getSearchOption(item.menu?.search, 'allowClear')}
                autoFocus
                placeholder={getSearchOption(item.menu?.search, 'placeholder') ?? 'Search...'}
                // @ts-expect-error size 12 is not accepted by Icon component but supported by underling SVG
                suffix={<Icon name="PiMagnifyingGlass" size={12} />}
                onChange={(event) => {
                  const onChange = getSearchOption(item.menu?.search, 'onChange')

                  if (onChange) {
                    onChange(event)
                  } else {
                    debounce(() => setSearchValue(event.target.value), 300)()
                  }
                }}
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
                  {item.menu?.emptyText ?? 'No items'}
                </BodyS>
              </div>
            )
        }
      </div>
    )
  }, [filteredMenuItems, item])

  const itemButton = useMemo(() => {
    if (!label && !hasMenu) {
      return (
        <div
          className={styles.breadcrumbItemButton}
          onClick={item.onClick}
        >
          <div
            className={classNames([
              styles.breadcrumbItemButtonEmpty,
              !item.onClick && styles.breadcrumbItemButtonNoInteraction,
            ])}
          />
        </div>
      )
    }

    // TODO: reset dropdown on hide
    const dropdownProps: DropdownProps = {
      dropdownRender,
      getPopupContainer: (trigger) => item.menu?.getPopupContainer?.(trigger) ?? containerRef.current ?? trigger,
      menu: dropdownMenuProps,
      open: hasMenu && (item.menu?.open !== undefined ? item.menu.open : dropdownOpen),
      placement: 'bottomLeft',
      trigger: ['click'],
      onOpenChange: (next: boolean): void => {
        item.menu?.onDropdownVisibleChange?.(next)

        if (item.menu?.open === undefined) {
          setDropdownOpen(next)
        }
      },
    }

    const isButtonConnected = Boolean(!item.onClick && label && hasMenu)
    if (isButtonConnected) {
      return (
        <Dropdown {...dropdownProps}>
          <div className={classNames([isLastItem && styles.breadcrumbItemLast])}>
            <div className={classNames([styles.breadcrumbItemButton, styles.breadcrumbItemButtonConnected])}>
              {label}
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
            !item.onClick && styles.breadcrumbItemButtonNoInteraction,
          ])}
        >
          {
            label && (
              <div
                className={classNames([styles.breadcrumbItemLabel, hasMenu && styles.withMenu])}
                onClick={item.onClick}
              >
                {label}
              </div>
            )
          }
          {
            hasMenu && (
              <Dropdown {...dropdownProps}>
                <div className={classNames([styles.breadcrumbMenuIcon, label && styles.withLabel])}>
                  <CaretFullDownSvg />
                </div>
              </Dropdown>
            )
          }
        </div>
      </div>
    )
  }, [label, hasMenu, dropdownRender, dropdownMenuProps, item, dropdownOpen, isLastItem, containerRef])

  return (
    <>
      {isLoading ? <Skeleton.Button active /> : itemButton}
      {
        !isLastItem && (
          <div className={styles.separatorWrapper}>
            <Icon color={palette?.common?.grey?.[600]} name="PiCaretRight" size={16} />
          </div>
        )
      }
    </>
  )
}
