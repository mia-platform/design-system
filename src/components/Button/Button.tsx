import { ReactElement, ReactNode } from 'react'
import { Button as AntButton } from 'antd'

import { ButtonHierarchies, ButtonIconPositions, ButtonShapes, ButtonSizes, ButtonTypes } from './utils'
import styles from './Button.module.css'

const { Primary, Neutral, Danger } = ButtonHierarchies
const { Left, Right } = ButtonIconPositions
const { Square } = ButtonShapes
const { Middle } = ButtonSizes
const { Filled, Ghost } = ButtonTypes

export type ButtonProps = {

  /**
   * The children nodes to be rendered with the button context
   */
  children?: ReactNode,

  /**
   * Defines the button hierarchy: either 'primary', 'neutral', or 'danger' (default is 'primary')
   */
  hierarchy?: ButtonHierarchies,

  /**
   * Redirect url of a link button
   */
  href?: string,

  /**
   * Sets an icon component for the button
   */
  icon?: ReactNode,

  /**
   * Defines a position for the button icon (if any): either 'left' or 'right' (default is 'left')
   */
  iconPosition?: ButtonIconPositions,

  /**
   * Identifies whether the button is disabled or not
   */
  isDisabled?: boolean,

  /**
   * Sets the loading status of the button
   */
  isLoading?: boolean,

  /**
   * Sets the handler to handle a click event
   */
  onClick?: () => void,

  /**
   * Defines the button shape: either 'square' or 'circle' (default is 'square')
   */
  shape?: ButtonShapes,

  /**
   * Defines the button size: either 'small', 'middle', or 'large' (default is 'middle')
   */
  size?: ButtonSizes,

  /**
   * Specifies where the linked document will open when the link is clicked (default is '_blank')
   */
  target?: string,

  /**
   * Defines the button type: either 'filled', 'outline', or 'ghost' (default is 'filled')
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
  return (
    <AntButton
      className={type === Ghost ? styles['button-ghost'] : undefined}
      danger={hierarchy === Danger}
      disabled={isDisabled}
      ghost={type !== Filled && hierarchy !== Neutral}
      href={href}
      loading={isLoading}
      rel="noopener noreferrer"
      shape={shape === Square ? 'default' : 'circle'}
      size={size}
      target={target}
      type={hierarchy === Neutral ? 'default' : 'primary'}
      onClick={onClick}
    >
      {iconPosition === Left && icon}
      {children}
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
  target: '_blank' as const,
  type: Filled,
}
