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

import { ReactNode } from 'react'

import { CopyConfig, EllipsisConfig } from '../Typography.types'
import { Hierarchy } from './BodyX.types'

export type BodyXProps = {

  /**
   * The children nodes to be rendered within the typography context.
   */
  children?: ReactNode,

  /**
   * Whether the text is copyable. If set to true, a copy icon is shown to the right of the text.
   * The attribute is further customizable according to the following data model:
   *
   * `object`:
   *   - text?: The text to copy. <br>`string`
   *   - onCopy?: Function called when the text is copied. <br>`() => void`
   *   - icon?: Custom copy icon(s).
   *   It is possible to set a single icon that will become the new copyIcon,
   *   or an array of 2 icons that will replace both copyIcon and copiedIcon. <br>`ReactNode`
   *   - tooltips?: Custom tooltip text(s).
   *   It is possible to set a single string that will become the new copyText,
   *   or an array of 2 strings that will replace both copyText and copiedText.
   *   If the attribute is set to false, no tooltip will be shown. <br>`boolean | ReactNode`
   *   - format?: The Mime Type of the text. <br>`'text/plain' | 'text/html'`
   */
  copyable?: boolean | CopyConfig,

  /**
   * Displays ellipsis when text overflows.
   * The attribute is customizable according to the following data model:
   *
   * `object`:
   *   - rows?: The maximum number of rows the content can occupy before
   *   going into ellipsis or being truncated. <br>`number`
   *   - expandable?: Whether the text is expandable. <br>`boolean`
   *   - suffix?: Suffix of the ellipsis content. <br>`string`
   *   - symbol?: Custom description of the ellipsis (default is 'Expand'). <br>`ReactNode`
   *   - onExpand?: Function called when the content is expanded. <br>`MouseEventHandler<HTMLElement>`
   *   - onEllipsis?: Function called when the content enters or leaves the ellipsis state. <br>`() => void`
   *   - tooltip?: Whether to display a tooltip on ellipsis.
   *   If set to true, a copy icon is shown to the right of the text.
   *   The attribute is further customizable. <br>`ReactNode`
   */
  ellipsis?: boolean | EllipsisConfig,

   /**
   * Displays text in different color based on hierarchy:
   * - bold: uses variable --palette-text-neutral-bold to display a darker text, for high-priority text
   * - main: currently has no color assigned, since the main color for text should be managed via Ant Theme
   * - subtle: uses variable --palette-text-neutral-subtle to display a lighter text, for low-priority text
   */
  hierarchy?: Hierarchy,

  /**
   * Whether the body font weight is bold.
   */
  isBold?: boolean,

}
