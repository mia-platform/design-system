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

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import { BreadcrumbItem } from './BreadcrumbItem'
import { BreadcrumbProps } from './Breadcrumb.props'
import styles from './Breadcrumb.module.css'

const { breadcrumb } = styles

const calculateTotalWidth = (items: HTMLElement[], iconWidth: number, resized: boolean[] = []): number => {
  let total = 0

  items.forEach((item, index) => {
    if (resized[index]) {
      // Approximate width for '...'
      total += 20
    } else {
      total += item.offsetWidth
    }
    if (index < items.length - 1) {
      total += iconWidth
    }
  })

  return total
}

/**
 * UI component for displaying the current location within an hierarchy
 *
 * @returns {Breadcrumb} Breadcrumb component
 */
export const Breadcrumb = ({
  isLoading,
  items,
}: BreadcrumbProps): ReactElement => {
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const [maxWidth, setMaxWidth] = useState<number>(0)
  const [resizedItems, setResizedItems] = useState<boolean[]>(new Array(items.length).fill(false))

  useEffect(() => {
    if (breadcrumbRef.current) {
      const parentMaxWidth = breadcrumbRef.current.parentElement?.offsetWidth || 0
      setMaxWidth(parentMaxWidth)
    }
  }, [breadcrumbRef])

  const minimizeBreadcrumbItems = useCallback((
    breadcrumbItems: HTMLElement[],
    availableWidth: number,
    iconWidth: number
  ): boolean[] => {
    let totalWidth = calculateTotalWidth(breadcrumbItems, iconWidth)
    const newResizedItems = new Array(breadcrumbItems.length).fill(false)
    // Start from the second item, keep the first and last as is
    let i = 1

    while (totalWidth > availableWidth && i < breadcrumbItems.length - 1) {
      newResizedItems[i] = true
      totalWidth = calculateTotalWidth(breadcrumbItems, iconWidth, newResizedItems)
      i += 1
    }

    return newResizedItems
  }, [])

  useEffect(() => {
    if (breadcrumbRef.current && maxWidth > 0) {
      const breadcrumbItems = Array.from(breadcrumbRef.current.children) as HTMLElement[]
      const totalWidth = calculateTotalWidth(breadcrumbItems, 16)

      if (totalWidth > maxWidth) {
        const newResizedItems = minimizeBreadcrumbItems(breadcrumbItems, maxWidth, 16)
        setResizedItems(newResizedItems)
      }
    }
  }, [maxWidth, minimizeBreadcrumbItems])

  return (
    <div className={classNames([breadcrumb])} ref={breadcrumbRef}>
      {items.map(({ key, icon, menu, onClick, label }, index) =>
        <BreadcrumbItem
          icon={icon}
          index={index}
          isLoading={isLoading}
          isResized={resizedItems[index]}
          itemsLength={items.length}
          key={`breadcrumb-item-${key ?? index}`}
          label={label}
          menu={menu}
          onClick={onClick}
        />
      )}
    </div>
  )
}
