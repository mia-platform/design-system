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

import { Button } from '../Button'
import { Tooltip } from '.'
import { defaults } from './Tooltip'

const meta = {
  component: Tooltip,
  args: {
    ...defaults,
    title: 'Tooltip text',
    children: 'Hover me',
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const BasicExample: Story = {}

export const CustomPlacement: Story = {
  args: {
    ...meta.args,
    placement: Tooltip.Placement.BottomRight,
  },
}

export const TriggeredOnClick: Story = {
  args: {
    ...meta.args,
    trigger: Tooltip.TriggerMode.Click,
    children: <Button>{'Click me'}</Button>,
  },
}

export const HiddenWithEmptyTitle: Story = {
  args: {
    ...meta.args,
    title: '',
    children: 'Hover me, nothing will happen',
  },
}
