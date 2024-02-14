/**
 * Copyright 2023 Mia srl
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

import { useCallback, useMemo } from 'react'
import { message } from 'antd'

import { FeedbackMessage } from './useFeedbackMessage.types'
import { FeedbackMessageProps } from './useFeedbackMessage.props'
import { Message } from '../../components/Message'

type FeedbackMessageType = 'loading' | 'info' | 'success' | 'warning' | 'error'

/**
 * A hook that allow to display global informative messages to the user at the top of the page. It is intended
 * to give user feedbacks on a certain operation executed or information regarding the context of the application.
 *
 * The hook returns several methods to be used to show a message of different type
 * (each type will use a different icon) or to manually remove rendered messages.
 *
 * @example
 * export const Component(props: {...}) => {
 *  // When called, show a FeedbackMessagea
 *  const onClick = (): void => {
 *    success({
 *      extra: <Button size={Size.Small} onClick={onDismiss}>Close</Button>,
 *      key: 'messageKey',
 *      message: 'This is a feedback message',
 *    })
 *  }
 *
 *  // When called, remove the FeedbackMessage, if still there
 *  const onDismiss = (): void => { dismiss('messageKey') }
 *
 *  return (
*      <div>
*       {...}
*       <Button onClick={onClick}>Click me to show a Feedback Message</Button>
*      </div>
 *  )
 * }
 *
 * @returns {FeedbackMessage} An object including several functions to call to
 * manage the rendering of feedback messages.
 */
export const useFeedbackMessage = (): FeedbackMessage => {
  const open = useCallback((type: FeedbackMessageType, props: FeedbackMessageProps): void => {
    const { key, duration, sticky, ...messageProps } = props

    message.open({
      content: <Message extra={messageProps.extra} message={messageProps.message} />,
      duration: sticky ? 0 : duration,
      type,
      key,
    })
  }, [])

  const dismiss = useCallback((key: string) => { message.destroy(key) }, [])

  const loading = useCallback((props: FeedbackMessageProps) => { open('loading', props) }, [open])
  const info = useCallback((props: FeedbackMessageProps) => { open('info', props) }, [open])
  const success = useCallback((props: FeedbackMessageProps) => { open('success', props) }, [open])
  const error = useCallback((props: FeedbackMessageProps) => { open('error', props) }, [open])
  const warning = useCallback((props: FeedbackMessageProps) => { open('warning', props) }, [open])

  return useMemo(() => ({
    dismiss,
    loading,
    info,
    success,
    error,
    warning,
  }), [dismiss, error, info, loading, success, warning])
}
