import { ReactElement, ReactNode, useMemo } from 'react'
import { Button as AntButton } from 'antd'
import classnames from 'classnames'

import { ButtonHierarchies, ButtonIconPositions, ButtonShapes, ButtonSizes, ButtonTypes } from './Button.types'
import styles from './Button.module.css'

const { Primary, Neutral, Danger } = ButtonHierarchies
const { Left, Right } = ButtonIconPositions
const { Square } = ButtonShapes
const { Small, Middle, Large } = ButtonSizes
const { Filled, Ghost } = ButtonTypes

export type ButtonProps = {

  /**
   * The children nodes to be rendered with the button context.
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
   */
  href?: string,

  /**
   * Sets an icon component for the button.
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
   * - small: small button - 24px in height;
   * - middle: middle button - 32px in height;
   * - large: large button - 48px in height.
   */
  size?: ButtonSizes,

  /**
   * Specifies where the linked document will open when the link is clicked (default is '_blank').
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
 * UI component for presenting buttons
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
  const buttonClassNames = useMemo(() => (
    [
      children && size === Small && styles['button-sm'],
      children && size === Middle && styles['button-md'],
      children && size === Large && styles['button-lg'],
      type === Ghost && styles['button-ghost'],
    ].filter(Boolean)
  ), [children, size, type])

  const buttonText = useMemo(() => (
    children && <div className={styles['button-text']}>
      {children}
    </div>
  ), [children])

  const buttonWithIcon = useMemo(() => (
    <div className={styles['button-with-icon']}>
      {iconPosition === Left && icon}
      {buttonText}
      {iconPosition === Right && icon}
    </div>
  ), [buttonText, icon, iconPosition])

  return (
    <AntButton
      className={classnames(buttonClassNames)}
      danger={hierarchy === Danger}
      disabled={isDisabled}
      ghost={type !== Filled && hierarchy !== Neutral}
      href={href}
      loading={isLoading}
      rel={'noopener noreferrer'}
      shape={shape === Square ? 'default' : 'circle'}
      size={size}
      target={target}
      type={hierarchy === Neutral ? 'default' : 'primary'}
      onClick={onClick}
    >
      {icon ? buttonWithIcon : buttonText}
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
  target: '_blank' as const,
  type: Filled,
}
