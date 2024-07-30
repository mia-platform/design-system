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

import { Typography as AntTypography } from 'antd'
import { ReactElement, useMemo } from 'react'
import classnames from 'classnames'

import { HXLevel } from './HX.types'
import { HXProps } from './HX.props'
import styles from './HX.module.css'

const { Title: AntTitle } = AntTypography

const { h1, h2, h3, h4 } = styles

export const defaults = {
  copyable: false,
  ellipsis: false,
}

/**
 * UI component for displaying headers (H1, H2, H3, H4).
 *
 * @link https://ant.design/components/typography#typographytitle
 * @returns {HX} HX component
 */
export const HX = ({
  children,
  copyable = defaults.copyable,
  ellipsis = defaults.ellipsis,
  level,
  role,
}: HXProps & HXLevel): ReactElement => {
  const classNames = useMemo(() => classnames([
    level === 1 && h1,
    level === 2 && h2,
    level === 3 && h3,
    level === 4 && h4,
  ]), [level])

  return (
    <AntTitle
      aria-label={typeof children === 'string' ? children : ''}
      className={classNames}
      copyable={copyable}
      ellipsis={ellipsis}
      level={level}
      role={role}
    >
      {children}
    </AntTitle>
  )
}
