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
   * Callback function to handle click events on the menu item.
   *
   * @param event - The click event.
   */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>) => void;

  /**
   * The label of the menu item.
   */
  label: string;
}

/**
 * Callback type for handling search operations.
 *
 * @param value - The search input value.
 * @param event - Optional event that triggered the search.
 * @param info - Additional information about the search source.
 */

/**
 * Represents a menu within a breadcrumb item.
 */
export type BreadcrumbItemMenu = {

  /**
   * The key of the currently active menu item.
   */
  activeKey?: string;

  /**
   * List of menu items in the breadcrumb.
   */
  items?: BreadcrumbItemMenuItem[];

  /**
   * Callback function to handle changes in dropdown visibility.
   *
   * @param open - Indicates whether the dropdown is open.
   */
  onDropdownVisibleChange?: (open: boolean) => void;

  /**
   * Callback function to handle search operations.
   */
  onChangeSearch?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Indicates whether the menu is open.
   */
  open?: boolean;

  /**
   * If true, allows clearing of the search input.
   */
  searchAllowClear?: boolean;

  /**
   * Placeholder text for the search input.
   */
  searchPlaceholder?: string;

  /**
   * If true, displays the search input within the menu.
   */
  showSearch?: boolean;
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
