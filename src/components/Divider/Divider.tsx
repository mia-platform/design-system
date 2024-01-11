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

import { Divider as AntDivider } from 'antd'
import { ReactElement } from 'react'

import { TextOrientation, Type } from './Divider.types'
import { DividerProps } from './Divider.props'


const { Central } = TextOrientation
const { Horizontal } = Type

/**
 * A divider line to separate different content
 *
 * @link https://ant.design/components/divider
 * @returns {Divider} Divider component
 */
export const Divider = ({
  children,
  isDashed,
  orientationMargin,
  orientation,
  isPlain,
  type,
}: DividerProps): ReactElement => {
  return (
    <AntDivider
      dashed={isDashed}
      orientation={orientation}
      orientationMargin={orientationMargin}
      plain={isPlain}
      type={type}
    >
      {children}
    </AntDivider>
  )
}

Divider.defaultProps = {
  isDashed: false,
  isPlain: true,
  orientation: Central,
  type: Horizontal,
}
