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

import { Switch as AntSwitch } from 'antd'
import { ReactElement } from 'react'
import type { SwitchSize } from 'antd/es/switch'

import { Size } from './Switch.types'
import { SwitchProps } from './Switch.props'

export const defaults = {
  isDisabled: false,
  isInitiallyChecked: false,
  isLoading: false,
  size: Size.Large,
}

const antSizeRemapping = {
  [Size.Large]: 'default' as SwitchSize,
  [Size.Small]: 'small' as SwitchSize,
}

export const Switch = ({
  isChecked,
  isInitiallyChecked = defaults.isInitiallyChecked,
  isDisabled = defaults.isDisabled,
  isLoading = defaults.isLoading,
  onChange,
  onClick,
  size = defaults.size,
} : SwitchProps) : ReactElement => {
  return (
    <AntSwitch
      checked={isChecked}
      defaultChecked={isInitiallyChecked}
      disabled={isDisabled}
      loading={isLoading}
      size={antSizeRemapping[size]}
      onChange={onChange}
      onClick={onClick}
    />)
}
