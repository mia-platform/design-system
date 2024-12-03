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

import { CardSelectionList } from '../CardSelection/CardSelectionList.tsx'
import { Tag } from '../Tag'

const options = [
  ...Array(3).keys(),
].map((id) => ({
  title: `title ${id + 1}`,
  subtitle: `title ${id + 1}`,
  value: id + 1,
  icon: PiPlaceholder,
  children: (
    <Flex gap={8}>
      <Tag color="blue">Tag name</Tag>
      <Tag color="red">Tag name</Tag>
    </Flex>
  ),
}))

const meta = {
  // decorators: (story) => <Flex justify="center">{story()}</Flex>,
  component: CardSelectionList,
  args: {
    options,
  },
} satisfies Meta<typeof CardSelectionList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options,
  },
}

export const Radio: Story = {
  args: {
    type: CardSelectionList.Type.Radio,
    options,
  },
}

export const Checkbox: Story = {
  args: {
    type: CardSelectionList.Type.Checkbox,
    options,
  },
}

