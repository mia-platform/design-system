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
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'

import { BreadcrumbItem } from './BreadcrumbItem'
import { BreadcrumbItemType } from './Breadcrumb.types'
import { BreadcrumbProps } from './Breadcrumb.props'
import styles from './Breadcrumb.module.css'

const { breadcrumbHiddenContainer, breadcrumbItemWrapper, breadcrumb } = styles

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

  useEffect(() => {
    const calculateItems = (): void => {
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
        totalWidth += itemWidths[itemWidths.length - 1] + 16
      }

      if (items.length > 2) {
        // Add width of dropdown collapsed item
        const collapsedItemWidth = 20
        totalWidth += collapsedItemWidth

        for (let i = items.length - 2; i > 0; i--) {
        // Add width of the item with separator
          const itemWidth = itemWidths[i] + 16
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

    calculateItems()
    window.addEventListener('resize', calculateItems)
    return () => window.removeEventListener('resize', calculateItems)
  }, [items])

  const dropdownMenu = useMemo<MenuProps>(() => {
    const dropdownItems = Object.values(collapsedItems ?? {})
      .reduce<ItemType[]>((acc, itemData, currentIndex) => {
        return [
          ...acc,
          {
            key: itemData.key ?? `breadcrumb-menu-item-${currentIndex}`,
            icon: itemData.icon,
            label: <div onClick={itemData.onClick}>{itemData.label}</div>,
          },
        ]
      }, [])

    return {
      items: dropdownItems,
    }
  }, [collapsedItems])

  const renderItem = (
    item: BreadcrumbItemType,
    index: number,
    isInitialItem?: boolean,
    isLastItem?: boolean
  ): ReactElement => {
    return (
      <BreadcrumbItem
        icon={item?.icon}
        isInitialItem={isInitialItem}
        isLastItem={isLastItem}
        isLoading={isLoading}
        itemsLength={items.length}
        key={`breadcrumb-item-${item?.key ?? index}`}
        label={item?.label}
        menu={item?.menu}
        onClick={item?.onClick}
      />
    )
  }

  const renderCollapsedDropdown = (): ReactElement => {
    return (
      <Dropdown menu={dropdownMenu}>
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
  }

  return (
    <div ref={breadcrumbRef} >
      <div className={classNames([breadcrumb])}>
        {items.length > 0 && renderItem(items[0], 0, true)}
        {collapsedItems.length > 0 && renderCollapsedDropdown()}
        {visibleItems.map((breadcrumbItem, index) => renderItem(breadcrumbItem, index))}
        {items.length > 1 && renderItem(items[items.length - 1], items.length - 1, false, true)}
      </div>
      <div className={classNames([breadcrumbHiddenContainer])} ref={hiddenContainerRef} >
        {items.map((breadcrumbItem, index) => renderItem(breadcrumbItem, index))}
      </div>
    </div>
  )
  // return (
  //   <div className={classNames([breadcrumb])} ref={breadcrumbRef}>
  //     {items.map(({ key, icon, menu, onClick, label }, index) =>
  //       <BreadcrumbItem
  //         icon={icon}
  //         index={index}
  //         isLoading={isLoading}
  //         itemsLength={items.length}
  //         key={`breadcrumb-item-${key ?? index}`}
  //         label={label}
  //         menu={menu}
  //         onClick={onClick}
  //       />
  //     )}
  //   </div>
  // )
}
