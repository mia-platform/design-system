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

import { ReactElement, useCallback, useMemo, useState } from 'react'

import { Modal } from '../../components/Modal/Modal'
import { ModalAPI } from './useModal.types'
import { ModalProps } from '../../components/Modal/Modal.props'

/**
 * A hook that allows the use of a Modal component.
 *
 * @returns {ModalAPI} An object which includes the Modal component, the modal state (visible or hidden) and methods
 * for opening, closing, and changing the modal state.
 */
export const useModal = (): ModalAPI => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = useCallback(() => setIsModalVisible(true), [])
  const closeModal = useCallback(() => setIsModalVisible(false), [])
  const toggleModal = useCallback(() => setIsModalVisible(prevState => !prevState), [])

  const ModalComponentMemoized = useMemo(() => {
    return function ModalComponent(props: ModalProps): ReactElement {
      return (
        <Modal
          {...props}
          isVisible={props.isVisible ?? isModalVisible}
          onCloseClick={props.onCloseClick ?? closeModal}
        />
      )
    }
  }, [closeModal, isModalVisible])

  return { Modal: ModalComponentMemoized, isModalVisible, openModal, closeModal, toggleModal }
}
