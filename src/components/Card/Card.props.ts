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

export type CardProps = {

  /**
   * The children nodes to be rendered within the card context.
   */
  children?: ReactNode,

  /**
   * The reference url for documentation of the card contents.
   * If present, a button is shown next to the title that, when clicked, opens the url in a new tab.
   */
  docLink?: string,

  /**
   * Content (typically, an action) to render in the top-right corner of the card.
   */
  extra?: ReactNode,

  /**
   * Whether the card is in a loading state (if so, a skeleton is shown).
   */
  isLoading?: boolean,

  /**
   * Subtitle of the card, which gives auxiliary information about its contents.
   */
  subtitle?: ReactNode,

  /**
   * Title of the card, which briefly conveys information about its contents.
   */
  title?: ReactNode,
}
