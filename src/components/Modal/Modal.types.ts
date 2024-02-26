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

export enum Size {
  Small = 'small',
  Large = 'large',
  FullScreen = 'fullscreen',
}

export type Aside = {

  /**
   * The children nodes to be rendered within the modal aside context.
   */
  children?: ReactNode,

  /**
   * Whether the modal aside is fixed or can be opened and closed by a dedicated button.
   */
  isFixed?: boolean,

  /**
   * Label to be applied to the aside close button (if the aside is not fixed).
   */
  labelClose?: string,

  /**
   * Label to be applied to the aside open button (if the aside is not fixed).
   */
  labelOpen?: string,

  /**
   * Title of the modal aside, which briefly conveys information about its contents.
   */
  title?: ReactNode,
}

export type Footer = {

  /**
   * Array of buttons to be displayed in the right side of the footer.
   */
  buttons?: ReactNode[],

  /**
   * Extra information to be displayed in the left side of the footer (such as text or checkbox).
   */
  extra?: ReactNode,
}
