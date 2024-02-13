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

import { FeedbackMessageProps } from './useFeedbackMessage.props'

export type FeedbackMessage = {

    /**
     * A node in which the messages will be rendered.
     * This property must be included in the children of the rendered component.
     */
    messageContainer: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>

    /**
     * Destroy the FeedbackMessage with given id
     *
     * @param key the key of the message to remove
     */
    dismiss: (key: string) => void

    /**
     * Render a FeedbackMessage with a spinner animation
     *
     * @param {FeedbackMessageProps} props the configuration of the message to render
     */
    loading: (props: FeedbackMessageProps) => void

    /**
     * Render a FeedbackMessage with a "info" icon
     *
     * @param {FeedbackMessageProps} props the configuration of the message to render
     */
    info: (props: FeedbackMessageProps) => void

    /**
     * Render a FeedbackMessage with a "success" icon
     *
     * @param {FeedbackMessageProps} props the configuration of the message to render
     */
    success: (props: FeedbackMessageProps) => void

    /**
     * Render a FeedbackMessage with a "warning" icon
     *
     * @param {FeedbackMessageProps} props the configuration of the message to render
     */
    error: (props: FeedbackMessageProps) => void

    /**
     * Render a FeedbackMessage with a "error" icon
     *
     * @param {FeedbackMessageProps} props the configuration of the message to render
     */
    warning: (props: FeedbackMessageProps) => void
  }
