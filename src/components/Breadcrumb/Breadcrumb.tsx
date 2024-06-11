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

import { computeItems, renderItem } from './Breadcrumb.utils'
import { BreadcrumbButton } from './Breadcrumb.types'
import { BreadcrumbProps } from './Breadcrumb.props'
import styles from './Breadcrumb.module.css'

/**
 * UI component for displaying the current location within an hierarchy
 *
 * @returns {Breadcrumb} Breadcrumb component
 */
export const Breadcrumb = ({ isLoading, items, getPopupContainer }: BreadcrumbProps): ReactElement => {
  const [visibleItems, setVisibleItems] = useState<BreadcrumbButton[]>([])

  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const hiddenContainerRef = useRef<HTMLDivElement>(null)

  const getDropdownContainer = useCallback(() => {
    if (!breadcrumbRef.current) { return }

    return getPopupContainer?.(breadcrumbRef.current) ?? breadcrumbRef.current
  }, [getPopupContainer])

  // Computes visible and collapsed items
  useEffect(() => {
    if (!items || items.length <= 2) {
      setVisibleItems(items ?? [])
      return
    }

    const container = breadcrumbRef.current
    const hiddenContainer = hiddenContainerRef.current
    if (!container || !hiddenContainer) {
      setVisibleItems([])
      return
    }

    const setItems = (): void => {
      const nextItems = computeItems(items, container, hiddenContainer)
      setVisibleItems(nextItems)
    }

    setTimeout(() => setItems())

    window.addEventListener('resize', setItems)

    return () => window.removeEventListener('resize', setItems)
  }, [items])

  return (
    <div className={styles.breadcrumb} ref={breadcrumbRef} >
      <div className={styles.breadcrumbItems}>
        {
          visibleItems.map((breadcrumbItem, index, itemList) => renderItem(
            breadcrumbItem,
            index,
            itemList,
            { isHidden: false, isLoading, getDropdownContainer }
          ))
        }
      </div>
      <div
        className={classNames([styles.breadcrumbItems, styles.breadcrumbHidden])}
        ref={hiddenContainerRef}
      >
        {
          items?.map((breadcrumbItem, index, itemList) => renderItem(
            breadcrumbItem,
            index,
            itemList,
            { isHidden: true, isLoading, getDropdownContainer }
          ))
        }
      </div>
    </div>
  )
}
