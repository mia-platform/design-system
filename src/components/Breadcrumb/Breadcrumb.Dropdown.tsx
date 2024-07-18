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

import { Input, Menu } from 'antd'
import { ReactElement, useMemo, useState } from 'react'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { debounce } from 'lodash-es'

import { BreadcrumbItemMenu, BreadcrumbItemMenuItem, BreadcrumbItemType, SearchOptions } from './Breadcrumb.types'
import { BodyS } from '../Typography/BodyX/BodyS'
import { Icon } from '../Icon'
import { buildMenuItemKey } from './Breadcrumb.utils'
import styles from './Breadcrumb.module.css'

type Props = {
  item: BreadcrumbItemType
  setOpen: (next: boolean) => void
}

export const getSearchOption = <K extends keyof SearchOptions, >(search: BreadcrumbItemMenu['search'], opt: K): SearchOptions[K] | undefined => {
  return typeof search === 'boolean' ? undefined : search?.[opt]
}

export const BreadcrumbItemMenuDropdown = ({ item, setOpen }: Props): ReactElement => {
  const [searchValue, setSearchValue] = useState('')

  const filteredItems = useMemo<BreadcrumbItemMenuItem[]>(() => {
    if (!item.menu?.items) { return [] }

    if (searchValue === '') { return item.menu.items }

    return item.menu.items.filter((subItem) => subItem.label?.toLowerCase().includes(searchValue.toLowerCase()))
  }, [item, searchValue])

  const menuItems = useMemo(() => filteredItems.map<ItemType>((menuItemData, currentIndex) => {
    return {
      key: buildMenuItemKey(menuItemData, currentIndex),
      icon: menuItemData?.icon,
      label: (
        <BodyS ellipsis={{ rows: 1, tooltip: menuItemData?.label }}>
          {menuItemData?.label}
        </BodyS>
      ),
    }
  }), [filteredItems])

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
        filteredItems.length > 0
          ? (
            <div className={styles.dropdownMenu}>
              <Menu
                items={menuItems}
                selectedKeys={item.menu?.activeKey ? [item.menu.activeKey] : []}
                onClick={({ key, domEvent }) => {
                  item.menu?.onClick?.(key, domEvent)

                  if (item.menu?.isOpen === undefined) {
                    setOpen(false)
                  }
                }}
              />
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
}
