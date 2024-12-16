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
import { PiAddressBook, PiCar } from 'react-icons/pi'
import { action } from '@storybook/addon-actions'

import { Alert as AlertComponent } from '../Alert'
import { Button } from '../Button'
import { Feedback } from './Feedback'
import { Input } from '../Input'
import { Tag } from '../Tag'
import { loremIpsum } from '../Typography/Typography.mocks'

const meta = {
  component: Feedback,
} satisfies Meta<typeof Feedback>

export default meta
type Story = StoryObj<typeof meta>

const defaults = {
  title: 'Title',
  type: Feedback.Type.Success,
}

export const Default: Story = {
  args: {
    ...defaults,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Feedback {...args} />
      )
    },
  ],
}

export const CustomIcon: Story = {
  args: {
    ...defaults,
    icon: PiCar,
    type: Feedback.Type.Special,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Feedback {...args} />
      )
    },
  ],
}

export const Loading: Story = {
  args: {
    ...defaults,
    type: Feedback.Type.Loading,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Feedback {...args} />
      )
    },
  ],
}

export const Description: Story = {
  args: {
    ...defaults,
    description: loremIpsum,
    type: Feedback.Type.Error,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Feedback {...args} />
      )
    },
  ],
}

export const Badge: Story = {
  args: {
    ...defaults,
    badge: {
      description: loremIpsum,
      extra: <Tag>Tag</Tag>,
      icon: PiAddressBook,
      title: 'Badge title',
    },
    type: Feedback.Type.Delete,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Feedback {...args} />
      )
    },
  ],
}

export const Alert: Story = {
  args: {
    ...defaults,
    alert: {
      title: 'Alert title',
      description: 'This is an alert description',
      type: AlertComponent.Type.Warning,
    },
    type: Feedback.Type.EmptyState,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Feedback {...args} />
      )
    },
  ],
}

export const Children: Story = {
  args: {
    ...defaults,
    children: (
      <>
        <Input placeholder="This is an input" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={action('click')}>Action</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type={Button.Type.Link} onClick={action('click')}>Secondary action</Button>
        </div>
      </>
    ),
    type: Feedback.Type.Generic,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Feedback {...args} />
      )
    },
  ],
}
