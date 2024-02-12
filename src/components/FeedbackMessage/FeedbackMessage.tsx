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
import { message as antMessage } from 'antd'

// import { FeedbackStatus } from './FeedbackMessage.types'
import { FeedbackMessageProps } from './FeedbackMessage.props'
// import useTheme from '../../hooks/useTheme'


/**
 * Renders a feedback message in response to user operations.
 *
 * @link https://ant.design/components/message
 * @returns {FeedbackMessage} FeedbackMessage component
 */
export const FeedbackMessage = ({
  message,
  duration = 3,
  status,
}: FeedbackMessageProps): ReactElement => {
  const [api, context] = antMessage.useMessage()
  // const { spacing } = useTheme()

  api.open({
    content: message,
    duration,
    type: status,
  })

  return context
}

FeedbackMessage.defaultProps = {
  duration: 3,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {},
} as Partial<FeedbackMessageProps>
