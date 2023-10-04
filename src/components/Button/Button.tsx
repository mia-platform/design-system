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

import { ReactElement, ReactNode, useMemo } from 'react'
import { Button as AntButton } from 'antd'
import classnames from 'classnames'

import { ButtonHierarchies, ButtonIconPositions, ButtonShapes, ButtonSizes, ButtonTypes } from './Button.types'
import styles from './Button.module.css'

const { button, buttonSm, buttonSmIconOnly, buttonMd, buttonMdIconOnly, buttonLg, buttonGhost, buttonText } = styles

const { Primary, Neutral, Danger } = ButtonHierarchies
const { Left, Right } = ButtonIconPositions
const { Square } = ButtonShapes
const { Small, Middle, Large } = ButtonSizes
const { Filled, Ghost } = ButtonTypes

export type ButtonProps = {

  /**
   * The children nodes to be rendered within the button context.
   */
  children?: ReactNode,

  /**
   * Defines the button hierarchy. Either:
   *
   * - primary: button associated with the most significant (and therefore primary) action on the page;
   * - neutral: button associated with a general purpose action;
   * - danger: button associated with a potentially dangerous action.
   */
  hierarchy?: ButtonHierarchies,

  /**
   * Redirect url of a link button.
   * For security reasons, the attribute "rel: 'noopener noreferrer'" is always specified.
   */
  href?: string,

  /**
   * Sets an icon for the button component.
   */
  icon?: ReactNode,

  /**
   * Defines a position for the button icon (if any). Either:
   *
   * - left: the icon is placed to the left of the button text;
   * - right: the icon is placed to the right of the button text.
   */
  iconPosition?: ButtonIconPositions,

  /**
   * Identifies whether the button is disabled or not.
   */
  isDisabled?: boolean,

  /**
   * Sets the loading status of the button.
   */
  isLoading?: boolean,

  /**
   * Sets the handler to handle a click event.
   */
  onClick?: () => void,

  /**
   * Defines the button shape. Either:
   *
   * - square: square-shaped button with rounded corners;
   * - circle: fully rounded button, typically used for buttons containing only icon.
   */
  shape?: ButtonShapes,

  /**
   * Defines the button size. Either:
   *
   * - small: small button - 24px in height by default;
   * - middle: middle button - 32px in height by default;
   * - large: large button - 48px in height by default.
   */
  size?: ButtonSizes,

  /**
   * Specifies where the linked document will open when the link is clicked.
   * Only usable for link buttons together with the href property.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   */
  target?: string,

  /**
   * Defines the button type. Either:
   *
   * - filled: button with a solid fill, typically used for primary actions;
   * - outlined: medium-emphasis button with a stroke around the button container and no fill,
   *   typically used for secondary actions;
   * - ghost: transparent button with no stroke, typically used for links.
   */
  type?: ButtonTypes,
}

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
