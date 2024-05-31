/**
 * Copyright 2024 Mia srl
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

import { Dropdown, MenuProps } from 'antd'
import { ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'

import { BodyS } from '../Typography/BodyX/BodyS'
import { BreadcrumbItem } from './BreadcrumbItem'
import { BreadcrumbItemType } from './Breadcrumb.types'
import { BreadcrumbProps } from './Breadcrumb.props'
import styles from './Breadcrumb.module.css'

const { breadcrumbHiddenContainer, breadcrumbItemSubmenu, breadcrumbItemWrapper, breadcrumb } = styles

const COLLAPSED_ITEM_WIDTH = 46

/**
 * UI component for displaying the current location within an hierarchy
 *
 * @returns {Breadcrumb} Breadcrumb component
 */
export const Breadcrumb = ({
  isLoading,
  items,
}: BreadcrumbProps): ReactElement => {
  const [visibleItems, setVisibleItems] = useState<BreadcrumbItemType[]>([])
  const [collapsedItems, setCollapsedItems] = useState<BreadcrumbItemType[]>([])
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const hiddenContainerRef = useRef<HTMLDivElement>(null)

  /**
 * Calculates page max width and distinguishes items between visible and collapsed
 */
  useEffect(() => {
    const setItemsVisibility = (): void => {
      const maxWidth = breadcrumbRef.current?.parentElement?.offsetWidth || 0
      const hiddenContainer = hiddenContainerRef.current

      if (!hiddenContainer) { return }

      const itemWidths = Array.from(hiddenContainer.children).map(
        (child) => (child as HTMLElement).getBoundingClientRect().width
      )

      let totalWidth = 0
      const visible: BreadcrumbItemType[] = []
      const collapsed: BreadcrumbItemType[] = []

      if (items.length > 0) {
        // Add width of the first item
        totalWidth += itemWidths[0]
      }

      if (items.length > 1) {
        // Add width of the last item with separator
        totalWidth += itemWidths[itemWidths.length - 1]
      }

      if (items.length > 2) {
        // Add width of dropdown collapsed item
        const collapsedItemWidth = COLLAPSED_ITEM_WIDTH
        totalWidth += collapsedItemWidth

        for (let i = items.length - 2; i > 0; i--) {
        // Add width of the item with separator
          const itemWidth = itemWidths[i]
          totalWidth += itemWidth

          if (totalWidth <= maxWidth) {
            visible.push(items[i])
          } else {
            collapsed.push(items[i])
          }
        }

        visible.reverse()
      }

      if (collapsed.length > 0) { collapsed.reverse() }

      setVisibleItems(visible)
      setCollapsedItems(collapsed)
    }

    setItemsVisibility()
    window.addEventListener('resize', setItemsVisibility)
    return () => window.removeEventListener('resize', setItemsVisibility)
  }, [items])

  const getItemLabel = useCallback((item: BreadcrumbItemType): ReactNode => {
    return (
      item?.menu?.activeKey
      && Object.values(item?.menu?.items ?? {}).find(({ key }) => key === item?.menu?.activeKey)?.label
    )
    ?? item?.label
  }, [])

  const getItemIcon = useCallback((item: BreadcrumbItemType): ReactNode => {
    return (
      item?.menu?.activeKey
      && Object.values(item?.menu?.items ?? {}).find(({ key }) => key === item?.menu?.activeKey)?.icon
    )
    ?? item?.icon
  }, [])

  const dropdownMenu = useMemo<MenuProps>(() => {
    const dropdownItems = Object.values(collapsedItems ?? {})
      .reduce<ItemType[]>((acc, itemData, currentIndex) => {
        const itemKey = itemData.key ?? `breadcrumb-menu-item--${currentIndex}`

        let dropdownItemSubmenu
        if (Object.values(itemData.menu?.items ?? {}).length > 0) {
          dropdownItemSubmenu = itemData?.menu?.items?.map(({ icon, key, label, onClick }, index) => ({
            icon,
            key: key ?? `${itemKey}-collapsed-menu-item-${index}`,
            label: (
              <div onClick={onClick}>
                <BodyS ellipsis={{ rows: 1, tooltip: label }}>
                  {label}
                </BodyS>
              </div>
            ),
          }))
        }

        const dropdownItem: ItemType = {
          ...{ children: dropdownItemSubmenu },
          key: itemKey,
          icon: getItemIcon(itemData),
          label: (
            <div onClick={itemData.onClick}>
              <BodyS ellipsis={{ rows: 1, tooltip: getItemLabel(itemData) }}>
                {getItemLabel(itemData)}
              </BodyS>
            </div>
          ),
          popupClassName: classNames([breadcrumbItemSubmenu]),
        }

        return [...acc, dropdownItem]
      }, [])

    return { items: dropdownItems }
  }, [collapsedItems, getItemIcon, getItemLabel])

  const renderItem = useCallback((
    item: BreadcrumbItemType,
    index: number,
    isInitialItem?: boolean,
    isLastItem?: boolean
  ): ReactElement => {
    return (
      <BreadcrumbItem
        icon={getItemIcon(item)}
        isInitialItem={isInitialItem}
        isLastItem={isLastItem}
        isLoading={isLoading}
        itemsLength={items.length}
        key={item?.key ?? `breadcrumb-item-${index}`}
        label={getItemLabel(item)}
        menu={item?.menu}
        onClick={item?.onClick}
      />
    )
  }, [getItemIcon, getItemLabel, isLoading, items.length])

  const renderCollapsedDropdown = useCallback((): ReactElement => {
    return (
      <Dropdown menu={dropdownMenu} overlayClassName={classNames([breadcrumbItemSubmenu])}>
        <div className={classNames([breadcrumbItemWrapper])}>
          <BreadcrumbItem
            isLoading={isLoading}
            itemsLength={items.length}
            key={`breadcrumb-item-collapsed`}
            label={'...'}
          />
        </div>
      </Dropdown>
    )
  }, [dropdownMenu, isLoading, items.length])

  return (
    <div ref={breadcrumbRef} >
      <div className={classNames([breadcrumb])}>
        {items.length > 0 && renderItem(items[0], 0, true)}
        {collapsedItems.length > 0 && renderCollapsedDropdown()}
        {visibleItems.map((breadcrumbItem, index) => renderItem(breadcrumbItem, index))}
        {items.length > 1 && renderItem(items[items.length - 1], items.length - 1, false, true)}
      </div>
      <div className={classNames([breadcrumbHiddenContainer])} ref={hiddenContainerRef}>
        {items.map((breadcrumbItem, index) => renderItem(breadcrumbItem, index))}
      </div>
    </div>
  )
}
