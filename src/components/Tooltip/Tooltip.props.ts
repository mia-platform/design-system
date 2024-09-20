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

import { Placement, TriggerMode } from './Tooltip.types'

export type TooltipProps = {

    /**
     * The children nodes to be rendered as tooltip target.
     */
    children: ReactNode,

    /**
     * The DOM container of the tip, the default behavior is to create a div element in body.
     */
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement

    /**
     * Defines the tooltip position relative to the target. Either:
     *
     * - "top" (default)
     * - "left"
     * - "right"
     * - "bottom"
     * - "topLeft"
     * - "topRight"
     * - "bottomLeft"
     * - "bottomRight"
     * - "leftTop"
     * - "leftBottom"
     * - "rightTop"
     * - "rightBottom"
     */
    placement?: Placement

    /**
     * The text shown in the tooltip.
     */
    title: ReactNode | (() => ReactNode)

    /**
     * Defines a single tooltip trigger mode or multiple ones by passing an array. The possible values are:
     *
     * - "hover" (default)
     * - "focus"
     * - "click"
     * - "contextMenu"
     */
    trigger?: TriggerMode | TriggerMode[],

    /**
     * Callback executed when visibility of the tooltip card is changed.
     */
    onOpenChange?: (open: boolean) => void,
}
