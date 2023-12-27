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

import { Hierarchy, IconPosition, Shape, Size, Type } from './Button.types'
import { ButtonProps } from './Button.props'
import styles from './Button.module.css'

const { button, buttonSm, buttonSmIconOnly, buttonMd, buttonMdIconOnly, buttonLg, buttonGhost, buttonText } = styles

const { Primary, Neutral, Danger } = Hierarchy
const { Left, Right } = IconPosition
const { Square } = Shape
const { Small, Middle, Large } = Size
const { Filled, Ghost } = Type

/**
 * UI component for performing actions on the page interacting through clicks
 *
 * @link https://ant.design/components/button
 * @returns {Button} Button component
 */
export const Button = ({
  children,
  hierarchy,
  href,
  icon,
  iconPosition,
  isDisabled,
  isLoading,
  onClick,
  shape,
  size,
  target,
  type,
}: ButtonProps): ReactElement => {
  const buttonClassNames = useMemo(() => classnames(
    [
      button,
      children && size === Small && buttonSm,
      !children && size === Small && buttonSmIconOnly,
      children && size === Middle && buttonMd,
      !children && size === Middle && buttonMdIconOnly,
      size === Large && buttonLg,
      type === Ghost && buttonGhost,
    ]
  ), [children, size, type])

  return (
    <AntButton
      className={buttonClassNames}
      danger={hierarchy === Danger}
      disabled={isDisabled}
      ghost={type !== Filled && hierarchy !== Neutral}
      loading={isLoading}
      shape={shape === Square ? 'default' : 'circle'}
      size={size}
      type={hierarchy === Neutral ? 'default' : 'primary'}
      onClick={onClick}
      {...href && { href, rel: 'noopener noreferrer', target }}
    >
      {iconPosition === Left && icon}
      {children && <div className={buttonText}>{children}</div>}
      {iconPosition === Right && icon}
    </AntButton>
  )
}

Button.defaultProps = {
  hierarchy: Primary,
  iconPosition: Left,
  isDisabled: false,
  isLoading: false,
  shape: Square,
  size: Middle,
  type: Filled,
}
