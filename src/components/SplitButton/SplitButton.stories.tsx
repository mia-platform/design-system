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

import type { Meta, StoryObj } from '@storybook/react'
import { PiAcorn } from 'react-icons/pi'
import { action } from '@storybook/addon-actions'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { SplitButton } from './SplitButton'
import { SplitButtonProps } from './props'

const defaults: Partial<SplitButtonProps> = {
  children: 'click me',
  items: [{
    icon: <Icon component={PiAcorn} size={16} />,
    id: 'id1',
    label: 'Action 1',
  }, {
    id: 'id2',
    label: 'Action 2',
  }],
  onClick: action('on click'),
  onItemClick: action('on item click'),
}

const meta = {
  component: SplitButton,
  args: defaults,
  argTypes: {},
  render: (_, { args }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <SplitButton {...args} />
    </div>
  ),
} satisfies Meta<typeof SplitButton>

type Story = StoryObj<typeof meta>

export default meta

export const BasicExample: Story = {}

export const PrimaryFilled: Story = {
  args: {
    hierarchy: Button.Hierarchy.Primary,
  },
}
export const Neutral: Story = {
  args: {
    hierarchy: Button.Hierarchy.Neutral,
  },
}
export const Danger: Story = {
  args: {
    hierarchy: Button.Hierarchy.Danger,
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
