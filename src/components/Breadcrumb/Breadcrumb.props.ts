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
   * BreadcrumbItemType `object`:
   *   - getPopupContainer: The DOM element where the container is attached. Defaults to `document.body`. <br>
   *   `(triggerNode: HTMLElement) => HTMLElement;`
   *   - icon: Icon to be displayed alongside the breadcrumb item. <br> `ReactNode`
   *   - key: Unique key for the breadcrumb item. <br> `string`
   *   - label: The label of the breadcrumb item, can be a string or ReactNode. <br> `ReactNode`
   *   - menu: Menu associated with the breadcrumb item. <br>
   *
   *    `BreadcrumbItemMenu` `object`:
   *    - activeKey: The key of the currently active menu item. <br> `string`
   *    - items: List of menu items in the breadcrumb. <br> `BreadcrumbItemMenuItem[]` <br>
   *
   *      BreadcrumbItemMenuItem `object`:
   *        - icon: Icon to be displayed alongside the menu item. <br> `ReactNode`
   *        - key: Unique key for the menu item. <br> `string`
   *        - onClick: Callback function to handle click events on the menu item. <br>
   *        `(event: React.MouseEvent<Element, MouseEvent>) => void;`
   *        - label*: The label of the menu item. <br> `string`
   *    - onDropdownVisibleChange: Callback function to handle changes in dropdown visibility. <br>
   *    `(open: boolean) => void;`
   *    - onChangeSearch: Callback function to handle search operations. <br>
   *     `React.ChangeEventHandler<HTMLInputElement>` <br>
   *    - open: Indicates whether the menu is open. <br> `boolean`
   *    - searchAllowClear: If true, allows clearing of the search input. <br> `boolean`
   *    - searchPlaceholder: Placeholder text for the search input. <br> `string`
   *    - showSearch: If true, displays the search input within the menu. <br> `boolean`
   *   - onClick: Callback function to handle click events on the breadcrumb item. <br>
   *   `(event: React.MouseEvent<Element, MouseEvent>) => void;`
   */
  items?: BreadcrumbItemType[];

  /**
   * The DOM element where menu and collapse dropdowns are attached. Defaults to the Breadcrumb component itself.
   *
   * @param containerNode - The Breadcrumb HTML element.
   */
  getPopupContainer?: (containerNode: HTMLElement) => HTMLElement;
}
