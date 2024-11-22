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
import { ReactElement, useEffect, useState } from 'react'

import {
  RadioGroupChangeEvent,
  RadioGroupOption,
  RadioGroupProps,
} from './props'
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

const partiallyDisabledOptions: RadioGroupOption<number>[] = [
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

const meta = {
  component: RadioGroup<number>,
  args: { options: baseOptions, defaultValue: 1, isDisabled: false },
} satisfies Meta<typeof RadioGroup<number>>

export default meta

type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {}

export const WithDescription: Story = {
  args: { options: optionsWithDescription, defaultValue: 2 },
}

export const Disabled: Story = {
  args: { options: baseOptions, defaultValue: 1, isDisabled: true },
}

export const PartiallyDisabled: Story = {
  args: { options: partiallyDisabledOptions, defaultValue: 1 },
}

export const AllOptionsDisabled: Story = {
  args: { options: allOptionsDisabled, defaultValue: 1 },
}

export const Horizontal: Story = {
  args: {
    options: baseOptions,
    direction: RadioGroup.Direction.Horizontal,
  },
}

export const WithOnChange: Story = {
  args: {
    options: baseOptions,
    defaultValue: 1,
    onChange: (event) => alert(`selected value is now ${event.value}`),
  },
}

const RadioGroupRender = ({
  value,
  options,
  defaultValue,
  isDisabled,
  onChange,
}: RadioGroupProps<number>): ReactElement => {
  const [internalValue, setInternalValue] = useState<number | undefined>(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleChange = (ev: RadioGroupChangeEvent<number>): void => {
    setInternalValue(ev.value)
    if (onChange) {
      onChange(ev)
    }
  }

  return (
    <RadioGroup
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      options={options}
      value={internalValue}
      onChange={handleChange}
    />
  )
}

export const ControlledByWrapperComponent: Story = {
  args: {
    options: baseOptions,
    value: 2,
    defaultValue: undefined,
  },
  render: (args) => {
    return <RadioGroupRender {...args} />
  },
}

type ObjectType = { a: number; b: number };

const objectOption1: ObjectType = { a: 1, b: 2 }
const objectOption2: ObjectType = { a: 3, b: 4 }

const props: RadioGroupProps<ObjectType> = {
  options: [
    { value: objectOption1, label: 'option 1' },
    { value: objectOption2, label: 'option 2' },
  ],
  defaultValue: objectOption2,
  isDisabled: false,
}

const metaObjecType = {
  component: RadioGroup<ObjectType>,
  args: props,
} satisfies Meta<typeof RadioGroup<ObjectType>>

type StoryObjectType = StoryObj<typeof metaObjecType>;

export const WithObjectValueType: StoryObjectType = {
  args: props,
}
