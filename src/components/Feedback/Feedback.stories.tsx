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
import { PiAddressBook } from 'react-icons/pi'

import { Alert } from '../Alert'
import { Button } from '../Button'
import { Feedback } from './Feedback'
import { Input } from '../Input'
import { Tag } from '../Tag'

const meta = {
  component: Feedback,
} satisfies Meta<typeof Feedback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    alert: {
      title: 'Alert title',
      description: 'This is an alert description',
      type: Alert.Type.Info,
    },
    badge: {
      extra: <Tag>Tag</Tag>,
      icon: PiAddressBook,
      title: 'Badge title',
      subtitle: 'This is a badge subtitle',
    },
    children: (
      <>
        <Input placeholder="This is an input" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button>Action</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type={Button.Type.Link}>Secondary action</Button>
        </div>
      </>
    ),
    description: 'This is a description',
    title: 'Title',
    type: Feedback.Type.Success,
  },
  decorators: [
    (_, { args }) => {
      return (
        <Feedback {...args} />
      )
    },
  ],
}
