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

import { PiAlien, PiAtom, PiCloud, PiGlobeHemisphereEast, PiGlobeHemisphereWest, PiMoon, PiPlanet, PiShield, PiSkull, PiSnowflake, PiStar, PiSun, PiSword, PiVirus, PiWind } from 'react-icons/pi'

import { Icon } from '../Icon'
import { ItemType } from './Menu.types'

const { Category, Divider, Group } = ItemType

export const item = {
  key: 'item',
  label: 'Item',
  title: 'Item',
  icon: <Icon color="currentColor" component={PiStar} size={16} />,
}

export const group = {
  key: 'group',
  label: 'Group',
  type: Group,
  icon: <Icon color="currentColor" component={PiSnowflake} size={16} />,
  children: [
    {
      key: 'group item 1',
      label: 'Group Item 1',
      title: 'Group Item 1',
      icon: <Icon color="currentColor" component={PiCloud} size={16} />,
    },
    {
      key: 'group item 2',
      label: 'Group Item 2',
      title: 'Group Item 2',
      icon: <Icon color="currentColor" component={PiWind} size={16} />,
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
      icon: <Icon color="currentColor" component={PiSun} size={16} />,
    },
    {
      key: 'category item 2',
      label: 'Category Item 2',
      title: 'Category Item 2',
      icon: <Icon color="currentColor" component={PiMoon} size={16} />,
    },
  ],
}

export const divider = {
  key: 'divider',
  type: Divider,
  dashed: false,
}

export const nestedGroup = {
  key: 'nested group 1',
  label: 'Nested Group 1',
  type: Group,
  icon: <Icon color="currentColor" component={PiAtom} size={16} />,
  children: [
    {
      key: 'nested category 1',
      label: 'Nested Category 1',
      type: Category,
      children: [
        {
          key: 'nested category item 1',
          label: 'Nested Category Item 1',
          title: 'Nested Category Item 1',
          icon: <Icon color="currentColor" component={PiGlobeHemisphereEast} size={16} />,
        },
        {
          key: 'nested category item 2',
          label: 'Nested Category Item 2',
          title: 'Nested Category Item 2',
          icon: <Icon color="currentColor" component={PiGlobeHemisphereWest} size={16} />,
        },
        {
          key: 'nested group 2',
          label: 'Nested Group 2',
          type: Group,
          icon: <Icon color="currentColor" component={PiPlanet} size={16} />,
          children: [
            {
              key: 'nested category 2',
              label: 'Nested Category 2',
              type: Category,
              children: [
                {
                  key: 'nested category item 3',
                  label: 'Nested Category Item 3',
                  title: 'Nested Category Item 3',
                  icon: <Icon color="currentColor" component={PiAlien} size={16} />,
                },
                {
                  key: 'nested category item 4',
                  label: 'Nested Category Item 4',
                  title: 'Nested Category Item 4',
                  icon: <Icon color="currentColor" component={PiVirus} size={16} />,
                },
              ],
            },
            {
              key: 'nested group 3',
              label: 'Nested Group 3',
              type: Group,
              icon: <Icon color="currentColor" component={PiSkull} size={16} />,
              children: [
                {
                  key: 'nested category 3',
                  label: 'Nested Category 3',
                  type: Category,
                  children: [
                    {
                      key: 'nested category item 5',
                      label: 'Nested Category Item 5',
                      title: 'Nested Category Item 5',
                      icon: <Icon color="currentColor" component={PiSword} size={16} />,
                    },
                    {
                      key: 'nested category item 6',
                      label: 'Nested Category Item 6',
                      title: 'Nested Category Item 6',
                      icon: <Icon color="currentColor" component={PiShield} size={16} />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
