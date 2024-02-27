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

/* eslint-disable max-len */

import { ReactNode } from 'react'

import { Aside, Footer, Size } from './Modal.types'

export type ModalProps = {

  /**
   * The children nodes to be rendered within the modal context.
   */
  children?: ReactNode,

  /**
   * The reference url for documentation of the modal contents.
   * If present, a button is shown next to the title that, when clicked, opens the url in a new tab.
   */
  docLink?: string,

  /**
   * Aside element of the modal to be shown to the right of the content (occupies 35% of the width of the modal body).
   * Small modals cannot have aside.
   *
   * aside `object`:
   *   - children: The children nodes to be rendered within the modal aside context. <br> `ReactNode`
   *   - isFixed: Whether the modal aside is fixed or can be opened and closed by a dedicated button. <br> `boolean`
   *   - labelClose: Label to be applied to the aside close button (if the aside is not fixed). <br> `string`
   *   - labelOpen: Label to be applied to the aside open button (if the aside is not fixed). <br> `string`
   *   - title: Title of the modal aside, which briefly conveys information about its contents. <br> `ReactNode`
   */
  aside?: Aside,

  /**
   * Modal footer. If not passed by the user, an empty footer is displayed.
   *
   * footer `object`:
   *   - buttons: Array of buttons to be displayed in the right side of the footer. <br> `ReactNode[]`
   *   - extra: Extra information to be displayed in the left side of the footer (such as text or checkbox). <br> `ReactNode`
   */
  footer?: Footer,

  /**
   * Whether the modal body (which includes content and possibly aside) should occupy the full width of the modal.
   */
  isBodyFullWidth?: boolean,

  /**
   * Whether the modal is closable (via X button in the upper right corner or ESC key).
   */
  isClosable?: boolean,

  /**
   * Whether the modal is closable with a click on the modal mask.
   */
  isMaskClosable?: boolean,

  /**
   * Whether the modal is visible.
   */
  isVisible?: boolean,

  /**
   * Function performed at the click of the modal close (X) button. Typically one of the actions performed by
   * this function will be the `closeModal` of the `useModal` hook to ensure the effective closure of the modal.
   */
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

export type TitleProps = Pick<ModalProps, 'title' | 'docLink'>
export type BodyProps = Pick<ModalProps, 'aside' | 'children' | 'isBodyFullWidth' | 'size'>
export type FooterProps = Pick<ModalProps, 'footer'>
