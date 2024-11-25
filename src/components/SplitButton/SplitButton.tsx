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

import { ReactElement, useCallback, useMemo } from 'react'
import { Dropdown as AntdDropdown } from 'antd'
import { PiCaretDown } from 'react-icons/pi'

import { AntdMenuClickEvent, AntdMenuItems } from '../Dropdown/types'
import { Dropdown, eventAdapter, itemFinder, itemsAdapter } from '../Dropdown/Dropdown'
import { DropdownClickEvent, ItemLayout } from '../Dropdown/props'
import { Button } from '../Button/Button'
import { Hierarchy } from '../Button/Button.types'
import { Icon } from '../Icon'
import { SplitButtonProps } from './props'
import styles from './SplitButton.module.css'

const {
  splitButton,
} = styles

const dropdownIcon = <Icon aria-label="Open dropdown" component={PiCaretDown} size={16} />

export const defaults = {
  hierarchy: Button.Hierarchy.Primary,
}

export const SplitButton = ({
  autoFocus,
  children,
  hierarchy = defaults.hierarchy,
  href,
  htmlType,
  isDisabled,
  isLoading,
  items,
  onClick,
  onItemClick,
  target,
  title,
}: SplitButtonProps): ReactElement => {
  const uniqueOverlayClassName = useMemo(() => `splitbutton-overlay-${crypto.randomUUID()}`, [])

  const itemFinderMemo = useCallback((id: string) => itemFinder(items, id), [items])
  const onAntdMenuClick = useCallback(
    (antdEvent: AntdMenuClickEvent) => {
      const itemClickEvent: DropdownClickEvent = eventAdapter(antdEvent, itemFinderMemo)
      onItemClick(itemClickEvent)
    },
    [itemFinderMemo, onItemClick]
  )

  const antdItems = useMemo<AntdMenuItems>(() => itemsAdapter(items, ItemLayout.Horizontal), [items])
  const menu = useMemo(() => ({
    items: antdItems,
    onClick: onAntdMenuClick,
  }), [antdItems, onAntdMenuClick])

  return (
    <AntdDropdown.Button
      autoFocus={autoFocus}
      className={splitButton}
      danger={hierarchy === Hierarchy.Danger}
      disabled={isDisabled}
      htmlType={htmlType}
      icon={dropdownIcon}
      loading={isLoading}
      menu={menu}
      overlayClassName={uniqueOverlayClassName}
      placement={Dropdown.Placement.BottomRight}
      title={title}
      trigger={[Dropdown.Trigger.Click]}
      type={hierarchy === Hierarchy.Neutral ? 'default' : 'primary'}
      onClick={onClick}
      {...href && { href, rel: 'noopener noreferrer', target }}
    >
      {children}
    </AntdDropdown.Button>
  )
}
