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

import { Tooltip as AntTooltip } from 'antd'
import { ReactElement } from 'react'

import { Placement, Trigger } from './Tooltip.types'
import { TooltipProps } from './Tooltip.props'

const arrowProp = { pointAtCenter: true }

export const defaults = {
  placement: Placement.Top,
  trigger: Trigger.Hover,
}

export const Tooltip = (
  {
    children,
    getPopupContainer,
    placement = defaults.placement,
    title,
    trigger = defaults.trigger,
    onOpenChange,
  } : TooltipProps
) : ReactElement => {
  return (
    <AntTooltip
      arrow={arrowProp}
      getPopupContainer={getPopupContainer}
      placement={placement}
      title={title}
      trigger={trigger}
      onOpenChange={onOpenChange}
    >
      {children}
    </AntTooltip>
  )
}

Tooltip.Placement = Placement
Tooltip.Trigger = Trigger
