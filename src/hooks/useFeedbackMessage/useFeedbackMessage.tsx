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

import { useCallback, useMemo } from 'react'
import classnames from 'classnames'
import { message } from 'antd'

import { MessageAPI, Position, Type } from './useFeedbackMessage.types'
import { FeedbackMessage } from '../../components/FeedbackMessage'
import { UseFeedbackMessageProps } from './useFeedbackMessage.props'
import styles from './useFeedbackMessage.module.css'

const BOTTOM_MESSAGE_KEY = '__BOTTOM_MESSAGE_KEY__'

/**
 * A hook that allows to display global informative messages to the user. It is intended to give
 * feedback messages on a certain operation being executed or information regarding the context of the application.
 *
 * The hook returns several methods to be used to show a message of a different type
 * (each type will use a different icon) or to manually remove rendered messages.
 *
 * @example
 * export const Component(props: {...}) => {
 *   // When called, shows a FeedbackMessage
 *   const onClick = (): void => {
 *     success({
 *       extra: <Button size={Size.Small} onClick={onDismiss}>Close</Button>,
 *       key: 'messageKey',
 *       message: 'This is a Feedback Message',
 *     })
 *   }
 *
 *   // When called, removes the FeedbackMessage, if still visible
 *   const onDismiss = (): void => { dismiss('messageKey') }
 *
 *   return (
 *     <div>
 *       {...}
 *       <Button onClick={onClick}>Click me to show a Feedback Message</Button>
 *     </div>
 *   )
 * }
 *
 * @returns {MessageAPI} An object which includes several functions to
 * manage the rendering of feedback messages.
 */
export const useFeedbackMessage = (): MessageAPI => {
  const open = useCallback((type: Type, props: UseFeedbackMessageProps): void => {
    const { key, duration, sticky, position, ...messageProps } = props

    const messageKey = position === Position.Bottom
      ? BOTTOM_MESSAGE_KEY
      : key

    message.open({
      className: classnames([
        styles.feedbackMessage,
        position === Position.Bottom && styles.bottom,
      ]),
      content: <FeedbackMessage extra={messageProps.extra} message={messageProps.message} />,
      duration: sticky ? 0 : duration,
      type,
      key: messageKey,
    })
  }, [])

  const dismiss = useCallback((key: string = BOTTOM_MESSAGE_KEY) => {
    message.destroy(key)
  }, [])

  const loading = useCallback((props: UseFeedbackMessageProps) => open(Type.Loading, props), [open])
  const info = useCallback((props: UseFeedbackMessageProps) => open(Type.Info, props), [open])
  const success = useCallback((props: UseFeedbackMessageProps) => open(Type.Success, props), [open])
  const error = useCallback((props: UseFeedbackMessageProps) => open(Type.Error, props), [open])
  const warning = useCallback((props: UseFeedbackMessageProps) => open(Type.Warning, props), [open])

  return useMemo(() => ({
    dismiss,
    loading,
    info,
    success,
    error,
    warning,
  }), [dismiss, error, info, loading, success, warning])
}
