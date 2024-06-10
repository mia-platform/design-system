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

export const ItemTypes = {
  Category: 'group',
  Divider: 'divider',
  Item: 'item',
  SubMenu: 'submenu',
} as const
export type ItemType = (typeof ItemTypes)[keyof typeof ItemTypes] | undefined

export enum Hierarchy {
  Default = 'default',
  Primary = 'primary',
}

export enum Mode {
  Inline = 'inline',
  Vertical = 'vertical',
}
