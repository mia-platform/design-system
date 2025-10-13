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

import { Placement } from './types'
import { Size } from '../../themes/schema/shape'

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
   * Optional icon for the menu item
   */
  icon?: ReactNode

  /**
   * The id for the item.
   */
  id: string,

  /**
   * The label to be displayed for the item.
   *
   * When the automatic dropdown search is enabled via the `isSearchable` prop,
   * it will only filter items with a **string** or **number** label.
   * For labels that are ReactNodes, filtering must be handled externally via the `onSearch` callback.
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
   * Whether menu item is disabled
   */
  disabled?: boolean

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

/**
 * Each FooterAction is rendered as a button with the provided configuration
 */
export type FooterAction = {

  /**
   * Optional icon
   * */
  icon?: ReactNode

  /**
   * label displayed
   * */
  label?: ReactNode

  /**
   * callback invoked on click.
   */
  onClick: () => void
}

export type DropdownHeader = {

  /**
   * Content displayed **above** the search input (if visible via `isSerchable` prop).
   * if the search input is not visible should be provided only one of `top` or `bottom` props.
   */
  top?: ReactNode

  /**
   * Content displayed **below** the search input (if visible via `isSerchable` prop).
   * if the search input is not visible should be provided only one of `top` or `bottom` props.
   */
  bottom?: ReactNode
}

export type DropdownFooter = {

  /**
   * Optional list of actions, they are rendered between the top and bottom nodes.
   */
  actions?: FooterAction[]

  /**
   * Optional node to be rendered at the bottom of the footer.
   */
  bottom?: ReactNode

  /**
   * Optional node to be rendered at the top of the footer.
   */
  top?: ReactNode
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
  children?: ReactElement

  /**
   * Optional header configuration.
   */
  header?: DropdownHeader

  /**
   * Optional footer configuration.
   */
  footer?: DropdownFooter

  /**
   * Set to `true` to keep the selected value highlighted after the selection.
   * Useful in case you need to keep the selected option after the dropdown is closed.
   * Defaults to `true`.
   */
  persistSelection?: boolean

  /**
   * List of items to be shown as selected at first render.
   *
   * _NOTE_: this property does not work if _persistSelection_ is set to `false`
   */
  initialSelectedItems?: string[]

  /**
   * Whether the dropdown menu is disabled.
   */
  isDisabled?: boolean

  /**
   * list of items to be rendered within the Dropdown.
   */
  items: DropdownItem[]

  /**
   * Allows to control the Dropdown label layout (accepts: horizontal, vertical).
   */
  itemLayout?: ItemLayout

  /**
   * Sets the max height for the menu item list, this is useful to prevent creating
   * a dropdown with many items that may be too big (default: 240px).
   */
  menuItemsMaxHeight?: Size

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
  triggers?: DropdownTrigger[]

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

  /**
   * The placement of the dropdown menu, one of:
   *
   *  `Placement.TopLeft`, `Placement.TopRight`, `Placement.BottomLeft`,
   *  `Placement.BottomRight`, `Placement.Top`, `Placement.Bottom`
   *
   * Defaults to `Placement.BottomLeft`
   */
  placement?: Placement

  /**
   * Enables a search input for filtering items in the component.
   *
   * - If `onSearch` is **not** provided, the component applies its own
   *   built-in filtering (case-insensitive substring match on string labels).
   * - If `onSearch` **is** provided, filtering is delegated to the parent
   *   component via the callback.
   */
  isSearchable?: boolean

  /**
   * Called when the user submits a search query.
   *
   * Providing this prop overrides the component's built-in filtering logic,
   * allowing the parent component to handle search behavior.
   *
   * @param query - The text entered by the user into the search input.
   */
  onSearch?: (query: string) => void

  /**
   * Placeholder text to show inside the search input.
   * Default to 'Search...'
   */
  searchPlaceholder?: string

  /**
   * Whether the component should show a loading state.
   */
  isLoading?: boolean

  /**
   * Whether the component should show an error state.
   */
  hasError?: boolean

  /**
   * Error message to display when `hasError` is true.
   * Default to 'An error occurred'
   */
  errorMessage?: string

  /**
   * Callback fired when the user retries after an error.
   *
   * @param query - The last search query string, if available.
   */
  onRetry?: (query: string) => void

  /**
   * Enables infinite scrolling functionality for the dropdown.
   * When enabled, the `onScrollEndReached` callback will be triggered
   * when the user scrolls near the bottom of the items list.
   */
  isInfiniteScrollEnabled?: boolean

  /**
   * Callback fired when the user scrolls near the bottom of the dropdown items.
   * This is typically used to load more items for infinite scrolling.
   * Only triggered when `isInfiniteScrollEnabled` is true.
   */
  onScrollEndReached?: () => void

  /**
   * Additional items to append to the existing dropdown items.
   * These items are typically loaded asynchronously and added to the dropdown
   * when infinite scrolling loads more data.
   */
  incrementalItems?: DropdownItem[]

  /**
   * Indicates whether additional items are currently being loaded.
   * When true, a loading skeleton is displayed at the bottom of the dropdown
   * to provide visual feedback during the loading process.
   */
  isLoadingIncrementalItems?: boolean

  /**
   * Distance in pixels from the bottom of the scrollable area
   * that triggers the `onScrollEndReached` callback.
   * Defaults to 32 pixels.
   */
  scrollThreshold?: number
};
