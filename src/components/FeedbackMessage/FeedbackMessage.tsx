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

import { ReactElement } from 'react'

import { FeedbackMessageProps } from './FeedbackMessage.props'
import styles from './FeedbackMessage.module.css'

const { feedbackMessage: messageStyles } = styles

/**
 * Renders a message in response to user operations.
 * This component is intended to be used along with the `useFeedbackMessage` hook.
 *
 * @link https://ant.design/components/message
 * @returns {FeedbackMessage} FeedbackMessage component
 */
export const FeedbackMessage = ({
  message,
  extra,
}: FeedbackMessageProps): ReactElement => {
  return (
    <span className={messageStyles}>
      {message}
      {extra}
    </span>
  )
}
