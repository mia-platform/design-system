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

import { ReactNode } from 'react'

import { Color, Type } from './types.ts'
import { IconComponent } from '../Icon/Icon.props.ts'

export type TagProps = {

    /**
     * The main content of the Tag.
     */
    children?: ReactNode,

    /**
    * The type of the Tag. Default 'Tag'.
    */
    type?: Type,

    /**
    * The type of the Tag. Default 'Tag'.
     */
    color?: Color | string,

    /**
    * Optional icon of the Tag.
    */
    icon?: IconComponent,

    /**
     * Displays the default close icon when set to true. It can also be used to render a custom icon.
     */
    closeIcon?: ReactNode,

    /**
     * Callback executed when Tag is closed. Only available if closeIcon is enabled.
     */
    onClose?: () => void,

    /**
     * Displays the Tag border. Defaults to true.
     */
    isBordered?: boolean,
}
