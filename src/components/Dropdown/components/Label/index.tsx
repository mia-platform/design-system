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

import { ReactElement, ReactNode, isValidElement, useMemo } from 'react'
import classNames from 'classnames'

import { DropdownItem, ItemLayout } from '../../props'
import { Tag } from '../../../Tag'
import styles from '../../dropdown.module.css'

const LABEL_DIVIDER = '·'

export type LabelProps = {
  layout: ItemLayout
  item: DropdownItem
}

const validateTagType = (itemId: string, tag?: ReactNode,): void => {
  if (!tag) {
    return
  }
  if (!isValidElement(tag) || tag.type !== Tag) {
    throw new Error(`Error in Dropdown item with id \`${itemId}\`: \`item.tag\` must be a Tag component`)
  }
}

const Label = ({
  item: { id: itemId, danger, label, secondaryLabel, tag },
  layout,
}: LabelProps): ReactElement => {
  const primaryLabelClassName = useMemo(() => classNames(
    styles.primaryLabel,
    danger ? styles.danger : undefined,
    layout === ItemLayout.Vertical ? styles.strong : undefined
  ), [danger, layout])

  const secondaryLabelClassName = useMemo(() => classNames(
    styles.secondaryLabel,
    danger ? styles.danger : undefined
  ), [danger])

  const labelsContainerClassName = useMemo(() => classNames(
    styles.labelsContainer,
    layout === ItemLayout.Horizontal
      ? styles.horizontalContainer
      : styles.verticalContainer
  ), [layout])

  validateTagType(itemId, tag)

  return (
    <div className={styles.itemRowContainer}>
      <div className={labelsContainerClassName}>
        <span className={primaryLabelClassName}>{label}</span>
        {
          !secondaryLabel
            ? null
            : <>
              {layout === ItemLayout.Horizontal && <span className={secondaryLabelClassName}>{LABEL_DIVIDER}</span>}
              <span className={secondaryLabelClassName}>{secondaryLabel}</span>
            </>
        }
      </div>
      {tag}
    </div>
  )
}
export default Label
