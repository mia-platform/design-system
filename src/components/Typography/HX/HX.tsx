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
import { ReactElement } from 'react'

import { HXLevel } from './HX.types'
import { HXProps } from './HX.props'

const { Title: AntTitle } = AntTypography

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
  return (
    <AntTitle
      aria-label={typeof children === 'string' ? children : ''}
      copyable={copyable}
      ellipsis={ellipsis}
      level={level}
      role={role}
    >
      {children}
    </AntTitle>
  )
}
