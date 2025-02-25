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

import {
  PiCheckCircleFill,
  PiPlaceholderDuotone,
  PiSelection,
  PiTrashDuotone,
  PiWarningDiamondFill,
  PiXSquareFill,
} from 'react-icons/pi'
import { ReactElement, ReactNode } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { Alert } from '../Alert'
import { Badge } from '../Badge'
import { FeedbackProps } from './props'
import { Icon } from '../Icon'
import { IconComponent } from '../Icon/Icon.props'
import Palette from '../../themes/schema/palette'
import { Type } from './types'
import { Typography } from '../Typography'
import styles from './feedback.module.css'
import { useTheme } from '../../hooks/useTheme'

// TODO: replace this with DS colors from useTheme hook when possible
const colors = {
  purple: {
    500: '986DF1',
    600: '7133CD',
  },
}

const getColor = (type: Type, palette: Palette): string => {
  switch (type) {
  case Type.Delete:
    return palette.error[500]
  case Type.EmptyState:
    return palette.secondary[500]
  case Type.Error:
    return palette.error[500]
  case Type.Generic:
    return palette.common.black
  case Type.Special:
    return colors.purple[500]
  case Type.Success:
    return palette.success[500]
  case Type.Warning:
    return palette.warning[400]
  default:
    return palette.common.black
  }
}

const getIcon = (type: Type): IconComponent => {
  switch (type) {
  case Type.Delete:
    return PiTrashDuotone
  case Type.EmptyState:
    return PiSelection
  case Type.Error:
    return PiXSquareFill
  case Type.Generic:
    return PiPlaceholderDuotone
  case Type.Special:
    return PiPlaceholderDuotone
  case Type.Success:
    return PiCheckCircleFill
  case Type.Warning:
    return PiWarningDiamondFill
  default:
    return PiPlaceholderDuotone
  }
}

const getTextColor = (type: Type, palette: Palette): string => {
  switch (type) {
  case Type.Error:
    return palette.error[600]
  case Type.Special:
    return colors.purple[600]
  case Type.Success:
    return palette.success[600]
  default:
    return palette.text.neutral.main
  }
}

/**
 * UI component for displaying messages to the user.
 * @returns {ReactElement} Feedback component
 */
export const Feedback = ({
  alert: customAlert,
  badge: customBadge,
  icon: customIcon,
  children: customChildren,
  description,
  title: customTitle,
  type,
}: FeedbackProps): ReactElement => {
  const { palette } = useTheme()

  const icon: ReactNode = (type === Type.Loading)
    ? (
      <div className={styles.spinner}>
        <Spin indicator={<LoadingOutlined className={styles.loading} />} size="large" />
      </div>
    )
    : (
      <div className={styles.icon} data-testid="custom-icon">
        <Icon color={getColor(type, palette)} component={customIcon || getIcon(type)} size={64} />
      </div>
    )

  const title = (
    <div className={styles.titleWrapper}>
      <div className={styles.title}>
        <Typography.H2
          color={getTextColor(type, palette)}
          ellipsis={{ rows: 1, tooltip: { title: customTitle } }}
        >
          {customTitle}
        </Typography.H2>
      </div>
      {description && (
        <div className={styles.description}>
          <Typography.BodyS ellipsis={{ rows: 2, tooltip: { title: description } }}>
            {description}
          </Typography.BodyS>
        </div>
      )}
    </div>
  )

  const badge = customBadge ? <Badge {...customBadge} /> : null

  const alert = customAlert
    ? (
      <div className={styles.alert}>
        <Alert {...customAlert} isCompressed />
      </div>
    )
    : null

  const children = customChildren
    ? (
      <div className={styles.children}>
        {customChildren}
      </div>
    )
    : null

  return (
    <div className={styles.feedback}>
      <div className={styles.content}>
        {icon}
        {title}
        {badge}
        {alert}
        {children}
      </div>
    </div>
  )
}

Feedback.Type = Type
