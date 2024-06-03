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

import type { Meta, StoryObj } from '@storybook/react'
import { AiOutlineHome } from 'react-icons/ai'
import { FiHome } from 'react-icons/fi'
import { PiHouse } from 'react-icons/pi'

import { Icon } from '.'
import { defaults } from './Icon'

const iconsUrl = 'https://react-icons.github.io/react-icons/search'

const meta = {
  component: Icon,
  parameters: {
    design: { type: 'iframe', name: 'Search', url: iconsUrl },
  },
  args: defaults,
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

// export const Custom: Story = {
//   args: { ...meta.args, component: MiaPlatform },
// }

export const Ant: Story = {
  args: { ...meta.args, component: AiOutlineHome },
}

export const Feather: Story = {
  args: { ...meta.args, component: FiHome },
}

export const Phosphor: Story = {
  args: { ...meta.args, component: PiHouse },
}

