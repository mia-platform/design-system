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

import { ReactElement, useContext } from 'react'
import { IconContext } from 'react-icons'

import { IconProps, customIcons, reactIcons } from './Icon.props'
import log from '../../utils/log'

/**
 * UI component for displaying different icon packs (Ant, Feather, Phosphor) and custom SVGs
 *
 * @link https://react-icons.github.io/react-icons/
 * @returns {Icon} Icon component
 */
export const Icon = ({
  name,
  size,
  color,
}: IconProps): ReactElement | null => {
  const { color: defaultColor, size: defaultSize, className } = useContext(IconContext)

  const IconComponent = name in customIcons
    ? customIcons?.[name as keyof typeof customIcons]
    : reactIcons?.[name as keyof typeof reactIcons]

  if (!IconComponent) {
    log.error(`icon name ${name} not supported`)
    return null
  }

  return (
    <IconComponent
      alt={name}
      aria-label={name}
      className={className}
      color={color ?? defaultColor}
      height={size ?? defaultSize}
      role={'img'}
      size={size ?? defaultSize}
      width={size ?? defaultSize}
    />
  )
}

Icon.defaultProps = {
  size: 24 as const,
}
