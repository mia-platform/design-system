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

import { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react'

export enum ItemLayout {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export type DropdownItem = {

  /**
   * renders the icon in a danger fashion, with red tones.
   */
  danger?: boolean,

  /**
   * The id for the item.
   */
  id: string,

  /**
   * The label to be displayed for the item.
   */
  label: ReactNode,

  /**
   * A secondary label to be displayed for the item.
   */
  secondaryLabel?: ReactNode,

  /**
   * A Tag, displayed on the right side of the item.
   * The argument must be a Tag component, otherwise an error will be thrown.
   */
  tag?: ReactNode

  /**
   * List of sub-menu items.
   */
  children?: DropdownItem[],
}

export enum DropdownTrigger {
  Click = 'click',
  Hover = 'hover',
  ContextMenu = 'contextMenu'
}

export type DropdownClickEvent = {

  /**
   * original dom event.
   */
  domEvent: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,

  /**
   * id of the clicked item.
   */
  id: string,

  /**
   * selected item data.
   */
  item?: DropdownItem,

  /**
   * array of strings representing the selected item json path.
   */
  selectedPath: string[],
}

export enum OpenChangeInfoSource {
  Trigger = 'trigger',
  Menu = 'menu'
}

export type OpenChangeInfo = {
  source: OpenChangeInfoSource
}

export type DropdownProps = {

  /**
   * Use this to focus the dropdown element.
   */
  autoFocus?: boolean

  /**
   * The ReactElement used as anchor to trigger the Dropdown visibility.
   */
  children?: ReactElement,

  /**
   * Set to `true` to keep the selected value highlighted after the selection.
   * Useful in case you need to keep the selected option after the dropdown is closed.
   * Defaults to `true`.
   */
  persistSelection?: boolean,

  /**
   * List of items to be shown as selected at first render.
   *
   * _NOTE_: this property does not work if _persistSelection_ is set to `false`
   */
  initialSelectedItems?: string[],

  /**
   * Whether the dropdown menu is disabled.
   */
  isDisabled?: boolean,

  /**
   * list of items to be rendered within the Dropdown.
   */
  items: DropdownItem[],

  /**
   * Allows to control the Dropdown label layout (accepts: horizontal, vertical).
   */
  itemLayout?: ItemLayout,

  /**
   * control whether to allow multiple highlight selection.
   *
   * _NOTE_: this property does not work if _persistSelection_ is set to `false`
   */
  multiple?: boolean

  /**
   * @param DropdownClickEvent event contains the reference to the clicked item, specifically it holds
   * - id: the id of the item
   * - selectedPath: array of strings representing the selected item json path
   */
  onClick: (event: DropdownClickEvent) => void

  /**
   * list of triggers that can open the Dropdown (accepts: click, hover, contextMenu).
   */
  triggers?: DropdownTrigger[],

  /**
   * Called when the open state changes. Not triggered when hidden by click item.
   *
   * @param open the current open state of the Dropdown
   * @param info an object containing the `source` of the open change, that can be:
   * - trigger: the open state was changed by an external trigger
   *    (e.g. the dropdown is opening because the children was clicked, or closing because the focus was lost)
   * - menu: the open state was changed by clicking on a menu item
   *    (e.g. the dropdown is closing because a menu item was clicked)
   * @returns
   */
   onOpenChange?: (open: boolean, info: OpenChangeInfo) => void

   /**
    * To set the container of the dropdown menu.
    * The default behavior is to create a div element and append it at the end of the body,
    *  but you can reset it to the scrolling area and make a relative reposition.
    */
   getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
}
