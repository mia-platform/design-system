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
   * list of items to be rendered within the Dropdown.
   */
  items: DropdownItem[],

  /**
   * Whether the dropdown menu is disabled.
   */
  isDisabled?: boolean,

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
}
