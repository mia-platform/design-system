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

import { BreadcrumbItemType } from './Breadcrumb.types'

/**
 * Represents the props for a breadcrumb component.
 */
export type BreadcrumbProps = {

  /**
   * Indicates whether the component is loading or not.
   */
  isLoading?: boolean;

  /**
   * The list of breadcrumb items.
   *
   * `object`:
   *   - icon: icon to be displayed alongside the breadcrumb item. <br> `ReactNode`
   *   - key: unique key for the breadcrumb item. If not specified defaults to item index. <br> `string`
   *   - label: the label of the breadcrumb item. <br> `ReactNode`
   *   - onClick: callback function to handle click events on the breadcrumb item. <br>
   *   `(event: React.MouseEvent<Element, MouseEvent>) => void`
   *   - menu: menu associated with the breadcrumb item. <br>
   *   `object`:
   *     - activeKey: the key of the currently active menu item. <br> `string`
   *     - onClick: callback function to handle click events on the menu item. <br>
   *     `(event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<HTMLElement>) => void`
   *     - open: indicates whether the menu is open for a controlled behavior. <br> `boolean`
   *     - onDropdownVisibleChange: callback function to handle changes in dropdown visibility. <br>
   *     `(open: boolean) => void`
   *     - emptyText: text to show if menu is empty or search matched no elements. Defaults to "No items" <br>
   *     `string`
   *     - search: searchbar visibility and options. <br>
   *     `boolean | object`:
   *       - onChange: callback function to handle search operations. <br>
   *       `React.ChangeEventHandler<HTMLInputElement>`
   *       - allowClear: if true, allows clearing of the search input. <br> `boolean`
   *       - placeholder: placeholder text for the search input. <br> `string`
   *     - items: list of menu items in the breadcrumb. <br>
   *     `object[]`:
   *       - icon: icon to be displayed alongside the menu item. <br> `ReactNode`
   *       - key: unique key for the menu item. If not specified defaults to item index. <br> `string`
   *       - label: label of the menu item. <br> `string`
   */
  items?: BreadcrumbItemType[];

  /**
   * The DOM element where menu and collapse dropdowns are attached. Defaults to the Breadcrumb component itself.
   *
   * @param containerNode - The Breadcrumb HTML element.
   */
  getPopupContainer?: (containerNode: HTMLElement) => HTMLElement;
}
