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

import { ReactElement, useMemo } from 'react'
import { Modal as AntModal } from 'antd'
import classNames from 'classnames'

import { Body } from './Modal.Body'
import { Footer } from './Modal.Footer'
import { ModalProps } from './Modal.props'
import { Size } from './Modal.types'
import { Title } from './Modal.Title'
import styles from './Modal.module.css'

const { Small, Large, FullScreen } = Size
const {
  modal,
  modalSm,
  modalLg,
  modalFs,
} = styles

/**
 * Modal dialog that opens in overlay and allows to perform flows of actions, or to show specific
 * but less relevant information than those displayed on the underlying page.
 *
 * @link https://ant.design/components/modal
 * @returns {Modal} Modal component
 */
export const Modal = ({
  aside,
  children,
  docLink,
  footer,
  isBodyFullWidth,
  isClosable,
  isMaskClosable,
  isVisible,
  onCloseClick,
  size,
  title,
}: ModalProps): ReactElement => {
  const modalClassNames = useMemo(() => classNames([
    modal,
    size === Small && modalSm,
    size === Large && modalLg,
    size === FullScreen && modalFs,
  ]), [size])

  return (
    <AntModal
      centered
      className={modalClassNames}
      closable={isClosable}
      footer={<Modal.Footer footer={footer} />}
      keyboard={isClosable}
      maskClosable={isMaskClosable}
      open={isVisible}
      title={<Modal.Title docLink={docLink} title={title} />}
      onCancel={onCloseClick}
    >
      <Modal.Body
        aside={aside}
        isBodyFullWidth={isBodyFullWidth}
        size={size}
      >
        {children}
      </Modal.Body>
    </AntModal>
  )
}

Modal.defaultProps = {
  isBodyFullWidth: false,
  isClosable: true,
  isMaskClosable: true,
  isVisible: false,
  size: Small,
}

Modal.Title = Title
Modal.Body = Body
Modal.Footer = Footer
