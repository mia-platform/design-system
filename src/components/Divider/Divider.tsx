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

import { Divider as AntDivider } from 'antd'
import { ReactElement } from 'react'

import { DividerProps } from './Divider.props'
import { /* Orientation, */ TextOrientation } from './Divider.types'
import useTheme from '../../hooks/useTheme'

// const { Horizontal } = Orientation
const { Left } = TextOrientation

/**
 * A divider line to separate different content
 *
 * @link https://ant.design/components/divider
 * @returns {Divider} Divider component
 */
export const Divider = ({
  orientation,
  text,
  textOrientation,
}: DividerProps): ReactElement => {
  const { spacing } = useTheme()

  return (
    <AntDivider
      orientation={textOrientation}
      orientationMargin={spacing?.margin?.xl}
      type={orientation}
    >
      {text}
    </AntDivider>
  )
}

Divider.defaultProps = {
  // orientation: Horizontal,
  textOrientation: Left,
}
