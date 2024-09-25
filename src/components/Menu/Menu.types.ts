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

import { Key, ReactNode } from 'react'

export enum ItemType {
  Category = 'category',
  Divider = 'divider',
  Group = 'group'
}

export enum Hierarchy {
  Default = 'default',
  Primary = 'primary',
}

export enum Mode {
  Inline = 'inline',
  Vertical = 'vertical',
}

// Remapped from: https://github.com/ant-design/ant-design/blob/master/components/menu/interface.ts#L8
export type AntdMenuItemType = {
  danger?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  key: Key;
  title?: string;
  children?: AntdMenuItemType[]
}

/**
 * Represents a menu item, extending the base type {@link MenuItemType}.
 *
 * @see {@link https://ant.design/components/menu#menuitemtype}
 */
export type Item = AntdMenuItemType & {

  /**
   * The type of the menu item.
   */
  type?: ItemType;

  /**
   * An array of child items for nested menus.
   */
  children?: Item[];

  /**
   * optional extra to be appended to the menu item
   */
  extra?: ReactNode
}
