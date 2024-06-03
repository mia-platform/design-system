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

import { ReactNode, useContext } from 'react'
import { IconContext } from 'react-icons'

import { IconProps } from './Icon.props'
import log from '../../utils/log'

export const defaults = {
  size: 24 as const,
}

/**
 * UI component for displaying different icon packs (Ant, Feather, Phosphor) and custom SVGs
 *
 * @link https://react-icons.github.io/react-icons/
 * @returns {ReactNode} Icon component
 */
export const Icon = ({
  'aria-label': ariaLabel,
  component,
  size = defaults.size,
  color,
}: IconProps): ReactNode => {
  const { size: defaultSize, className } = useContext(IconContext)

  if (!component) {
    log.error('no icon component provided')
    return null
  }

  return component({
    'aria-label': ariaLabel,
    className,
    color: color ?? 'currentColor',
    height: size ?? defaultSize,
    role: 'img',
    size: size ?? defaultSize,
    width: size ?? defaultSize,
  })
}
