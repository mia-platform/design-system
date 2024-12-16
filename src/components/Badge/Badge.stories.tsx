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
import { PiCircleHalfTilt } from 'react-icons/pi'

import { Badge } from './Badge'
import { Button } from '../Button'
import { Tag } from '../Tag'
import { loremIpsum } from '../Typography/Typography.mocks'

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

const defaults = {
  icon: PiCircleHalfTilt,
  description: loremIpsum,
  title: 'Title',
}

export const Default: Story = {
  args: {
    ...defaults,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Badge {...args} />
      )
    },
  ],
}

export const TitleExtra: Story = {
  args: {
    ...defaults,
    titleExtra: <Tag>Tag</Tag>,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Badge {...args} />
      )
    },
  ],
}

export const CustomTitle: Story = {
  args: {
    ...defaults,
    title: <span style={{ color: 'red', fontWeight: '600' }}>Custom title</span>,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Badge {...args} />
      )
    },
  ],
}

export const CustomSubtitle: Story = {
  args: {
    ...defaults,
    description: <span style={{ color: 'blue', textDecoration: 'underline' }}>Custom description</span>,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Badge {...args} />
      )
    },
  ],
}

export const Extra: Story = {
  args: {
    ...defaults,
    extra: <Button>Button</Button>,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Badge {...args} />
      )
    },
  ],
}

