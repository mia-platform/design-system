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
import { ReactElement, useMemo } from 'react'
import classNames from 'classnames'

import { BreadcrumbItemProps } from './Breadcrumb.props'
import { Icon } from '../Icon'
import styles from './Breadcrumb.module.css'
import { useTheme } from '../../hooks/useTheme'

const { breadcrumbItem, last, initial } = styles

export const BreadcrumbItem = ({
  icon,
  index,
  itemsLength,
  onClick,
  title,
}: BreadcrumbItemProps): ReactElement => {
  const { palette } = useTheme()

  const isInitialItem = index === 0
  const isLastItem = index === (itemsLength - 1)
  const hasSeparator = itemsLength > 1 && !isLastItem

  const breadcrumbItemClassNames = useMemo(() => classNames(
    [
      breadcrumbItem,
      isInitialItem && initial,
      isLastItem && last,
    ]
  ), [isInitialItem, isLastItem])

  const separatorIcon = useMemo(() => (
    <Icon color={palette?.common?.grey?.[600]} name="PiCaretRight" size={16} />
  ), [palette?.common?.grey])

  return (
    <>
      <div className={breadcrumbItemClassNames} onClick={onClick}>
        {icon}
        {title}
      </div>
      {hasSeparator && separatorIcon}
    </>
  )
}
