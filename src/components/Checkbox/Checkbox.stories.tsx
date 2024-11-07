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

import { Checkbox } from '.'
import { defaults } from './Checkbox'

const meta = {
  component: Checkbox,
  args: {
    ...defaults,
  },
} satisfies Meta<typeof Checkbox>

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

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const IndeterminateDisabled: Story = {
  args: {
    isDisabled: true,
    isIndeterminate: true,
  },
}

export const CheckedDisabled: Story = {
  args: {
    isChecked: true,
    isDisabled: true,
  },
}

export const WithText: Story = {
  args: {
    label: 'Checkbox with text',
  },
}

export const WithTextAndDescription: Story = {
  args: {
    label: 'Checkbox with text',
    description: 'This is a description of the switch.',
  },
}

export const DisabledWithText: Story = {
  args: {
    isDisabled: true,
    label: 'Checkbox with text',
  },
}

export const DisabledWithTextAndDescription: Story = {
  args: {
    isDisabled: true,
    label: 'Checkbox with text',
    description: 'This is a description of the switch.',
  },
}

export const WithOnChange: Story = {
  args: {
    onChange: (checked) => alert(`Checkbox is now ${checked ? 'checked' : 'unchecked'}`),
  },
}
