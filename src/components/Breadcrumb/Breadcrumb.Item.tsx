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

import { BodyS } from '../Typography/BodyX/BodyS'
import { BreadcrumbItemMenuDropdown } from './Breadcrumb.Dropdown'
import { BreadcrumbItemType } from './Breadcrumb.types'
import { BreadcrumbSeparator } from './Breadcrumb.Separator'
import CaretFullDownSvg from './assets/caret-full-down.svg'
import { H2 } from '../Typography/HX/H2'
import { Icon } from '../Icon'
import styles from './Breadcrumb.module.css'
import { useTheme } from '../../hooks/useTheme'

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
  const { palette } = useTheme()

  const hasMenu = useMemo(() => Boolean(item.menu?.items), [item])

  const label = useMemo(() => {
    const maybeSubItem = item.menu?.items?.find(
      ({ key }) => key && key === item.menu?.activeKey
    )
    const labelText = maybeSubItem?.label ?? item.label
    const labelIcon = maybeSubItem?.icon ?? item.icon

    return !labelText && !labelIcon ? undefined : (
      <>
        {labelIcon && (
          <Icon
            color={
              isLastItem
                ? palette?.action?.secondary?.contrastText
                : palette?.text.neutral.subtle
            }
            component={labelIcon}
            size={16}
          />
        )}
        {labelText && (
          <div className={styles.breadcrumbItemLabelText}>
            {isLastItem ? (
              <H2
                color={palette?.text.neutral.bold}
                ellipsis={{ rows: 1, tooltip: labelText }}
              >
                {labelText}
              </H2>
            ) : (
              <BodyS
                ellipsis={{ rows: 1, tooltip: labelText }}
                hierarchy={BodyS.Hierarchy.Subtle}
              >
                {labelText}
              </BodyS>
            )}
          </div>
        )}
      </>
    )
  }, [
    item.menu?.items,
    item.menu?.activeKey,
    item.label,
    item.icon,
    isLastItem,
    palette?.action?.secondary?.contrastText,
    palette?.text.neutral.subtle,
    palette?.text.neutral.bold,
  ])

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
      open: !isHidden && hasMenu && (item.menu?.isOpen !== undefined ? item.menu.isOpen : dropdownOpen),
      placement: 'bottomLeft',
      trigger: ['click'],
      onOpenChange: (next: boolean): void => {
        if (isHidden) { return }

        item.menu?.onDropdownVisibleChange?.(next)

        if (item.menu?.isOpen === undefined) {
          setDropdownOpen(next)
        }
      },
    }

    const isButtonConnected = Boolean(!item.onClick && label && hasMenu)
    if (isButtonConnected) {
      return (
        <Dropdown {...dropdownProps}>
          <div className={classNames([styles.breadcrumbItemButton, styles.breadcrumbItemButtonConnected])}>
            {label}
            <CaretFullDownSvg aria-label="caret-full-down" />
          </div>
        </Dropdown>
      )
    }

    return (
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
    )
  }, [label, hasMenu, isHidden, item, dropdownOpen, onItemClick, getDropdownContainer])

  return (
    <>
      {isLoading ? <Skeleton.Button active /> : itemButton}
      {!isLastItem && !isHidden && <BreadcrumbSeparator />}
    </>
  )
}
