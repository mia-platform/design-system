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

import { Icon } from '../Icon'
import { ItemType } from './Menu.types'

const { Category, Divider, Group } = ItemType

export const item = {
  key: 'item',
  label: 'Item',
  title: 'Item',
  icon: <Icon color="currentColor" name="PiStar" size={16} />,
}

export const group = {
  key: 'group',
  label: 'Group',
  type: Group,
  icon: <Icon color="currentColor" name="PiSnowflake" size={16} />,
  children: [
    {
      key: 'group item 1',
      label: 'Group Item 1',
      title: 'Group Item 1',
      icon: <Icon color="currentColor" name="PiCloud" size={16} />,
    },
    {
      key: 'group item 2',
      label: 'Group Item 2',
      title: 'Group Item 2',
      icon: <Icon color="currentColor" name="PiWind" size={16} />,
    },
  ],
}

export const category = {
  key: 'category',
  label: 'Category',
  type: Category,
  children: [
    {
      key: 'category item 1',
      label: 'Category Item 1',
      title: 'Category Item 1',
      icon: <Icon color="currentColor" name="PiSun" size={16} />,
    },
    {
      key: 'category item 2',
      label: 'Category Item 2',
      title: 'Category Item 2',
      icon: <Icon color="currentColor" name="PiMoon" size={16} />,
    },
  ],
}

export const divider = {
  key: 'divider',
  type: Divider,
  dashed: false,
}
