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

import { ReactElement, useMemo } from 'react'

import { BadgeProps } from './Badge.props'
import { Icon } from '../Icon'
import { Typography } from '../Typography'
import styles from './Badge.module.css'
import { useTheme } from '../../hooks/useTheme'

/**
 * UI component for displaying information about a resource, emphasizing some of its main features.
 * @returns {ReactElement} Badge component
 */
export const Badge = ({
  description: customDescription,
  extra: customExtra,
  icon: customIcon,
  title: customTitle,
  titleExtra,
}: BadgeProps): ReactElement => {
  const { palette } = useTheme()

  const icon = useMemo(() => (
    <div className={styles.icon} data-testid="badge-icon">
      <Icon color={palette.text.neutral.subtle} component={customIcon} size={48} />
    </div>
  ), [customIcon, palette.text.neutral.subtle])

  const title = useMemo(() => (
    <div className={styles.title}>
      <Typography.H3 ellipsis={{ rows: 1, tooltip: { title: customTitle } }}>
        {customTitle}
      </Typography.H3>
      {titleExtra}
    </div>
  ), [customTitle, titleExtra])

  const description = useMemo(() => {
    if (!customDescription) { return }

    return (
      <Typography.BodyS ellipsis={{ rows: 1, tooltip: { title: customDescription } }}>
        {customDescription}
      </Typography.BodyS>
    )
  }, [customDescription])

  const extra = useMemo(() => {
    if (!customExtra) { return }

    return (
      <div className={styles.extra}>
        {customExtra}
      </div>
    )
  }, [customExtra])

  return (
    <div className={styles.badge}>
      {icon}
      <div className={styles.content}>
        {title}
        {description}
      </div>
      {extra}
    </div>
  )
}
