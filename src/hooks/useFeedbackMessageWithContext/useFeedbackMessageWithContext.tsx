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

import { message } from 'antd'

import { MessageWithContextHolderAPI, Position } from './useFeedbackMessageWithContext.types'
import { useMessageWrapper } from '../useFeedbackMessage/useMessageWrapper/useMessageWrapper'

/**
 * A hook that allows to display global informative messages to the user. It is very similar to
 * the useFeedbackMessages hook, but it allows to propagate the React Context to the message popover content,
 * so it is possible to resolve contexts as intl or token theme.
 *
 * The hook returns several methods to be used to show a message of a different type
 * (each type will use a different icon) or to manually remove rendered messages and
 * a contextHolder React element that must be rendered to work.
 *
 * @example
 * export const Component(props: {...}) => {
 *   const {success, dismiss, contextHolder} = useFeedbackMessageWithContext()
 *
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
 *       {contextHolder}
 *     </div>
 *   )
 * }
 *
 * @returns {MessageWithContextHolderAPI} An object which includes several functions
 * to manage the rendering of feedback messages and the contextHolder that must be rendered to work.
 */
export const useFeedbackMessageWithContext = (): MessageWithContextHolderAPI => {
  const [api, contextHolder] = message.useMessage()
  const wrappedAPI = useMessageWrapper(api)
  return {
    ...wrappedAPI,
    contextHolder,
  }
}

useFeedbackMessageWithContext.Position = Position

