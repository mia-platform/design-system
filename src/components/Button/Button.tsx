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
import { Button as AntButton } from 'antd'
import classnames from 'classnames'

import { HTMLType, Hierarchy, IconPosition, Shape, Size, Type } from './Button.types'
import { ButtonProps } from './Button.props'
import styles from './Button.module.css'

const {
  button,
  buttonSm,
  buttonSmIconOnly,
  buttonMd,
  buttonMdIconOnly,
  buttonLg,
  buttonGhost,
  buttonLink,
  buttonText,
} = styles

const { Primary, Neutral, Danger } = Hierarchy
const { Left } = IconPosition
const { Square } = Shape
const { Small, Middle, Large } = Size
const { Filled, Ghost, Link } = Type

enum AntdIconPosition {
  Start = 'start',
  End = 'end'
}
const getAntdPosition = (position: IconPosition):AntdIconPosition => {
  return position === Left ? AntdIconPosition.Start : AntdIconPosition.End
}

export const defaults = {
  hierarchy: Primary,
  iconPosition: Left,
  isDisabled: false,
  isLoading: false,
  shape: Square,
  size: Middle,
  type: Filled,
}

/**
 * UI component for performing actions on the page interacting through clicks
 *
 * @link https://ant.design/components/button
 * @returns {Button} Button component
 */
export const Button = ({
  isBlock,
  children,
  form,
  hierarchy = defaults.hierarchy,
  href,
  htmlType,
  icon,
  iconPosition = defaults.iconPosition,
  isDisabled = defaults.isDisabled,
  isLoading = defaults.isLoading,
  onClick,
  shape = defaults.shape,
  size = defaults.size,
  target,
  title,
  type = defaults.type,
  download,
}: ButtonProps): ReactElement => {
  const buttonClassNames = useMemo(() => classnames(
    [
      button,
      children && size === Small && type !== Link && buttonSm,
      !children && size === Small && type !== Link && buttonSmIconOnly,
      children && size === Middle && type !== Link && buttonMd,
      !children && size === Middle && type !== Link && buttonMdIconOnly,
      size === Large && type !== Link && buttonLg,
      (type === Ghost || type === Link) && buttonGhost,
      type === Link && buttonLink,
    ]
  ), [children, size, type])

  const antdIconPosition = useMemo(() => getAntdPosition(iconPosition), [iconPosition])
  return (
    <AntButton
      block={isBlock}
      className={buttonClassNames}
      danger={hierarchy === Danger}
      disabled={isDisabled}
      download={download}
      form={form}
      ghost={type !== Filled && hierarchy !== Neutral}
      htmlType={form && !htmlType ? HTMLType.Submit : htmlType}
      icon={icon}
      iconPosition={antdIconPosition}
      loading={isLoading}
      shape={shape === Square ? 'default' : 'circle'}
      size={size}
      title={title}
      type={hierarchy === Neutral ? 'default' : 'primary'}
      onClick={onClick}
      {...href && { href, rel: 'noopener noreferrer', target }}
    >
      {children && <div className={type !== Link ? buttonText : undefined}>{children}</div>}
    </AntButton>
  )
}

Button.Hierarchy = Hierarchy
Button.IconPosition = IconPosition
Button.Shape = Shape
Button.Size = Size
Button.Type = Type
Button.HTMLType = HTMLType
