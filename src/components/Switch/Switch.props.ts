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

import { SwitchChangeEventHandler, SwitchClickEventHandler } from 'antd/es/switch'
import { ReactNode } from 'react'

import { Size } from './Switch.types'

export type SwitchProps = {

    /**
     * Additional description of the switch, to be rendered below the switch `text`.
     * Is ignored if the `text` prop is not provided.
     */
    description?: ReactNode,

    /**
     * Determines whether the switch is checked.
     */
    isChecked?: boolean,

    /**
     * Determines whether the switch is disabled. Defaults to false.
     */
    isDisabled?: boolean,

    /**
     * Determines whether the switch is in loading state. Defaults to false.
     */
    isInitiallyChecked?: boolean,

    /**
     * Determines whether the switch is in loading state. Defaults to false.
     */
    isLoading?: boolean,

    /**
    * Function that is invoked when the switch state is changed.
    */

   // TODO: check this type (weird representation in storybook)
    onChange?: SwitchChangeEventHandler

    /**
    * Function that is invoked when the switch is clicked.
    */

   // TODO: check this type (weird representation in storybook)
    onClick?: SwitchClickEventHandler,

    /**
     * Determines the switch size. Can be set to `large` or `small`. Defaults to `large`.
     */
    size?: Size,

    /**
     * Text to be displayed next to the switch.
     */
    text?: ReactNode
}
