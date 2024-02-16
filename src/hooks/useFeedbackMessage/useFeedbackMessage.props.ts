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

import { FeedbackMessagePosition } from './useFeedbackMessage.types'
import { MessageProps } from '../../components/Message/Message.props'

export type FeedbackMessageProps = MessageProps & {

    /**
     * Key of the message. This will be used as an identifier, in case of manual dismission of a message.
     * Moreover, if this key is the same as the one of a message still rendered, the rendered message will
     * be replaced with this one.
     */
    key?: string

    /**
     * Time before the message is removed from the screen, in seconds. Default: 3.
     */
    duration?: number

    /**
     * If set to `true`, the message will not disappear automatically, but must be removed via `dismiss`
     * method of the hook, or by replacing it with another message with the same key.
     */
    sticky?: boolean

    /**
     * Position of the message. Either one of the following:
     *
     * - "top": feedback message placed at the top of the page;
     * - "bottom": feedback message placed at the bottom of the page. Bottom messages are unique,
     *   meaning that no more than one can be shown at a time.
     */
    position?: FeedbackMessagePosition
  }
