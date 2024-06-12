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

import { ReactElement } from 'react'

import { BREADCRUMB_COLLAPSED_WIDTH, BreadcrumbCollapsed } from './Breadcrumb.Collapsed'
import { BREADCRUMB_SEPARATOR_PADDING, BREADCRUMB_SEPARATOR_SIZE } from './Breadcrumb.Separator'
import { BreadcrumbButton, BreadcrumbItemMenuItem, BreadcrumbItemType } from './Breadcrumb.types'
import { BreadcrumbItem } from './Breadcrumb.Item'

export const renderItem = (
  item: BreadcrumbButton,
  idx: number,
  itemList: BreadcrumbButton[],
  ctx: { isHidden?: boolean, isLoading?: boolean, getDropdownContainer: () => HTMLElement | undefined }
): ReactElement => {
  if ('type' in item && item.type === 'collapsed') {
    return (
      <BreadcrumbCollapsed
        getDropdownContainer={ctx.getDropdownContainer}
        isLoading={ctx.isLoading}
        items={item.items}
      />
    )
  }

  // SAFETY: we can infer the type given the if statement above
  const typedItem = item as BreadcrumbItemType

  return (
    <BreadcrumbItem
      getDropdownContainer={ctx.getDropdownContainer}
      isHidden={ctx.isHidden}
      isLastItem={idx === (itemList?.length ?? 1) - 1}
      isLoading={ctx.isLoading}
      item={typedItem}
      key={typedItem?.key ?? `breadcrumb-item-${idx}`}
    />
  )
}

export const computeItems = (
  items: BreadcrumbItemType[],
  container: HTMLDivElement,
  hiddenContainer: HTMLDivElement
): BreadcrumbButton[] => {
  const maxWidth = container.getBoundingClientRect().width

  const separatorWidth = BREADCRUMB_SEPARATOR_SIZE + (BREADCRUMB_SEPARATOR_PADDING * 2)

  const nextVisibleItems: BreadcrumbButton[] = []
  const nextCollapsedItems = items.slice(1, items.length - 1)

  const elements = Array.from(hiddenContainer.children)
  let currWidth = 0

  nextVisibleItems.push(items[items.length - 1])

  currWidth += elements[elements.length - 1].getBoundingClientRect().width
  currWidth += elements[0].getBoundingClientRect().width + separatorWidth
  currWidth += BREADCRUMB_COLLAPSED_WIDTH + separatorWidth

  for (let i = elements.length - 2; i > 0; i--) {
    currWidth += elements[i].getBoundingClientRect().width + separatorWidth
    if (currWidth > maxWidth) {
      break
    }

    nextVisibleItems.unshift(nextCollapsedItems.pop()!)
  }

  if (nextCollapsedItems.length > 0) {
    nextVisibleItems.unshift({ type: 'collapsed', items: nextCollapsedItems })
  }
  nextVisibleItems.unshift(items[0])

  return nextVisibleItems
}

export const buildItemKey = (item: BreadcrumbItemType, idx: number): string => item.key ?? `breadcrumb-item-${idx}`
export const buildMenuItemKey = (item: BreadcrumbItemMenuItem, idx: number): string => item.key ?? `breadcrumb-menu-item-${idx}`
