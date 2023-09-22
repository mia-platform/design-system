import { ReactElement, ReactNode } from 'react'
import { Button as AntButton } from 'antd'

import styles from './Button.module.css'

const { ghost } = styles

export type ButtonProps = {

  /**
   * The children nodes to be rendered with the button context
   */
  children?: ReactNode,

  /**
   * Defines the button hierarchy: either 'primary', 'neutral', or 'danger' (default is 'primary')
   */
  hierarchy?: 'primary' | 'neutral' | 'danger',

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
  iconPosition?: 'left' | 'right',

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
  shape?: 'square' | 'circle',

  /**
   * Defines the button size: either 'small', 'middle', or 'large' (default is 'middle')
   */
  size?: 'small' | 'middle' | 'large',

  /**
   * Specifies where the linked document will open when the link is clicked (default is '_blank')
   */
  target?: string,

  /**
   * Defines the button type: either 'filled', 'outline', or 'ghost' (default is 'filled')
   */
  type?: 'filled' | 'outline' | 'ghost',
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
      className={type === 'ghost' ? ghost : undefined}
      danger={hierarchy === 'danger'}
      disabled={isDisabled}
      ghost={type !== 'filled' && hierarchy !== 'neutral'}
      href={href}
      icon={iconPosition === 'left' && icon}
      loading={isLoading}
      shape={shape === 'square' ? 'default' : 'circle'}
      size={size}
      target={target}
      type={hierarchy === 'neutral' ? 'default' : 'primary'}
      onClick={onClick}
    >
      {children}
      {iconPosition === 'right' && icon}
    </AntButton>
  )
}

Button.defaultProps = {
  children: undefined,
  hierarchy: 'primary' as const,
  href: undefined,
  icon: undefined,
  iconPosition: 'left' as const,
  isDisabled: false,
  isLoading: false,
  onClick: () => undefined,
  shape: 'square' as const,
  size: 'middle' as const,
  target: '_blank' as const,
  type: 'filled' as const,
}
