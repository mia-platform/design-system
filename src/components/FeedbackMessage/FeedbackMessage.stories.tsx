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
import useMessage from '../../hooks/useMessage'

const meta = {
  args: { ...FeedbackMessage.defaultProps },
  component: FeedbackMessage,
} satisfies Meta<typeof FeedbackMessage>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleFeedbackMessage: Story = {
  decorators: [() => {
    const { contextHolder, loading } = useMessage()

    const onClick = (): void => {
      loading({ message: 'This is a feedback message', key: 'messageKey' })
    }

    return (
      <div>
        {contextHolder}
        <Button onClick={onClick}>Click me to show a Feedback Message</Button>
      </div >
    )
  }],
}


export const FeedbackMessageWithExtraContent: Story = {
  decorators: [() => {
    const { contextHolder, loading } = useMessage()

    const onClick = (): void => {
      loading({
        // TODO: "size" prop is correct but it is typed wrong (somehow)
        extra: <Button size={'small'}>OK</Button>,
        key: 'messageKey',
        message: 'This is a feedback message',
      })
    }

    return (
      <div>
        {contextHolder}
        <Button onClick={onClick}>Click me to show a Feedback Message</Button>
      </div >
    )
  }],
}
