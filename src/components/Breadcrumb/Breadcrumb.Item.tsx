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

import { Dropdown, DropdownProps, Skeleton } from 'antd'
import { ReactElement, useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'

import { BodyL } from '../Typography/BodyX/BodyL'
import { BreadcrumbItemMenuDropdown } from './Breadcrumb.Dropdown'
import { BreadcrumbItemType } from './Breadcrumb.types'
import { BreadcrumbSeparator } from './Breadcrumb.Separator'
import CaretFullDownSvg from './assets/caret-full-down.svg'
import styles from './Breadcrumb.module.css'

type Props = {
  item: BreadcrumbItemType
  getDropdownContainer: () => HTMLElement | undefined
  isLoading?: boolean;
  isHidden?: boolean;
  isLastItem: boolean
}

export const BreadcrumbItem = ({
  item,
  getDropdownContainer,
  isLoading,
  isHidden,
  isLastItem,
}: Props): ReactElement => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const hasMenu = useMemo(() => Boolean(item.menu?.items), [item])

  const label = useMemo(() => {
    const maybeSubItem = item.menu?.items?.find(({ key }) => key && key === item.menu?.activeKey)
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

  const onItemClick = useCallback<Exclude<BreadcrumbItemType['onClick'], undefined>>((...args) => {
    if (isHidden) { return }

    return item.onClick?.(...args)
  }, [isHidden, item])

  const itemButton = useMemo(() => {
    if (!label && !hasMenu) {
      return (
        <div
          className={styles.breadcrumbItemButton}
          onClick={onItemClick}
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

    const dropdownProps: DropdownProps = {
      destroyPopupOnHide: true,
      dropdownRender: () => <BreadcrumbItemMenuDropdown item={item} setOpen={setDropdownOpen} />,
      getPopupContainer: (trigger) => getDropdownContainer() ?? trigger,
      open: !isHidden && hasMenu && (item.menu?.open !== undefined ? item.menu.open : dropdownOpen),
      placement: 'bottomLeft',
      trigger: ['click'],
      onOpenChange: (next: boolean): void => {
        if (isHidden) { return }

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
              <CaretFullDownSvg aria-label="caret-full-down" />
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
                onClick={onItemClick}
              >
                {label}
              </div>
            )
          }
          {
            hasMenu && (
              <Dropdown {...dropdownProps}>
                <div className={classNames([styles.breadcrumbMenuIcon, label && styles.withLabel])}>
                  <CaretFullDownSvg aria-label="caret-full-down" />
                </div>
              </Dropdown>
            )
          }
        </div>
      </div>
    )
  }, [label, hasMenu, isHidden, item, dropdownOpen, isLastItem, onItemClick, getDropdownContainer])

  return (
    <>
      {isLoading ? <Skeleton.Button active /> : itemButton}
      {!isLastItem && !isHidden && <BreadcrumbSeparator />}
    </>
  )
}
