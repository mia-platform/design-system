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

import { Hierarchy, Size } from '../Button/Button.types'
import { Button } from '../Button'
import { FeedbackMessage } from '.'
import { Icon } from '../Icon'
import { Position } from '../../hooks/useFeedbackMessage/useFeedbackMessage.types'
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage'

const meta = {
  args: {
    message: 'This is a Feedback Message',
  },
  component: FeedbackMessage,
} satisfies Meta<typeof FeedbackMessage>

export default meta
type Story = StoryObj<typeof meta>

export const FeedbackMessages: Story = {
  decorators: [(_Story, context) => {
    const { info, loading, success, warning, error } = useFeedbackMessage()

    const { message } = context.args

    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        <Button
          hierarchy={Hierarchy.Neutral}
          icon={<Icon color="blue" name="PiInfo" size={16} />}
          onClick={() => info({ message })}
        >
          Info
        </Button>
        <Button
          hierarchy={Hierarchy.Neutral}
          icon={<Icon color="green" name="PiCheck" size={16} />}
          onClick={() => success({ message })}
        >
          Success
        </Button>
        <Button
          hierarchy={Hierarchy.Neutral}
          icon={<Icon name="PiSpinner" size={16} />}
          onClick={() => loading({ message })}
        >
          Loading
        </Button>
        <Button
          hierarchy={Hierarchy.Neutral}
          icon={<Icon color="orange" name="PiWarning" size={16} />}
          onClick={() => warning({ message })}
        >
          Warning
        </Button>
        <Button
          hierarchy={Hierarchy.Neutral}
          icon={<Icon color="red" name="PiXCircle" size={16} />}
          onClick={() => error({ message })}
        >
          Error
        </Button>
      </div >
    )
  }],
}

export const FeedbackMessageWithExtraContent: Story = {
  decorators: [(_Story, context) => {
    const { message } = context.args

    const { success, dismiss } = useFeedbackMessage()

    const onDismiss = (): void => { dismiss('messageKey') }

    const onClick = (): void => {
      success({
        extra: <Button size={Size.Small} onClick={onDismiss}>Dismiss</Button>,
        key: 'messageKey',
        message,
        sticky: true,
      })
    }

    return <Button onClick={onClick}>Click me to show a Feedback Message</Button>
  }],
}

export const FeedbackMessageAtTheBottomOfThePage: Story = {
  decorators: [(_Story, context) => {
    const { info, dismiss } = useFeedbackMessage()

    const { message } = context.args

    return (
      <div style={{ display: 'flex', gap: 4 }}>
        <Button
          hierarchy={Hierarchy.Neutral}
          onClick={() => info({ message, position: Position.Bottom, duration: 10 })}
        >
          Open
        </Button>
        <Button
          hierarchy={Hierarchy.Neutral}
          onClick={() => dismiss()}
        >
          Dismiss
        </Button>
      </div>
    )
  }],
}

export const ReplaceFeedbackMessages: Story = {
  decorators: [() => {
    const { loading, success } = useFeedbackMessage()

    const [isLoading, setIsLoading] = useState(false)

    const MESSAGE_KEY = 'MESSAGE_KEY'
    const DURATION = 5

    const onCreateLoadingMessage = (): void => {
      loading({
        key: MESSAGE_KEY,
        message: 'Loading. Please wait...',
        duration: DURATION,
      })

      setTimeout(() => setIsLoading(false), 1000 * DURATION)
      setIsLoading(true)
    }

    const onCreateSuccessMessage = (): void => {
      success({
        key: MESSAGE_KEY,
        message: 'Loading complete.',
      })

      setIsLoading(false)
    }

    return (
      <div style={{ display: 'flex', gap: 4 }}>
        {
          isLoading
            ? <Button onClick={onCreateSuccessMessage}>Create a Success Feedback Message</Button>
            : <Button onClick={onCreateLoadingMessage}>Create a Loading Feedback Message</Button>
        }
      </div >
    )
  }],
}
