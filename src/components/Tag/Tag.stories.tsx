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

import { Meta, StoryObj } from '@storybook/react'

import { Tag } from '.'
import { defaults } from './Tag'

const meta = {
  component: Tag,
  args: {
    ...defaults,
    children: 'Tag text',
  },
  argTypes: {
    children: { control: false },
    closeIcon: { type: 'boolean' },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const BasicExample: Story = {}

export const Colored: Story = {
  args: {
    color: 'magenta',
  },
}

export const Bordered: Story = {
  args: {
    isBordered: true,
  },
}

export const WithDefaultCloseIcon: Story = {
  args: {
    closeIcon: true,
  },
}

export const WithCustomCloseIcon: Story = {
  args: {
    closeIcon: <span>X</span>,
  },
}

