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

import { Button } from '../Button'
import { FeedbackMessage } from '.'

const meta = {
  args: { ...FeedbackMessage.defaultProps },
  component: FeedbackMessage,
} satisfies Meta<typeof FeedbackMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    status: 'success',
    message: 'This is a success feedback message',
    duration: 3,
  },
}

export const Loading: Story = {
  args: {
    status: 'loading',
    message: 'This is a loading feedback message',
    duration: 3,
  },
}

export const Warning: Story = {
  args: {
    status: 'warning',
    message: 'This is a warning feedback message',
    duration: 3,
  },
}

export const Error: Story = {
  args: {
    status: 'error',
    message: 'This is a error feedback message',
    duration: 3,
  },
}

export const WithAdditionalContent: Story = {
  args: {
    status: 'success',
    message: 'This is a feedback message',
    extra: <Button>Button</Button>,
    duration: 3,
  },
}

export const SequentialFeedbackMessagesStory: Story = {
  args: { ...FeedbackMessage.defaultProps },
  decorators: [() => {
    let isLoading = true
    setTimeout(() => (isLoading = false), 5000)

    return (
      <div>
        {isLoading && <FeedbackMessage message="Loading" status="loading" />}
        {!isLoading && <FeedbackMessage message="Success" status="success" />}
      </div >
    )
  }],
}
