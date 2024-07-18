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

import { MessageAPI, Position } from './useFeedbackMessage.types'
import { useMessageWrapper } from './useMessageWrapper/useMessageWrapper'

/**
 * A hook that allows to display global informative messages to the user. It is intended to give
 * feedback messages on a certain operation being executed or information regarding the context of the application.
 *
 * The hook returns several methods to be used to show a message of a different type
 * (each type will use a different icon) or to manually remove rendered messages.
 *
 * The Position values are exposed on the useFeedbackMessage object.
 *
 * Warning: the popover content opened by this hook cannot resolve any React Context,
 * so in this cases React always uses the default context value. If this behaviour is undesired,
 * it suggest to use the useFeedbackMessageWithContext custom hook instead.
 *
 * @example
 * export const Component(props: {...}) => {
 *   const {success, dismiss} = useFeedbackMessage()
 *
 *   // When called, shows a FeedbackMessage
 *   const onClick = (): void => {
 *     success({
 *       extra: <Button size={Size.Small} onClick={onDismiss}>Close</Button>,
 *       key: 'messageKey',
 *       message: 'This is a Feedback Message',
 *       position: useFeedbackMessage.Position.Bottom
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
 * @returns {MessageAPI} An object which includes several functions to manage the rendering of feedback messages.
 */
export const useFeedbackMessage = (): MessageAPI => {
  const wrappedAPI = useMessageWrapper(message)
  return wrappedAPI
}

useFeedbackMessage.Position = Position

