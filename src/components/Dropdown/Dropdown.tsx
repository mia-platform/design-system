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

import { Input as AntInput, Dropdown as AntdDropdown, Skeleton } from 'antd'
import React, { ChangeEvent, ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import classNames from 'classnames'

import { AntdMenuClickEvent, AntdMenuItem, AntdMenuItems, Placement, antdSourceMap } from './types'
import { DropdownClickEvent, DropdownItem, DropdownProps, DropdownTrigger, ItemLayout } from './props'
import { Footer, useFooterWithHookedActions } from './components/Footer'
import { BaseInput } from '../BaseInput'
import { Divider } from '../Divider'
import { EmptyState } from './components/EmptyState'
import { ErrorState } from './components/ErrorState'
import { Icon } from '../Icon'
import Label from './components/Label'
import { Loader } from './components/Loader'
import styles from './dropdown.module.css'
import { useTheme } from '../../hooks/useTheme'

const ICON_SIZE = 12 as never

export const defaults = {
  itemLayout: ItemLayout.Horizontal,
  triggers: [DropdownTrigger.Click],
  initialSelectedItems: [],
  menuItemsMaxHeight: 240,
  placement: Placement.BottomLeft,
}

export const Dropdown = ({
  autoFocus,
  children,
  header,
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
  placement = defaults.placement,
  isSearchable = false,
  onSearch,
  searchPlaceholder = 'Search...',
  isLoading = false,
  hasError = false,
  errorMessage = 'An error occurred',
  onRetry,
  enableInfiniteScrolling,
  onScrollReachBottom,
  isLoadingAdditionalItems = false,
  additionalItems,
}: DropdownProps): ReactElement => {
  const { spacing, palette } = useTheme()

  const uniqueOverlayClassName = useMemo(() => `dropdown-overlay-${crypto.randomUUID()}`, [])
  const uniqueDropdownClassName = useMemo(() => `dropdown-${crypto.randomUUID()}`, [])

  const itemFinderMemo = useCallback((id: string) => itemFinder(items, id), [items])

  /* istanbul ignore next */
  const innerNode = useMemo(() => (children ? <span>{children}</span> : null), [children])

  const [searchTerm, setSearchTerm] = useState('')

  const [itemsToRender, setItemsToRender] = useState<DropdownItem[]>([])

  const [selectedItems, setSelectedItems] = useState<string[]>(persistSelection ? initialSelectedItems : [])
  const updateSelectedItems = useCallback((itemId: string) => {
    if (!persistSelection) {
      return
    }

    setSelectedItems(prevItems => (multiple ? pushOrRemove(prevItems, itemId) : [itemId]))
  }, [multiple, persistSelection])

  const onAntdMenuClick = useCallback(
    (antdEvent: AntdMenuClickEvent) => {
      const itemClickEvent: DropdownClickEvent = eventAdapter(antdEvent, itemFinderMemo)
      updateSelectedItems(itemClickEvent.id)
      onClick(itemClickEvent)
      if (isSearchable && searchTerm) {
        setSearchTerm('')
      }
    },
    [isSearchable, itemFinderMemo, onClick, searchTerm, updateSelectedItems]
  )

  useEffect(() => {
    if (Boolean(onSearch) || enableInfiniteScrolling) {
      return
    }

    if (!searchTerm) {
      setItemsToRender(items)
      return
    }

    const lower = searchTerm.toLowerCase()
    const filterRecursively = (list: DropdownItem[]): DropdownItem[] => {
      return list
        .map((item) => ({
          ...item,
          children: item.children
            ? filterRecursively(item.children)
            : undefined,
        }))
        .filter((item) => (
          (typeof item.label !== 'string' && typeof item.label !== 'number')
      || item.label?.toString().toLowerCase()
        .includes(lower)
      || (item.children && item.children.length > 0)
        ))
    }

    const filteredItems = filterRecursively(items)
    setItemsToRender(filteredItems)
  }, [items, onSearch, searchTerm, enableInfiniteScrolling])

  useEffect(() => {
    setItemsToRender(items)
  }, [items])

  useEffect(() => {
    if (additionalItems && additionalItems.length > 0) {
      setItemsToRender(currItems => [...currItems, ...additionalItems])
    }
  }, [additionalItems])

  const antdItems = useMemo<AntdMenuItems>(() => itemsAdapter(itemsToRender, itemLayout), [itemsToRender, itemLayout])

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

  const handleSearchInputChange = useCallback((ev: ChangeEvent<HTMLInputElement> | undefined) => {
    const value = ev?.target?.value || ''
    setSearchTerm(value)
    onSearch?.(value)
  }, [onSearch])

  const headerComponent = useMemo(
    () => (
      <>
        {header?.top}
        {isSearchable && (
          <div style={{ padding: spacing.gap.sm, paddingBottom: spacing.gap.xs }}>
            <BaseInput
              allowClear
              component={AntInput}
              isFullWidth
              placeholder={searchPlaceholder}
              suffix={
                <Icon
                  color={palette.action.secondary.contrastText}
                  component={PiMagnifyingGlass}
                  size={ICON_SIZE}
                />
              }
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
        )}
        {header?.bottom}
      </>
    ),
    [
      handleSearchInputChange,
      header?.bottom,
      header?.top,
      isSearchable,
      palette.action.secondary.contrastText,
      searchPlaceholder,
      searchTerm,
      spacing.gap.sm,
      spacing.gap.xs,
    ]
  )

  const prevScrollTopRef = React.useRef<number>(0)
  const hasTriggeredRef = React.useRef<boolean>(false)

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Reset the trigger flag when items change (new items received)
  React.useEffect(() => {
    hasTriggeredRef.current = false
  }, [additionalItems])

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    if (!onScrollReachBottom) { return }

    // distance from bottom to trigger (in pixels)
    const scrollThreshold = 32
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget

    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    const isScrollingDown = scrollTop > prevScrollTopRef.current

    prevScrollTopRef.current = scrollTop

    if (isScrollingDown && distanceFromBottom <= scrollThreshold) {
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true
        onScrollReachBottom()
      }
    }
  }, [onScrollReachBottom])

  const dropdownRender = useCallback(
    (menu: ReactNode): ReactNode => {
      const clonedMenu = React.cloneElement(menu as ReactElement, {
        style: { boxShadow: 'none' },
      })
      const scrollableStyle = {
        maxHeight: menuItemsMaxHeight,
        overflow: 'auto',
        borderRadius: 'inherit',
      }

      const isScrollVisible = scrollContainerRef.current
        && scrollContainerRef.current.scrollHeight
          > scrollContainerRef.current.clientHeight

      let dropdownBody = clonedMenu
      if (isLoading) {
        dropdownBody = (
          <div style={{ padding: spacing.padding.sm }}>
            <Loader />
          </div>
        )
      } else if (hasError) {
        dropdownBody = (
          <ErrorState
            message={errorMessage}
            onRetry={() => onRetry?.(searchTerm)}
          />
        )
      } else if (itemsToRender.length === 0) {
        dropdownBody = <EmptyState />
      } else if (
        enableInfiniteScrolling
        && itemsToRender.length > 0
        && isScrollVisible
      ) {
        dropdownBody = (
          <>
            {clonedMenu}
            <div style={{ height: '32px', padding: '4px 8px 16px 8px' }}>
              {isLoadingAdditionalItems && (
                <Skeleton
                  active
                  paragraph={{ rows: 1, width: '100%' }}
                  title={false}
                />
              )}
            </div>
          </>
        )
      }

      if (!hookedFooter) {
        return (
          <div className={styles.dropdownRenderWrapper}>
            {headerComponent}
            <div ref={scrollContainerRef} style={scrollableStyle} onScroll={handleScroll}>
              {dropdownBody}
            </div>
          </div>
        )
      }

      return (
        <div className={styles.dropdownRenderWrapper}>
          {headerComponent}
          <div ref={scrollContainerRef} style={scrollableStyle} onScroll={handleScroll}>
            {dropdownBody}
          </div>
          <div className={styles.footerDivider}>
            <Divider margin={spacing?.margin?.none} />
          </div>
          <Footer footer={hookedFooter} />
        </div>
      )
    },
    [
      menuItemsMaxHeight,
      isLoading,
      hasError,
      itemsToRender.length,
      enableInfiniteScrolling,
      hookedFooter,
      headerComponent,
      handleScroll,
      spacing?.margin?.none,
      spacing.padding.sm,
      errorMessage,
      onRetry,
      searchTerm,
      isLoadingAdditionalItems,
    ]
  )

  const menu = useMemo(() => ({
    items: antdItems,
    /* istanbul ignore next */
    getPopupContainer: (triggerNode: HTMLElement) => (document.querySelector(`.${uniqueOverlayClassName}`) || triggerNode) as HTMLElement,
    onClick: onAntdMenuClick,
    selectedKeys: selectedItems,
  }), [antdItems, onAntdMenuClick, selectedItems, uniqueOverlayClassName])

  const classes = useMemo(() => classNames(styles.dropdownWrapper, uniqueOverlayClassName), [uniqueOverlayClassName])

  const onOpenChangeInternal = useCallback(
    (open: boolean, info: { source: 'trigger' | 'menu' }) => {
      if (!open && isSearchable && searchTerm) {
        setSearchTerm('')
      }

      if (!onOpenChange) {
        return
      }
      onOpenChange(open, { source: antdSourceMap[info.source] })
    },
    [isSearchable, onOpenChange, searchTerm]
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
      placement={placement}
      trigger={triggers}
      onOpenChange={onOpenChangeInternal}
    >
      {innerNode}
    </AntdDropdown>
  )
}

Dropdown.ItemLayout = ItemLayout
Dropdown.Trigger = DropdownTrigger
Dropdown.Placement = Placement
Dropdown.Loader = Loader
Dropdown.ErrorState = ErrorState
Dropdown.EmptyState = EmptyState

function itemsAdapter(items: DropdownItem[], layout: ItemLayout): AntdMenuItems {
  return items.map<AntdMenuItem>((item: DropdownItem) => ({
    children: item.children ? itemsAdapter(item.children, layout) : undefined,
    danger: item.danger,
    key: item.id,
    label: <Label item={item} layout={layout} />,
    disabled: item.disabled,
  }))
}

function eventAdapter(
  event: AntdMenuClickEvent,
  finder: (id: string) => DropdownItem | undefined,
): DropdownClickEvent {
  return {
    id: event.key,
    selectedPath: event.keyPath?.reverse(),
    domEvent: event.domEvent,
    item: finder(event.key),
  }
}

function itemFinder(items: DropdownItem[], id: string): DropdownItem | undefined {
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
