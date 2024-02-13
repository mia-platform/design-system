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

import { MessageProps } from '../../components/Message/Message.props'

export type FeedbackMessageProps = MessageProps & {

    /**
     * Key of the message. This will be used as identifier, in case of manual dismission of
     * a message. Moreover, if this key is the same of a message still rendered, the rendered message will
     * be replaced with this one.
     */
    key?: string

    /**
     * Time before the message is removed from the screen, in seconds. Default: 3.
     */
    duration?: number

    /**
     * If set to `true`, the message will not disappear automatically, but must be removed via `dismiss`
     * method of the hook, or by replacing with another message with the same key.
     */
    sticky?: boolean
  }
