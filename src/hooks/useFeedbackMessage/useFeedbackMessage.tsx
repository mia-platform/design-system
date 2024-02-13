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

import { FeedbackMessageProps } from './useFeedbackMessage.props'
import { Message } from '../../components/Message'

// TODO: Document this
// TODO: Add tests
// TODO: Where should I put all these files?
// TODO: We need a version in the bottom-center

type FeedbackMessageType = 'loading' | 'info' | 'success' | 'warning' | 'error'

// export enum FeedbackMessagePositionEnum {
//   Top = 'top',
//   Bottom = 'bottom'
// }

type FeedbackMessage = {
  messageContainer: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
  dismiss: (key: string) => void
  loading: (props: FeedbackMessageProps) => void
  info: (props: FeedbackMessageProps) => void
  success: (props: FeedbackMessageProps) => void
  error: (props: FeedbackMessageProps) => void
  warning: (props: FeedbackMessageProps) => void
}

/**
 * A hook to access the current theme from the context.
 *
 * @returns {FeedbackMessage} An object including several functions to call to
 * manage the rendering of feedback messages.
 */
export const useFeedbackMessage = (): FeedbackMessage => {
  const [messageApi, contextHolder] = message.useMessage()

  const open = useCallback((type: FeedbackMessageType, props: FeedbackMessageProps): void => {
    const { key, duration, sticky, ...messageProps } = props


    messageApi.open({
      content: <Message extra={messageProps.extra} message={messageProps.message} />,
      duration: sticky ? 0 : duration,
      type,
      key,
    })
  }, [messageApi])

  const dismiss = useCallback((key: string) => { messageApi.destroy(key) }, [messageApi])

  const loading = useCallback((props: FeedbackMessageProps) => { open('loading', props) }, [open])
  const info = useCallback((props: FeedbackMessageProps) => { open('info', props) }, [open])
  const success = useCallback((props: FeedbackMessageProps) => { open('success', props) }, [open])
  const error = useCallback((props: FeedbackMessageProps) => { open('error', props) }, [open])
  const warning = useCallback((props: FeedbackMessageProps) => { open('warning', props) }, [open])

  return useMemo(() => ({
    messageContainer: contextHolder,
    dismiss,
    loading,
    info,
    success,
    error,
    warning,
  }), [contextHolder, dismiss, error, info, loading, success, warning])
}


// const { contextHolder } = useMessage()

// hook.loading({ message: 'Sto caricando', key: 'commit_save' })

// if (isCommitCompleted) {
//     hook.success({ message: 'Ho caricato', extra: (<Button>OK</Button>) key='commit_save' })
// }

// return <>{ contextHolder }</>
