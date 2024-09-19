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

import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'
import { ReactElement, useMemo, useState } from 'react'
import classNames from 'classnames'

import { BodyM } from '../Typography/BodyX/BodyM'
import { BodyProps } from './Modal.props'
import { Icon } from '../Icon'
import { Size } from './Modal.types'
import styles from './Modal.module.css'

const { Small } = Size

const {
  asideLabel,
  asideLabelWrapper,
  body,
  bodyFullWidth,
  bodyWithAsideClosed,
  bodyWithAsideOpened,
  content,
  contentWrapper,
} = styles

/**
 * Body component of Modal, which has within it and manages the modal content and the eventual aside.
 *
 * @returns {Body} Modal Body component
 */
export const Body = ({
  aside,
  children,
  isBodyFullWidth,
  size,
}: BodyProps): ReactElement => {
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const hasAside = size !== Small && aside

  const modalContentWrapperClassNames = useMemo(() => classNames([
    content,
    size !== Small && aside && contentWrapper,
  ]), [aside, size])
  const modalBodyClassNames = useMemo(() => classNames([
    body,
    isBodyFullWidth && bodyFullWidth,
    hasAside && (aside?.isFixed || isAsideOpen ? bodyWithAsideOpened : bodyWithAsideClosed),
  ]), [aside?.isFixed, hasAside, isAsideOpen, isBodyFullWidth])

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
        <div className={modalBodyClassNames}>
          <div className={content}>
            {children}
          </div>
          {modalAside}
        </div>
      )
    }

    const toggleAside = (): void => setIsAsideOpen(prevState => !prevState)

    const modalAsideLabel = (
      <div className={asideLabelWrapper}>
        <div className={asideLabel} onClick={toggleAside}>
          {isAsideOpen && <>
            {labelClose}
            <Icon
              aria-label={'Close aside'}
              color="currentColor"
              component={PiCaretRight}
              size={16}
            />
          </>}
          {!isAsideOpen && <>
            <Icon
              aria-label={'Open aside'}
              color="currentColor"
              component={PiCaretLeft}
              size={16}
            />
            {labelOpen}
          </>}
        </div>
      </div>
    )

    return (
      <div className={modalBodyClassNames}>
        <div className={modalContentWrapperClassNames}>
          <div className={content}>
            {children}
          </div>
          {modalAsideLabel}
        </div>
        {modalAside}
      </div>
    )
  }

  return (
    <div className={modalBodyClassNames}>
      <div className={content}>
        {children}
      </div>
    </div>
  )
}
