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

import { MouseEvent, ReactNode } from 'react'

import { HTMLType, Hierarchy, IconPosition, Shape, Size, Type } from './Button.types'

export type ButtonProps = {

  /**
   * Fits button width to its parent width
   */
  isBlock?: boolean,

  /**
   * The children nodes to be rendered within the button context.
   */
  children?: ReactNode,

  /**
   * The form id the button should take care of submit or reset.
   */
  form?: string,

  /**
   * Defines the button hierarchy. Either:
   *
   * - "primary": button associated with the most significant (and therefore primary) action on the page;
   * - "neutral": button associated with a general purpose action;
   * - "danger": button associated with a potentially dangerous action.
   */
  hierarchy?: Hierarchy,

  /**
   * Redirect url of a link button.
   * For security reasons, the attribute "rel: 'noopener noreferrer'" is always specified.
   */
  href?: string,

  /**
   * The underlying html button type. Either:
   *
   * - "button"
   * - "reset"
   * - "submit"
   */
  htmlType?: HTMLType

  /**
   * Sets an icon for the button component.
   */
  icon?: ReactNode,

  /**
   * Defines a position for the button icon (if any). Either:
   *
   * - "left": the icon is placed to the left of the button text;
   * - "right": the icon is placed to the right of the button text.
   */
  iconPosition?: IconPosition,

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
  onClick?: (event: MouseEvent) => void,

  /**
   * Defines the button shape. Either:
   *
   * - "square": square-shaped button with rounded corners;
   * - "circle": fully rounded button, typically used for buttons containing only icon.
   */
  shape?: Shape,

  /**
   * Defines the button size. Either:
   *
   * - "small": small button - 24px in height by default;
   * - "middle": middle button - 32px in height by default;
   * - "large": large button - 48px in height by default.
   */
  size?: Size,

  /**
   * Specifies where the linked document will open when the link is clicked.
   * Only usable for link buttons together with the href property.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   */
  target?: string,

  /**
   * HTML `title` global attribute.
   */
  title?: string,

  /**
   * Defines the button type. Either:
   *
   * - "filled": button with a solid fill, typically used for primary actions;
   * - "outlined": medium-emphasis button with a stroke around the button container and no fill;
   *   typically used for secondary actions;
   * - "ghost": transparent button with no stroke;
   * - "link": button link without padding and margin;
   */
  type?: Type,

  /**
   * Indicates that the linked resource is intended to be downloaded rather than displayed in the browser.
   * If it is a string, its value specifies the file name for use in labeling the resource in the local file system.
   */
  download?: string | boolean
}
