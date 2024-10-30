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

import { InputNumber } from '.'

const meta = {
  component: InputNumber,
  args: {
    placeholder: 'Placeholder...',
  },
  argTypes: {
  },
} satisfies Meta<typeof InputNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Borderless: Story = {
  args: {
    appearance: InputNumber.Appearance.Borderless,
  },
}

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
  },
}

export const Error: Story = {
  args: {
    isError: true,
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const WithMin: Story = {
  args: {
    min: 0,
    defaultValue: 0,
  },
}

export const WithMax: Story = {
  args: {
    max: 10,
    defaultValue: 10,
  },
}

export const WithPrecision: Story = {
  args: {
    precision: 2,
    defaultValue: 10,
  },
}

export const WithStep: Story = {
  args: {
    step: 2,
    defaultValue: 2,
  },
}

