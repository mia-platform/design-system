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

import { Extension, Footer, Size } from './Modal.types'

export type ModalProps = {
  children?: ReactNode,

  /**
   * The reference url for documentation of the modal contents.
   * If present, a button is shown next to the title that, when clicked, opens the url in a new tab.
   */
  docLink?: string,

  extension?: Extension,

  footer?: Footer,

  isBodyFullWidth?: boolean,

  isClosable?: boolean,

  isVisible?: boolean,

  onCloseClick?: () => void,

  /**
   * Defines the modal size. Either:
   *
   * - "small": small modal - width: 40% (min: 600px, max: 800px), height: 50% (min: 360px, max: 480px);
   * - "large": large modal - width: 70% (min: 900px, max: 1600px), height: 85% (min: 540px, max: 1080px);
   * - "fullscreen": fullscreen modal - width: 100%, height: 100%.
   */
  size?: Size,

  /**
   * Title of the modal, which briefly conveys information about its contents.
   */
  title?: ReactNode,
}
