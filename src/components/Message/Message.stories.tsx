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
import { useState } from 'react'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { Message } from '.'
import useFeedbackMessage from '../../hooks/useFeedbackMessage'

const meta = {
  args: { ...Message.defaultProps },
  component: Message,
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const FeedbackMessage: Story = {
  decorators: [() => {
    const { contextHolder, info, loading, success, warning, error } = useFeedbackMessage()

    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {contextHolder}
        <Button
          hierarchy="neutral"
          icon={<Icon color="blue" name="PiInfo" size={16} />}
          onClick={() => info({ message: 'This is an info feedback message' })}
        >
Info
        </Button>
        <Button
          hierarchy="neutral"
          icon={<Icon color="green" name="PiCheck" size={16} />}
          onClick={() => success({ message: 'This is a success feedback message' })}
        >
Success
        </Button>
        <Button
          hierarchy="neutral"
          icon={<Icon name="PiSpinner" size={16} />}
          onClick={() => loading({ message: 'This is a loading feedback message' })}
        >
Loading
        </Button>
        <Button
          hierarchy="neutral"
          icon={<Icon color="orange" name="PiWarning" size={16} />}
          onClick={() => warning({ message: 'This is a warning feedback message' })}
        >
Warning
        </Button>
        {/* Use icons in btn */}
        <Button
          hierarchy="neutral"
          icon={<Icon color="red" name="PiStop" size={16} />}
          onClick={() => error({ message: 'This is a error feedback message' })}
        >
Error
        </Button>
      </div >
    )
  }],
}

export const FeedbackMessageWithExtraContent: Story = {
  decorators: [() => {
    const { contextHolder, success, dismiss } = useFeedbackMessage()

    const onDismiss = (): void => { dismiss('messageKey') }

    const onClick = (): void => {
      success({
        duration: 0,
        extra: <Button size={'small'} onClick={onDismiss}>Close</Button>,
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

export const ReplaceFeedbackMessages: Story = {
  decorators: [() => {
    const { contextHolder, loading, success } = useFeedbackMessage()

    const [isLoading, setIsLoading] = useState(false)

    const onCreateLoadingMessage = (): void => {
      loading({
        duration: 0,
        key: 'messageKey',
        message: 'Loading. Please wait...',
      })

      setIsLoading(true)
    }

    const onCreateSuccessMessage = (): void => {
      success({
        key: 'messageKey',
        message: 'Loading complete.',
      })

      setIsLoading(false)
    }

    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {contextHolder}
        {
          isLoading
            ? <Button onClick={onCreateSuccessMessage}>Create a Success Feedback Message</Button>
            : <Button onClick={onCreateLoadingMessage}>Create a Loading Feedback Message</Button>
        }
      </div >
    )
  }],
}
