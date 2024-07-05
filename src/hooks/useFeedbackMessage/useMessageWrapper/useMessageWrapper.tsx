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
import { MessageInstance } from 'antd/es/message/interface'
import classnames from 'classnames'
import staticMethods from 'antd/es/message/'

import { MessageAPI, Position, Type } from './useMessageWrapper.types'
import { FeedbackMessage } from '../../../components/FeedbackMessage'
import styles from './useMessageWrapper.module.css'
import { useMessageWrapperProps } from './useMessageWrapper.props'

const BOTTOM_MESSAGE_KEY = '__BOTTOM_MESSAGE_KEY__'

export function useMessageWrapper(messageAPIs: typeof staticMethods | MessageInstance): MessageAPI {
  const open = useCallback((type: Type, props: useMessageWrapperProps): PromiseLike<boolean> => {
    const { key, duration, sticky, position, ...messageProps } = props

    const messageKey = position === Position.Bottom
      ? BOTTOM_MESSAGE_KEY
      : key

    return messageAPIs.open({
      className: classnames([
        styles.messageWrapper,
        position === Position.Bottom && styles.bottom,
      ]),
      content: <FeedbackMessage extra={messageProps.extra} message={messageProps.message} />,
      duration: sticky ? 0 : duration,
      type,
      key: messageKey,
    })
  }, [messageAPIs])

  const dismiss = useCallback((key: string = BOTTOM_MESSAGE_KEY) => {
    messageAPIs.destroy(key)
  }, [messageAPIs])

  const loading = useCallback((props: useMessageWrapperProps) => open(Type.Loading, props), [open])
  const info = useCallback((props: useMessageWrapperProps) => open(Type.Info, props), [open])
  const success = useCallback((props: useMessageWrapperProps) => open(Type.Success, props), [open])
  const error = useCallback((props: useMessageWrapperProps) => open(Type.Error, props), [open])
  const warning = useCallback((props: useMessageWrapperProps) => open(Type.Warning, props), [open])

  return useMemo(() => ({
    dismiss,
    loading,
    info,
    success,
    error,
    warning,
  }), [dismiss, error, info, loading, success, warning])
}

useMessageWrapper.Position = Position
