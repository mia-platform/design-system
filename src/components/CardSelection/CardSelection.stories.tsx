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

const defaultProps = {
  title: 'Title',
  subtitle: 'Subtitle',
  icon: PiPlaceholder,
  children: (
    <Flex gap={8}>
      <Tag color="blue">Tag name</Tag>
      <Tag color="red">Tag name</Tag>
    </Flex>
  ),
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
  args: {},
}

export const Horizontal: Story = {
  args: {
    horizontal: true,
  },
}

export const VerticalCheckbox: Story = {
  args: {
    type: CardSelection.Type.Checkbox,
  },
}

export const HorizontalCheckbox: Story = {
  args: {
    type: CardSelection.Type.Checkbox,
    horizontal: true,
  },
}

export const VerticalRadio: Story = {
  args: {
    type: CardSelection.Type.Radio,
  },
}

export const HorizontalRadio: Story = {
  args: {
    type: CardSelection.Type.Radio,
    horizontal: true,
  },
}

export const CheckboxDisabled: Story = {
  args: {
    type: CardSelection.Type.Checkbox,
    horizontal: true,
    isDisabled: true,
    isChecked: true,
  },
}

export const RadioDisabled: Story = {
  args: {
    type: CardSelection.Type.Radio,
    horizontal: true,
    isDisabled: true,
    isChecked: true,
  },
}
