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

/**
 * UI component for displaying SVGs.
 *
 * The component needs to be provided with a React function component returning the SVG to render. This can be achieved,
 * for example, using the [SVGR](https://react-svgr.com/) library to load the assets, or importing components from an icon
 * pack such as [React Icons](https://react-icons.github.io/react-icons/).
 *
 * For convenience, the design system itself ships several icon packs ready to use with this components, namely:
 * - [Ant Design Icons](https://react-icons.github.io/react-icons/icons/ai/) importable from `@mia-platform-internal/console-design-system-react/icons/ai`
 * - [Phosphor Icons](https://react-icons.github.io/react-icons/icons/pi/) importable from `@mia-platform-internal/console-design-system-react/icons/pi`
 * - [Feather Icons](https://react-icons.github.io/react-icons/icons/fi/) importable from `@mia-platform-internal/console-design-system-react/icons/fi`
 * - [Mia-Platform Icons](/docs/icons-mia-platform--docs) importable from
 * `@mia-platform-internal/console-design-system-react/icons/mi`
 *
 * To use one of the aforementioned icons, just import the component and pass it to `<Icon />`:
 *
 * ```tsx
 * import { PiAddressBook } from "@mia-platform-internal/console-design-system-react/icons/pi"
 *
 * const App = () => <Icon component={PiAddressBook} />
 * ```
 *
 * @returns {ReactNode} Icon component
 */
export const Icon = ({
  component,
  size = 24,
  color,
}: IconProps): ReactNode => {
  const { size: defaultSize, className } = useContext(IconContext)

  if (!component) {
    log.error('no icon component provided')
    return null
  }

  return component({
    'aria-label': component.name,
    className,
    color: color ?? 'currentColor',
    height: size ?? defaultSize,
    role: 'img',
    size: size ?? defaultSize,
    width: size ?? defaultSize,
  })
}
