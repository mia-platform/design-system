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
import { Flex } from 'antd'
import { PiPlaceholder } from 'react-icons/pi'

import { CardSelection, defaults } from './CardSelection'
import { Tag } from '../Tag'

const options = [
  ...Array(3).keys(),
].map((id) => ({
  title: `title ${id + 1}`,
  subtitle: `title ${id + 1}`,
  value: id + 1,
  icon: PiPlaceholder,
  content: (
    <Flex gap={8}>
      <Tag color="blue">Tag name</Tag>
      <Tag color="red">Tag name</Tag>
    </Flex>
  ),
}))

const defaultProps = {
  options,
  layout: CardSelection.Layout.Vertical,
}

const meta = {
  component: CardSelection,
  args: {
    ...defaults,
    ...defaultProps,
  },
} satisfies Meta<typeof CardSelection>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  args: {
    inputType: undefined,
  },
}

export const Horizontal: Story = {
  args: {
    inputType: undefined,
    layout: CardSelection.Layout.Horizontal,
  },
}

export const WithCustomGap: Story = {
  args: {
    gap: 64,
    inputType: undefined,
    layout: CardSelection.Layout.Horizontal,
  },
}

export const VerticalCheckbox: Story = {
  args: {
    inputType: CardSelection.InputType.Checkbox,
  },
}

export const HorizontalCheckbox: Story = {
  args: {
    inputType: CardSelection.InputType.Checkbox,
    layout: CardSelection.Layout.Horizontal,
  },
}

export const VerticalRadio: Story = {
  args: {
    inputType: CardSelection.InputType.Radio,
  },
}

export const HorizontalRadio: Story = {
  args: {
    inputType: CardSelection.InputType.Radio,
    layout: CardSelection.Layout.Horizontal,
  },
}

export const RadioWithDefaultValue: Story = {
  args: {
    defaultValue: 2,
    inputType: CardSelection.InputType.Radio,
  },
}

export const CheckboxWithDefaultValue: Story = {
  args: {
    defaultValue: [1, 3],
    inputType: CardSelection.InputType.Checkbox,
  },
}

export const CheckboxDisabled: Story = {
  args: {
    inputType: CardSelection.InputType.Checkbox,
    layout: CardSelection.Layout.Horizontal,
    isDisabled: true,
    defaultValue: [1, 3],
  },
}

export const RadioDisabled: Story = {
  args: {
    inputType: CardSelection.InputType.Radio,
    layout: CardSelection.Layout.Horizontal,
    isDisabled: true,
    defaultValue: 2,
  },
}
