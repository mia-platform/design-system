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
import { action } from '@storybook/addon-actions'

import { RadioGroupOption, RadioGroupProps } from './props'
import { RadioGroup } from './RadioGroup'

const baseOptions: RadioGroupOption[] = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
]

const optionsWithDescription: RadioGroupOption[] = [
  {
    label: 'Option 1',
    value: 1,
    description: 'Description 1',
  },
  {
    label: 'Option 2',
    value: 2,
    description: 'Description 2',
  },
]

const optionsPartiallyDisabled: RadioGroupOption[] = [
  {
    label: 'Option 1',
    value: 1,
    description: 'Description 1',
    disabled: true,
  },
  {
    label: 'Option 2',
    value: 2,
    description: 'Description 2',
  },
]

const allOptionsDisabled: RadioGroupOption[] = [
  {
    label: 'Option 1',
    value: 1,
    description: 'Description 1',
    disabled: true,
  },
  {
    label: 'Option 2',
    value: 2,
    description: 'Description 2',
    disabled: true,
  },
]

const getArgs = (
  options: RadioGroupOption[],
  defaultValue: number,
  disabled = false,
): RadioGroupProps => ({
  options,
  defaultValue,
  isDisabled: disabled,
  onChange: action('onChange'),
})

const meta = {
  component: RadioGroup,
  args: getArgs(baseOptions, 1),
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>;

export const Base: Story = {}

export const WithNonExistentDefaultValue: Story = {
  args: getArgs(baseOptions, 3),
}

export const WithDescription: Story = {
  args: getArgs(optionsWithDescription, 2),
}

export const Disabled: Story = {
  args: getArgs(baseOptions, 1, true),
}

export const PartiallyDisabled: Story = {
  args: getArgs(optionsPartiallyDisabled, 1),
}

export const AllOptionsDisabled: Story = {
  args: getArgs(allOptionsDisabled, 1),
}

