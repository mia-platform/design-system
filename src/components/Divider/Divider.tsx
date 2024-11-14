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
import { Divider as AntDivider } from 'antd'

import { Orientation, TextOrientation } from './Divider.types'
import { DividerProps } from './Divider.props'
import { useTheme } from '../../hooks/useTheme'

const { Horizontal } = Orientation
const { Left } = TextOrientation

export const defaults = {
  orientation: Horizontal,
  textOrientation: Left,
}

/**
 * A divider line to separate different content
 *
 * @link https://ant.design/components/divider
 * @returns {Divider} Divider component
 */
export const Divider = ({
  orientation = defaults.orientation,
  margin,
  text,
  textOrientation = defaults.textOrientation,
  additionalStyle,
}: DividerProps): ReactElement => {
  const { spacing } = useTheme()

  const style = useMemo(() => ({
    ...margin || margin === 0 ? { margin } : {},
    ...additionalStyle,
  }), [margin, additionalStyle])

  return (
    <AntDivider
      orientation={textOrientation}
      orientationMargin={spacing?.margin?.xl}
      style={style}
      type={orientation}
    >
      {text}
    </AntDivider>
  )
}

Divider.Orientation = Orientation
Divider.TextOrientation = TextOrientation
