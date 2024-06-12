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

import { ReactElement } from 'react'

import { Icon } from '../Icon'
import { useTheme } from '../../hooks/useTheme'

export const BREADCRUMB_SEPARATOR_SIZE = 16
export const BREADCRUMB_SEPARATOR_PADDING = 4

export const BreadcrumbSeparator = (): ReactElement => {
  const { palette } = useTheme()

  return (
    <div style={{ width: BREADCRUMB_SEPARATOR_SIZE, height: BREADCRUMB_SEPARATOR_SIZE }}>
      <Icon color={palette?.common?.grey?.[600]} name="PiCaretRight" size={BREADCRUMB_SEPARATOR_SIZE} />
    </div>
  )
}
