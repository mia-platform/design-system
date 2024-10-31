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

import { RadioGroupChangeEvent, RadioGroupOption, RadioGroupProps } from './props'
import { RadioGroup } from './RadioGroup'

const baseOptions: RadioGroupOption<number>[] = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
]

const optionsWithDescription: RadioGroupOption<number>[] = [
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

const optionsPartiallyDisabled: RadioGroupOption<number>[] = [
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

const allOptionsDisabled: RadioGroupOption<number>[] = [
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

const getArgs = <T, >(
  options: RadioGroupOption<T>[],
  defaultValue: T,
  disabled = false,
  onChange?: (changeEvent: RadioGroupChangeEvent<T>) => void
): RadioGroupProps<T> => ({
    options,
    defaultValue,
    isDisabled: disabled,
    onChange,
  })

const meta = {
  component: RadioGroup<number>,
  args: getArgs<number>(baseOptions, 1),
} satisfies Meta<typeof RadioGroup<number>>

export default meta

type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {}

export const WithNonExistentDefaultValue: Story = {
  args: getArgs<number>(baseOptions, 3),
}

export const WithDescription: Story = {
  args: getArgs<number>(optionsWithDescription, 2),
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

const onChange: (changeEvent: RadioGroupChangeEvent<number>) => void = (event) => alert(`selected value is now ${event.value}`)
export const WithOnChange: Story = {
  args: getArgs(baseOptions, 1, false, onChange),
}

type MoreComplexType = { a: number; b: number };

const objectOption1: MoreComplexType = { a: 1, b: 2 }
const objectOption2: MoreComplexType = { a: 3, b: 4 }

const props: RadioGroupProps<MoreComplexType> = {
  options: [
    { value: objectOption1, label: 'option 1' },
    { value: objectOption2, label: 'option 2' },
  ],
  defaultValue: objectOption2,
  isDisabled: false,
}

const metaO = {
  component: RadioGroup<MoreComplexType>,
  args: props,
} satisfies Meta<typeof RadioGroup<MoreComplexType>>

type StoryO = StoryObj<typeof metaO>;

export const WithObjectValueType: StoryO = {
  args: props,
}
