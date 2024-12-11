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
import { ReactElement, ReactNode, useMemo } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { FeedbackProps } from './Feedback.props'
import { Icon } from '../Icon'
import { IconComponent } from '../Icon/Icon.props'
import Palette from '../../themes/schema/palette'
import { Type } from './Feedback.types'
import styles from './Feedback.module.css'
import { useTheme } from '../../hooks/useTheme'

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
    return '#986DF1'
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
    return '#7133CD'
  case Type.Success:
    return palette.success[600]
  default:
    return palette.text.neutral.main
  }
}

/**
 * @link https://ant.design/components/message
 * @returns {ReactElement} Feedback component
 */
export const Feedback = ({ icon: customIcon, title, type }: FeedbackProps): ReactElement => {
  const { palette } = useTheme()

  const icon: ReactNode = useMemo(() => {
    if (type === Type.Loading) {
      return <Spin indicator={<LoadingOutlined />} size="large" />
    }

    return (
      <Icon
        color={getColor(type, palette)}
        component={customIcon ?? getIcon(type)}
        size={64}
      />
    )
  }, [customIcon, palette, type])

  return (
    <div className={styles.feedback}>
      {icon}
      <div className={styles.titleWrapper}>
        <div className={styles.title} style={{ color: getTextColor(type, palette) }}>
          {title}
        </div>
      </div>
    </div>
  )
}

Feedback.Type = Type
