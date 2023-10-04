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

import { MouseEventHandler, ReactNode } from 'react'
import { TooltipProps } from 'antd'

/**
 * @link https://ant.design/components/typography#copyable
 */
export type CopyConfig = {

  /**
   * The text to copy.
   */
  text?: string;

  /**
   * Function called when the text is copied.
   */
  onCopy?: () => void;

  /**
   * Custom copy icon(s).
   * It is possible to set a single icon that will become the new copyIcon,
   * or an array of 2 icons that will replace both copyIcon and copiedIcon.
   */
  icon?: ReactNode;

  /**
   * Custom tooltip text(s).
   * It is possible to set a single string that will become the new copyText,
   * or an array of 2 strings that will replace both copyText and copiedText.
   * If the attribute is set to false, no tooltip will be shown.
   */
  tooltips?: boolean | ReactNode;

  /**
   * The Mime Type of the text.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
   */
  format?: 'text/plain' | 'text/html';
}

/**
 * @link https://ant.design/components/typography#ellipsis
 */
export type EllipsisConfig = {

  /**
   * The maximum number of rows the content can occupy before going into ellipsis or being truncated.
   */
  rows?: number;

  /**
   * Whether the text is expandable.
   */
  expandable?: boolean;

  /**
   * Suffix of the ellipsis content.
   */
  suffix?: string;

  /**
   * Custom description of the ellipsis (default is 'Expand').
   */
  symbol?: ReactNode;

  /**
   * Function called when the content is expanded.
   */
  onExpand?: MouseEventHandler<HTMLElement>;

  /**
   * Function called when the content enters or leaves the ellipsis state.
   */
  onEllipsis?: () => void;

  /**
   * Whether to display a tooltip on ellipsis. If set to true, a copy icon is shown to the right of the text.
   * The attribute is further customizable.
   *
   * @link https://ant.design/components/tooltip#common-api
   */
  tooltip?: ReactNode | TooltipProps;
}
