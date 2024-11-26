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

import { MouseEvent, ReactNode } from 'react'

import { DropdownClickEvent, ItemLayout } from '../Dropdown/props'
import { HTMLType, Hierarchy, Type } from '../Button/Button.types'
import { SplitButtonItem } from './types'

export type SplitButtonProps = {

  /**
   * Use this to focus the dropdown element.
   */
  autoFocus?: boolean

  /**
   * The children nodes to be rendered within the button context.
   */
  children?: ReactNode,

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
   * Identifies whether the button is disabled or not.
   */
  isDisabled?: boolean,

  /**
   * Sets the loading status of the button.
   */
  isLoading?: boolean,

  /**
   * Allows to control the Dropdown label layout (accepts: horizontal, vertical).
   */
  itemLayout?: ItemLayout,

  /**
   * List of items to be rendered within the Dropdown.
   *
   * Note: This component currently supports items with vertical layout
   */
  items: SplitButtonItem[]

  /**
   * callback used to notify a click on the main button.
   */
  onClick: (event: MouseEvent) => void,

  /**
   * callback used to notify a click on a dropdown item, see
   * Dropdown#onClick specification for further details.
   */
  onItemClick: (event: DropdownClickEvent) => void

  /**
   * Specifies where the linked document will open when the link is clicked.
   * Only usable for link buttons together with the href property.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   */
  target?: string,

  type?: Type,

  /**
   * HTML `title` global attribute.
   */
  title?: string
}
