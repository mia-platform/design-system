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

import { Dropdown as AntdDropdown, type MenuProps as AntdMenuProps } from 'antd'
import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'

import { DropdownClickEvent, DropdownItem, DropdownProps, DropdownTrigger, ItemLayout, OpenChangeInfoSource } from './props'
import { Footer, useFooterWithHookedActions } from './components/Footer'
import { Divider } from '../Divider'
import Label from './components/Label'
import styles from './dropdown.module.css'
import { useTheme } from '../../hooks/useTheme'

type ArrayElement<ArrayType extends readonly unknown[] | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type AntdMenuItems = AntdMenuProps['items']
type AntdMenuItem = ArrayElement<AntdMenuItems>

type AntdMenuClickEvent = {
  key: string,
  keyPath: string[],
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}

type AntdTriggerSource = 'trigger'|'menu'
const antdSourceMap: Record<AntdTriggerSource, OpenChangeInfoSource> = {
  'trigger': OpenChangeInfoSource.Trigger,
  'menu': OpenChangeInfoSource.Menu,
}

export const defaults = {
  itemLayout: ItemLayout.Horizontal,
  triggers: [DropdownTrigger.Click],
  initialSelectedItems: [],
  menuItemsMaxHeight: 240,
}

export const Dropdown = ({
  autoFocus,
  children,
  footer,
  isDisabled,
  itemLayout = defaults.itemLayout,
  items,
  menuItemsMaxHeight = defaults.menuItemsMaxHeight,
  onClick,
  triggers = defaults.triggers,
  onOpenChange,
  getPopupContainer,
  initialSelectedItems = defaults.initialSelectedItems,
  multiple,
  persistSelection = true,
}: DropdownProps): ReactElement => {
  const { spacing } = useTheme()

  const uniqueOverlayClassName = useMemo(() => `dropdown-overlay-${crypto.randomUUID()}`, [])
  const uniqueDropdownClassName = useMemo(() => `dropdown-${crypto.randomUUID()}`, [])

  const itemFinderMemo = useCallback((id: string) => itemFinder(items, id), [items])

  const antdItems = useMemo<AntdMenuItems>(() => itemsAdapter(items, itemLayout), [itemLayout, items])
  /* istanbul ignore next */
  const innerNode = useMemo(() => (children ? <span>{children}</span> : null), [children])

  const [selectedItems, setSelectedItems] = useState<string[]>(persistSelection ? initialSelectedItems : [])
  const updateSelectedItems = useCallback(
    (itemId: string) => {
      if (!persistSelection) {
        return
      }

      setSelectedItems(prevItems => (multiple ? pushOrRemove(prevItems, itemId) : [itemId]))
    },
    [multiple, persistSelection]
  )

  const onAntdMenuClick = useCallback(
    (antdEvent: AntdMenuClickEvent) => {
      const itemClickEvent: DropdownClickEvent = eventAdapter(antdEvent, itemFinderMemo)
      updateSelectedItems(itemClickEvent.id)
      onClick(itemClickEvent)
    },
    [itemFinderMemo, onClick, updateSelectedItems]
  )

  /**
   * This function is used to forcibly close the dropdown without controlling
   * the `open` state via prop.
   */
  const footerActionHook = useCallback(() => {
    const el = document.querySelector(`.${uniqueDropdownClassName}`)
    // This branch is not testable since the dropdown always exists when the dropdown is visible
    /* istanbul ignore if */
    if (!el) {
      return
    }
    // FIXME: with hover trigger this does not work and the dropdown will not be closed!
    (el as HTMLElement).click()
  }, [uniqueDropdownClassName])
  const hookedFooter = useFooterWithHookedActions({ footer, hook: footerActionHook })

  const dropdownRender = useCallback((menu: ReactNode): ReactNode => {
    const clonedMenu = React.cloneElement(menu as ReactElement, { style: { boxShadow: 'none' } })
    const scrollableStyle = { maxHeight: menuItemsMaxHeight, overflow: 'scroll' }
    if (!hookedFooter) {
      return (
        <div className={styles.dropdownRenderWrapper} style={scrollableStyle}>
          {clonedMenu}
        </div>
      )
    }

    return (
      <div className={styles.dropdownRenderWrapper}>
        <div style={scrollableStyle}>{clonedMenu}</div>
        <Divider margin={spacing?.margin?.none} />
        <Footer footer={hookedFooter} />
      </div>
    )
  }, [hookedFooter, menuItemsMaxHeight, spacing])

  const menu = useMemo(() => ({
    items: antdItems,
    /* istanbul ignore next */
    getPopupContainer: (triggerNode: HTMLElement) => (document.querySelector(`.${uniqueOverlayClassName}`) || triggerNode) as HTMLElement,
    onClick: onAntdMenuClick,
    selectedKeys: selectedItems,
  }), [antdItems, onAntdMenuClick, selectedItems, uniqueOverlayClassName])

  const classes = useMemo(() => classNames(styles.dropdownWrapper, uniqueOverlayClassName), [uniqueOverlayClassName])

  const onOpenChangeInternal = useCallback(
    (open: boolean, info: {source: 'trigger'| 'menu'}) => {
      if (!onOpenChange) {
        return
      }
      onOpenChange(open, { source: antdSourceMap[info.source] })
    },
    [onOpenChange]
  )

  return (
    <AntdDropdown
      autoFocus={autoFocus}
      className={uniqueDropdownClassName}
      disabled={isDisabled}
      dropdownRender={dropdownRender}
      getPopupContainer={getPopupContainer}
      menu={menu}
      overlayClassName={classes}
      trigger={triggers}
      onOpenChange={onOpenChangeInternal}
    >
      {innerNode}
    </AntdDropdown>
  )
}

Dropdown.ItemLayout = ItemLayout
Dropdown.Trigger = DropdownTrigger

function itemsAdapter(items: DropdownItem[], layout: ItemLayout): AntdMenuItems {
  return items.map<AntdMenuItem>((item: DropdownItem) => ({
    children: item.children ? itemsAdapter(item.children, layout) : undefined,
    danger: item.danger,
    key: item.id,
    label: <Label item={item} layout={layout} />,
  }))
}

function eventAdapter(
  event: AntdMenuClickEvent,
  finder: (id: string) => DropdownItem|undefined,
): DropdownClickEvent {
  return {
    id: event.key,
    selectedPath: event.keyPath?.reverse(),
    domEvent: event.domEvent,
    item: finder(event.key),
  }
}

function itemFinder(items: DropdownItem[], id: string): DropdownItem|undefined {
  for (const item of items) {
    if (item.id === id) {
      return item
    }

    if (item.children) {
      const found = itemFinder(item.children, id)
      if (found) {
        return found
      }
    }
  }
}

function pushOrRemove(prevItems: string[], itemId: string): string[] {
  const newItems = [...prevItems]
  const indexOfItem = newItems.indexOf(itemId)
  if (indexOfItem < 0) {
    newItems.push(itemId)
    return newItems
  }

  newItems.splice(indexOfItem, 1)
  return newItems
}
