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

import { ReactNode } from 'react'

import { FeedbackStatus } from './FeedbackMessage.types'

export type FeedbackMessageProps = {

  /**
   * Define the status of the message, that will cause the icon change.
   *
   * Possible values: `loading`, `success`, `error`, `waiting`
   */
  status: FeedbackStatus

  /**
   * Time, in seconds, to show the message. Default to `1.5` seconds.
   */
  duration?: number

  /**
   * The content to be shown as a message, after the icon.
   */
  message: string | ReactNode

  /**
   * Content to be rendered at the right side of the component.
   */
  extra?: ReactNode,

  /**
   * Sets the handler executed when the message disappear.
   */
  onClose?: (event: MouseEvent) => void,
}
