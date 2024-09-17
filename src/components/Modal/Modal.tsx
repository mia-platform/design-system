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

import { ReactElement, useCallback, useMemo } from 'react'
import { Modal as AntModal } from 'antd'
import classNames from 'classnames'

import { Body } from './Modal.Body'
import { Footer } from './Modal.Footer'
import { ModalProps } from './Modal.props'
import { Size } from './Modal.types'
import { THEME_PROVIDER_STYLE_WRAPPER_NODE } from '../ThemeProvider/ThemeProvider'
import { Title } from './Modal.Title'
import styles from './Modal.module.css'

const { Small, Large, FullScreen } = Size
const {
  modal,
  modalSm,
  modalLg,
  modalFs,
} = styles

export const defaults = {
  isBodyFullWidth: false,
  isClosable: true,
  isMaskClosable: true,
  isVisible: false,
  size: Small,
}

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
  isBodyFullWidth = defaults.isBodyFullWidth,
  isClosable = defaults.isClosable,
  isMaskClosable = defaults.isMaskClosable,
  isVisible = defaults.isVisible,
  onCloseClick,
  size = defaults.size,
  title,
  destroyOnClose,
  getContainer,
}: ModalProps): ReactElement => {
  const modalClassNames = useMemo(() => classNames([
    modal,
    size === Small && modalSm,
    size === Large && modalLg,
    size === FullScreen && modalFs,
  ]), [size])

  const getContainerFallback = useCallback(() => {
    return document.getElementById(THEME_PROVIDER_STYLE_WRAPPER_NODE) || document.body
  }, [])

  return (
    <AntModal
      centered
      className={modalClassNames}
      closable={isClosable}
      destroyOnClose={destroyOnClose}
      footer={<Modal.Footer footer={footer} />}
      getContainer={getContainer || getContainerFallback}
      keyboard={isClosable}
      maskClosable={isClosable && isMaskClosable}
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

Modal.Title = Title
Modal.Body = Body
Modal.Footer = Footer
Modal.Size = Size
