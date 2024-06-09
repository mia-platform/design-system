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

import { ReactNode } from 'react'

/**
 * Represents a menu item within a breadcrumb.
 */
export type BreadcrumbItemMenuItem = {

  /**
   * Icon to be displayed alongside the menu item.
   */
  icon?: ReactNode;

  /**
   * Unique key for the menu item.
   */
  key?: string;

  /**
   * The label of the menu item.
   */
  label?: string;
}

export type SearchOptions = {

  /**
   * If true, allows clearing of the search input.
   */
  allowClear?: boolean;

  /**
   * Placeholder text for the search input.
   */
  placeholder?: string;

  /**
   * Callback function to handle search operations.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Represents a menu within a breadcrumb item.
 */
export type BreadcrumbItemMenu = {

  /**
   * List of menu items in the breadcrumb.
   */
  items?: BreadcrumbItemMenuItem[];

  /**
   * The key of the currently active menu item.
   */
  activeKey?: string;

  /**
  * Callback function to handle click events on menu items.
  *
  * @param key - The key of the clicked item.
  * @param event - The click event.
  */
  onClick?: (key: string, event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>) => void;

  /**
   * Indicates whether the menu is open.
   */
  open?: boolean;

  /**
   * Callback function to handle changes in dropdown visibility.
   *
   * @param open - Indicates whether the dropdown is open.
   */
  onDropdownVisibleChange?: (open: boolean) => void;

  search?: boolean | SearchOptions;

  /**
   * The DOM element where the dropdown is attached. Defaults to the Breadcrumb component itself.
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

/**
 * Represents a breadcrumb item.
 */
export type BreadcrumbItemType = {

  /**
   * Icon to be displayed alongside the breadcrumb item.
   */
  icon?: ReactNode;

  /**
   * Unique key for the breadcrumb item.
   */
  key?: string;

  /**
   * The label of the breadcrumb item, can be a string or ReactNode.
   */
  label?: ReactNode;

  /**
   * Menu associated with the breadcrumb item.
   */
  menu?: BreadcrumbItemMenu;

  /**
   * Callback function to handle click events on the breadcrumb item.
   *
   * @param event - The click event.
   */
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}
