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

import { ReactElement } from 'react'

import { ModalProps } from '../../components/Modal/Modal.props'

export type ModalAPI = {

  /**
   * Modal component, in which the properties `isVisible` and `onCloseClick` are by default associated with
   * the modal state `isModalVisible` and the `closeModal` function.
   */
  Modal: (props: ModalProps) => ReactElement,

  /**
   * Whether the modal is visible.
   */
  isModalVisible: boolean,

  /**
   * Modal opening function, which makes the modal visible.
   */
  openModal: () => void,

  /**
   * Modal closing function, which hides the modal.
   */
  closeModal: () => void,

  /**
   * Modal status change function, which opens the modal if it is closed or closes the modal if it is opened.
   */
  toggleModal: () => void,
}
