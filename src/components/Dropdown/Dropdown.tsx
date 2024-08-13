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
import React, { ReactElement, ReactNode, useCallback, useMemo } from 'react'
import classNames from 'classnames'

import { DropdownClickEvent, DropdownItem, DropdownProps, DropdownTrigger, ItemLayout, OpenChangeInfoSource } from './props'
import Label from './components/Label'
import styles from './dropdown.module.css'

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
  trigger: [DropdownTrigger.Click],
}

export const Dropdown = ({
  autoFocus,
  children,
  isDisabled,
  itemLayout = defaults.itemLayout,
  items,
  onClick,
  triggers = defaults.trigger,
  onOpenChange,
  getPopupContainer,
}: DropdownProps): ReactElement => {
  const uniqueClassName = useMemo(() => `dropdown-${crypto.randomUUID()}`, [])

  const itemFinderMemo = useCallback((id: string) => itemFinder(items, id), [items])

  const antdItems = useMemo<AntdMenuItems>(() => itemsAdapter(items, itemLayout), [itemLayout, items])
  /* istanbul ignore next */
  const innerNode = useMemo(() => (children ? <span>{children}</span> : null), [children])

  const onAntdMenuClick = useCallback(
    (antdEvent: AntdMenuClickEvent) => onClick(eventAdapter(antdEvent, itemFinderMemo)),
    [itemFinderMemo, onClick]
  )

  const dropdownRender = useCallback((menu: ReactNode): ReactNode => {
    return React.cloneElement(menu as ReactElement)
  }, [])

  const menu = useMemo(() => ({
    items: antdItems,
    onClick: onAntdMenuClick,
    /* istanbul ignore next */
    getPopupContainer: (triggerNode: HTMLElement) => (document.querySelector(`.${uniqueClassName}`) || triggerNode) as HTMLElement,
  }), [antdItems, onAntdMenuClick, uniqueClassName])

  const classes = useMemo(() => classNames(styles.dropdownWrapper, uniqueClassName), [uniqueClassName])

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
