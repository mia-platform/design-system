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
  PiCircleHalfTiltFill,
  PiInfoFill,
  PiWarningDiamondFill,
  PiX,
  PiXSquareFill,
} from 'react-icons/pi'
import { ReactElement, useMemo } from 'react'
import { Alert as AntAlert } from 'antd'
import classnames from 'classnames'

import { Button } from '../Button/Button.tsx'
import { AlertProps } from './props.ts'
import { Icon } from '../Icon'
import { IconComponent } from '../Icon/Icon.props.ts'
import { Type } from './types.ts'
import styles from './Alert.module.css'

export const defaults = {
  isClosable: true,
}

const getIcon = (type?: Type): IconComponent => {
  switch (type) {
  case Type.Info:
    return PiInfoFill
  case Type.Warning:
    return PiWarningDiamondFill
  case Type.Error:
    return PiXSquareFill
  case Type.Success:
    return PiCheckCircleFill
  default:
    return PiCircleHalfTiltFill
  }
}

export const Alert = ({
  title: titleProp,
  description,
  isClosable = defaults.isClosable,
  type,
  children,
  isCompressed,
  icon,
  action,
  onClose,
}: AlertProps): ReactElement => {
  const className = useMemo(() => classnames([
    styles.alert,
    type && styles[type],
    isCompressed && styles.compressed,
  ]), [isCompressed, type])

  const title = useMemo(() => {
    return isCompressed
      ? (
        <div className={styles.titleContainer}>
          <Icon component={icon || getIcon(type)} size={16} />
          <span className={styles.title}>{titleProp}</span>
        </div>
      )
      : (
        <span className={styles.title}>{titleProp}</span>
      )
  }, [icon, isCompressed, titleProp, type])

  const content = useMemo(() => {
    return (description || children) && (
      <div>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
        {children && (
          <div className={styles.content}>{children}</div>
        )}
      </div>
    )
  }, [children, description])

  const closable = useMemo(() => {
    return !isCompressed && isClosable && {
      closeIcon: (
        <Button
          hierarchy={Button.Hierarchy.Neutral}
          icon={<Icon component={PiX} size={16} />}
          type={Button.Type.Ghost}
        />
      ),
    }
  }, [isCompressed, isClosable])

  return (
    <AntAlert
      action={action}
      className={className}
      closable={closable}
      description={content}
      icon={<Icon component={icon || getIcon(type)} />}
      message={title}
      showIcon={!isCompressed}
      type={type}
      onClose={onClose}
    />
  )
}

Alert.Type = Type
