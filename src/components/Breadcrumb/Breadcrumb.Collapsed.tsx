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

import { Dropdown, Skeleton } from 'antd'
import { ReactElement, useMemo } from 'react'
import classNames from 'classnames'

import { BreadcrumbItemType } from './Breadcrumb.types'
import { BreadcrumbSeparator } from './Breadcrumb.Separator'
import { Icon } from '../Icon'
import styles from './Breadcrumb.module.css'

type Props = {
  isLoading?: boolean
  containerRef: React.RefObject<HTMLDivElement>
  items: BreadcrumbItemType[]
}

export const BREADCRUMB_COLLAPSED_WIDTH = 32

export const BreadcrumbCollapsed = ({ isLoading, containerRef }: Props): ReactElement => {
  const dropdown = useMemo(() => {
    return (
      <div>
        Ciao
      </div>
    )
  }, [])

  return isLoading
    ? <Skeleton.Button active />
    : (
      <>
        <Dropdown
          dropdownRender={() => dropdown}
          getPopupContainer={(trigger) => containerRef.current?.parentElement?.parentElement ?? trigger}
          open
          placement={'bottom'}
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

// const dropdownMenu = useMemo<MenuProps>(() => {
//   const dropdownItems = Object.values(collapsedItems ?? {})
//     .reduce<ItemType[]>((acc, itemData, currentIndex) => {
//       const itemKey = itemData.key ?? `breadcrumb-menu-item--${currentIndex}`

//       let dropdownItemSubmenu
//       if (Object.values(itemData.menu?.items ?? {}).length > 0) {
//         dropdownItemSubmenu = itemData?.menu?.items?.map(({ icon, key, label, onClick }, index) => ({
//           icon,
//           key: key ?? `${itemKey}-collapsed-menu-item-${index}`,
//           label: (
//             <div onClick={onClick}>
//               <BodyS ellipsis={{ rows: 1, tooltip: label }}>
//                 {label}
//               </BodyS>
//             </div>
//           ),
//         }))
//       }

//       const dropdownItem: ItemType = {
//         ...{ children: dropdownItemSubmenu },
//         key: itemKey,
//         icon: getItemIcon(itemData),
//         label: (
//           <div onClick={itemData.onClick}>
//             <BodyS ellipsis={{ rows: 1, tooltip: getItemLabel(itemData) }}>
//               {getItemLabel(itemData)}
//             </BodyS>
//           </div>
//         ),
//         popupClassName: styles.breadcrumbItemSubmenu,
//       }

//       return [...acc, dropdownItem]
//     }, [])

//   return { items: dropdownItems }
// }, [collapsedItems])

// const renderCollapsedDropdown = useCallback((): ReactElement => {
//   return (
//     <Dropdown menu={dropdownMenu} overlayClassName={styles.breadcrumbItemSubmenu}>
//       <div className={styles.breadcrumbItemWrapper}>
//         <BreadcrumbItem
//           isLoading={isLoading}
//           itemsLength={items.length}
//           key={`breadcrumb-item-collapsed`}
//           label={'...'}
//         />
//       </div>
//     </Dropdown>
//   )
// }, [dropdownMenu, isLoading, items.length])
