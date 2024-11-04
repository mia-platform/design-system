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

import { Size } from './Switch.types'
import { Switch } from '.'
import { defaults } from './Switch'

// NOTE: we are not using the `actions` addon here to simulate the onClick and onChange props
// because it is causing glitches in the switch animation.
// We are reproducing the addon's behaviour by logging the function parameters in the dev console.

const meta = {
  component: Switch,
  args: {
    ...defaults,
    // eslint-disable-next-line no-console
    onChange: (...params) => { console.log('onChange params: ', params) },
    // eslint-disable-next-line no-console
    onClick: (...params) => { console.log('onClick params: ', params) },
  },
  argTypes: {
    description: { type: 'string' },
    text: { type: 'string' },
    onClick: { control: false },
    onChange: { control: false },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const BasicExample: Story = {}

export const CheckedOnFirstRender: Story = {
  args: {
    isInitiallyChecked: true,
  },
}

export const ControlledCheckedState: Story = {
  args: {
    isChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const CheckedDisabled: Story = {
  args: {
    isChecked: true,
    isDisabled: true,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const CheckedLoading: Story = {
  args: {
    isChecked: true,
    isLoading: true,
  },
}

export const WithText: Story = {
  args: {
    text: 'Switch with text',
  },
}

export const WithTextAndDescription: Story = {
  args: {
    text: 'Switch with text',
    description: 'This is a description of the switch.',
  },
}

export const SmallSize: Story = {
  args: {
    size: Size.Small,
  },
}

export const SmallSizeWithText: Story = {
  args: {
    size: Size.Small,
    text: 'Switch with text',
  },
}

export const SmallSizeWithTextAndDescription: Story = {
  args: {
    size: Size.Small,
    text: 'Switch with text',
    description: 'This is a description of the switch.',
  },
}

export const WithOnChange: Story = {
  args: {
    onChange: (checked) => alert(`Switch is now ${checked ? 'checked' : 'unchecked'}`),
  },
}

export const WithOnClick: Story = {
  args: {
    onClick: () => alert('Switch has been clicked'),
  },
}
