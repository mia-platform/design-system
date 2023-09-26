import { ReactElement, ReactNode, useMemo } from 'react'
import { Button as AntButton } from 'antd'
import classnames from 'classnames'

import { ButtonHierarchies, ButtonIconPositions, ButtonShapes, ButtonSizes, ButtonTypes } from './Button.types'
import styles from './Button.module.css'

const { button, buttonSm, buttonMd, buttonLg, buttonGhost, buttonText } = styles

const { Primary, Neutral, Danger } = ButtonHierarchies
const { Left, Right } = ButtonIconPositions
const { Square } = ButtonShapes
const { Small, Middle, Large } = ButtonSizes
const { Filled, Ghost } = ButtonTypes

export type ButtonType = {

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
}: ButtonType): ReactElement => {
  const buttonClassNames = useMemo(() => (
    [
      button,
      children && size === Small && buttonSm,
      children && size === Middle && buttonMd,
      children && size === Large && buttonLg,
      type === Ghost && buttonGhost,
    ].filter(Boolean)
  ), [children, size, type])

  /**
   * rel: 'noopener noreferrer'
   *
   * @link https://github.com/ant-design/ant-design/blob/master/components/button/button.tsx#L259
   */
  return (
    <AntButton
      {...href && { href, rel: 'noopener noreferrer', target }}
      className={classnames(buttonClassNames)}
      danger={hierarchy === Danger}
      disabled={isDisabled}
      ghost={type !== Filled && hierarchy !== Neutral}
      loading={isLoading}
      shape={shape === Square ? 'default' : 'circle'}
      size={size}
      type={hierarchy === Neutral ? 'default' : 'primary'}
      onClick={onClick}
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
