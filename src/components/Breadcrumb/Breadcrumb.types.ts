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

import { ReactNode } from 'react'

import { IconComponent } from '../Icon/Icon.props'

export type BreadcrumbItemMenuItem = {

  /**
   * Icon to be displayed alongside the menu item.
   */
  icon?: IconComponent;

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
   * Indicates whether the menu is open for a controlled behavior.
   */
  isOpen?: boolean;

  /**
   * Callback function to handle changes in dropdown visibility.
   *
   * @param open - Indicates whether the dropdown is open.
   */
  onDropdownVisibleChange?: (open: boolean) => void;

  /**
   * Searchbar visibility and options.
   */
  search?: boolean | SearchOptions;

  /**
   * Text to show if menu is empty or search matched no elements. Defaults to "No items".
   */
  emptyText?: string

  /**
   * Custom footer content to display at the bottom of the menu dropdown.
   */
  footer?: ReactNode
}

export type BreadcrumbItemType = {

  /**
   * Icon to be displayed alongside the breadcrumb item.
   */
  icon?: IconComponent;

  /**
   * Unique key for the breadcrumb item.
   */
  key?: string;

  /**
   * The label of the breadcrumb item.
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

export type BreadcrumbCollapsedItem = {
  type: 'collapsed'
  items: BreadcrumbItemType[]
}

export type BreadcrumbButton = BreadcrumbItemType | BreadcrumbCollapsedItem
