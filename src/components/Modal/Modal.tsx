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
import { Modal as AntModal } from 'antd'
import classNames from 'classnames'

import { Shape, Type } from '../Button/Button.types'
import { BodyM } from '../Typography/BodyX/BodyM'
import { Button } from '../Button'
import { H4 } from '../Typography/HX/H4'
import { Icon } from '../Icon'
import { ModalProps } from './Modal.props'
import { Size } from './Modal.types'
import styles from './Modal.module.css'
import { useTheme } from '../../hooks/useTheme'

const { Circle } = Shape
const { Ghost } = Type
const { Small, Large, FullScreen } = Size
const {
  asideLabel,
  asideLabelWrapper,
  body,
  bodyFullWidth,
  bodyWithAsideClosed,
  bodyWithAsideOpened,
  content,
  contentWrapper,
  footerButtons,
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
  isVisible,
  onCloseClick,
  size,
  title,
}: ModalProps): ReactElement => {
  const { palette } = useTheme()

  const docLinkIcon = useMemo(() => (
    <Icon color={palette?.action?.link?.active} name="PiBookOpen" size={16} />
  ), [palette?.action?.link?.active])

  const onClickDocLink = useCallback(() => window.open(docLink, '_blank'), [docLink])

  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const hasAside = size !== Small && aside

  const modalClassNames = useMemo(() => classNames([
    modal,
    size === Small && modalSm,
    size === Large && modalLg,
    size === FullScreen && modalFs,
  ]), [size])
  const modalBodyClassNames = useMemo(() => classNames([
    body,
    isBodyFullWidth && bodyFullWidth,
    hasAside && (isAsideOpen ? bodyWithAsideOpened : bodyWithAsideClosed),
  ]), [hasAside, isAsideOpen, isBodyFullWidth])
  const modalContentWrapperClassNames = useMemo(() => classNames([
    content,
    size !== Small && aside && contentWrapper,
  ]), [aside, size])

  const modalTitle = useMemo(() => (
    <div className={styles.title}>
      {title && <>
        <H4 ellipsis={{ rows: 1, tooltip: title }}>{title}</H4>
        {docLink && <div className={styles.docLink}>
          <Button
            icon={docLinkIcon}
            shape={Circle}
            type={Ghost}
            onClick={onClickDocLink}
          />
        </div>}
      </>}
    </div>
  ), [docLink, docLinkIcon, onClickDocLink, title])

  const modalFooter = useMemo(() => {
    const { buttons, extra } = footer || {}
    return (
      <div className={styles.footer}>
        {footer && <>
          <div className={footerButtons}>
            {buttons}
          </div>
          {extra}
        </>}
      </div>
    )
  }, [footer])

  const modalContent = useMemo(() => {
    if (hasAside) {
      const {
        children: extChildren,
        isFixed,
        labelClose,
        labelOpen,
        title: extTitle,
      } = aside || {}

      const modalAside = (
        <aside className={styles.aside}>
          <BodyM>{extTitle}</BodyM>
          {extChildren}
        </aside>
      )

      if (isFixed) {
        return (
          <>
            <div className={content}>
              {children}
            </div>
            {modalAside}
          </>
        )
      }

      const changeAsideStatus = (): void => setIsAsideOpen(prevState => !prevState)

      const modalAsideLabel = (
        <div className={asideLabelWrapper}>
          <div className={asideLabel} onClick={changeAsideStatus}>
            {isAsideOpen && <>
              <Icon color="currentColor" name="PiCaretLeft" size={16} />
              {labelClose}
            </>}
            {!isAsideOpen && <>
              {labelOpen}
              <Icon color="currentColor" name="PiCaretRight" size={16} />
            </>}
          </div>
        </div>
      )

      return (
        <>
          <div className={modalContentWrapperClassNames}>
            <div className={content}>
              {children}
            </div>
            {modalAsideLabel}
          </div>
          {modalAside}
        </>
      )
    }

    return (
      <div className={content}>
        {children}
      </div>
    )
  }, [aside, children, hasAside, isAsideOpen, modalContentWrapperClassNames])

  return (
    <AntModal
      centered
      className={modalClassNames}
      closable={isClosable}
      footer={modalFooter}
      keyboard={isClosable}
      maskClosable={false}
      open={isVisible}
      title={modalTitle}
      onCancel={onCloseClick}
    >
      <div className={modalBodyClassNames}>
        {modalContent}
      </div>
    </AntModal>
  )
}

Modal.defaultProps = {
  isBodyFullWidth: false,
  isClosable: true,
  isVisible: false,
  size: Small,
}
