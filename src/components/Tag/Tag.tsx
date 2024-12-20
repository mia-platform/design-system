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
import { Tag as AntTag } from 'antd'
import classnames from 'classnames'

import { Color, Type } from './types.ts'
import { Icon } from '../Icon'
import { TagProps } from './Tag.props'
import styles from './Tag.module.css'

export const defaults = {
  isBordered: true,
  color: Color.Grey,
}

export const Tag = (
  {
    children,
    type,
    color = Color.Grey,
    closeIcon,
    onClose,
    icon,
    isBordered = defaults.isBordered,
  } : TagProps
) : ReactElement => {
  const className = useMemo(() => classnames([
    styles.tag,
    type === Type.Chip && styles.chip,
    color === Color.Grey && styles.tagColorGrey,
    color === Color.Blue && styles.tagColorBlue,
    color === Color.Teal && styles.tagColorTeal,
    color === Color.Green && styles.tagColorGreen,
    color === Color.Yellow && styles.tagColorYellow,
    color === Color.Magenta && styles.tagColorMagenta,
    color === Color.Purple && styles.tagColorPurple,
    color === Color.Red && styles.tagColorRed,
  ]), [color, type])

  const customColor = useMemo(() => {
    return color && !(color in Color) ? color : undefined
  }, [color])

  return (
    <AntTag
      bordered={isBordered}
      className={className}
      closeIcon={closeIcon}
      color={customColor}
      icon={icon && (
        <Icon component={icon} size={16} />
      )}
      onClose={onClose}
    >
      {children}
    </AntTag>
  )
}

Tag.Type = Type
Tag.Color = Color
