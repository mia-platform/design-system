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

import { ReactElement, useMemo } from 'react'
import { Typography as AntTypography } from 'antd'
import classnames from 'classnames'

import { BodyXSize, Size } from './BodyX.types'
import { BodyXProps } from './BodyX.props'
import styles from './BodyX.module.css'

const { Paragraph: AntParagraph } = AntTypography

const { body, bodyS, bodyM, bodyL } = styles

const { S, M, L } = Size

/**
 * UI component for displaying bodies (BodyS, BodyM, BodyL).
 *
 * @link https://ant.design/components/typography#typographyparagraph
 * @returns {BodyX} BodyX component
 */
export const BodyX = ({
  children,
  copyable,
  ellipsis,
  isBold,
  size,
}: BodyXProps & BodyXSize): ReactElement => {
  const bodyClassName = useMemo(() => classnames([
    body,
    size === S && bodyS,
    size === M && bodyM,
    size === L && bodyL,
  ]), [size])

  return (
    <AntParagraph
      className={bodyClassName}
      copyable={copyable}
      ellipsis={ellipsis}
      role={'paragraph'}
      strong={isBold}
    >
      {children}
    </AntParagraph>
  )
}

BodyX.defaultProps = {
  copyable: false,
  ellipsis: false,
  isBold: false,
}
