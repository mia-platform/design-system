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

import { Dropdown, Menu, Skeleton } from 'antd'
import { ReactElement, useMemo } from 'react'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import classNames from 'classnames'

import { BodyS } from '../Typography/BodyX/BodyS'
import { BreadcrumbItemType } from './Breadcrumb.types'
import { BreadcrumbSeparator } from './Breadcrumb.Separator'
import { Icon } from '../Icon'
import { buildItemKey } from './Breadcrumb.utils'
import styles from './Breadcrumb.module.css'

type Props = {
  isLoading?: boolean
  getDropdownContainer: () => HTMLElement | undefined
  items: BreadcrumbItemType[]
}

export const BREADCRUMB_COLLAPSED_WIDTH = 32

export const BreadcrumbCollapsed = ({ isLoading, getDropdownContainer, items }: Props): ReactElement => {
  const menuItems = useMemo<ItemType[]>(() => {
    return items.map<ItemType>((item, idx) => {
      const maybeSubItem = item.menu?.items?.find(({ key }) => key && key === item.menu?.activeKey)
      const labelText = maybeSubItem?.label ?? item.label
      const labelIcon = maybeSubItem?.icon ?? item.icon

      return {
        className: !item.onClick ? styles.noInteraction : '',
        key: buildItemKey(item, idx),
        label: (
          <BodyS ellipsis={{ rows: 1, tooltip: item?.label }}>
            {labelText}
          </BodyS>
        ),
        icon: labelIcon ? <div>{labelIcon}</div> : undefined,
        onClick: ({ domEvent }) => item.onClick?.(domEvent as React.MouseEvent<Element, MouseEvent>),
      }
    })
  }, [items])

  const dropdown = useMemo(() => {
    return (
      <div className={classNames([styles.dropdownMenuContainer, styles.dropdownCollapseMenuContainer])}>
        <div className={styles.dropdownMenu}>
          <Menu items={menuItems} />
        </div>
      </div>
    )
  }, [menuItems])

  return isLoading
    ? <Skeleton.Button active />
    : (
      <>
        <Dropdown
          dropdownRender={() => dropdown}
          getPopupContainer={(trigger) => getDropdownContainer() ?? trigger}
          placement="bottomRight"
          trigger={['click']}
        >
          <div
            className={classNames([styles.breadcrumbItemButton, styles.breadcrumbItemButtonConnected])}
            style={{ width: BREADCRUMB_COLLAPSED_WIDTH }}
          >
            <Icon name="PiDotsThree" size={16} />
          </div>
        </Dropdown>
        <BreadcrumbSeparator />
      </>
    )
}
