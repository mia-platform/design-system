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

import { DropdownClickEvent, DropdownItem, DropdownProps, DropdownTrigger, ItemLayout } from './props'
import Label from './components/Label/Label'
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

export const defaults = {
  itemLayout: ItemLayout.Horizontal,
  trigger: [DropdownTrigger.Click],
}

const itemMatcher = (id: string) => (item: DropdownItem): boolean => item.id === id

export const Dropdown = ({
  autoFocus,
  children,
  isDisabled,
  itemLayout = defaults.itemLayout,
  items,
  onClick,
  triggers = defaults.trigger,
}: DropdownProps): ReactElement => {
  const findItem = useCallback((id: string) => items.find(itemMatcher(id)), [items])

  const antdItems = useMemo<AntdMenuItems>(() => itemsAdapter(items, itemLayout), [itemLayout, items])
  const innerNode = useMemo(() => (children ? <span>{children}</span> : null), [children])

  const onAntdMenuClick = useCallback(
    (antdEvent: AntdMenuClickEvent) => onClick(eventAdapter(antdEvent, findItem)),
    [findItem, onClick]
  )

  const dropdownRender = useCallback((menu: ReactNode): ReactNode => {
    return React.cloneElement(menu as ReactElement)
  }, [])

  const menu = useMemo(() => ({
    items: antdItems,
    onClick: onAntdMenuClick,
  }), [antdItems, onAntdMenuClick])

  return (
    <AntdDropdown
      autoFocus={autoFocus}
      disabled={isDisabled}
      dropdownRender={dropdownRender}
      menu={menu}
      overlayClassName={styles.dropdownWrapper}
      trigger={triggers}
    >
      {innerNode}
    </AntdDropdown>
  )
}

Dropdown.ItemLayout = ItemLayout
Dropdown.Trigger = DropdownTrigger

function itemsAdapter(items: DropdownItem[], layout: ItemLayout): AntdMenuItems {
  return items.map<AntdMenuItem>((item: DropdownItem) => ({
    label: <Label item={item} layout={layout} />,
    key: item.id,
    danger: item.danger,
  }))
}

function eventAdapter(
  event: AntdMenuClickEvent,
  itemFinder: (id: string) => DropdownItem|undefined,
): DropdownClickEvent {
  return {
    id: event.key,
    selectedPath: event.keyPath,
    domEvent: event.domEvent,
    item: itemFinder(event.key),
  }
}
