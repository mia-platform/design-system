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

import { ThemeConfig } from 'antd'
import { useMemo } from 'react'

import { generateAntTheme } from '../../components/ThemeProvider/Ant'
import { useTheme } from '../useTheme'

/**
 * A hook to compute the Ant Design theme from the current theme.
 *
 * @link https://ant.design/docs/react/customize-theme#api
 *
 * @returns {ThemeConfig} The Ant Design theme.
 */
export const useAntTheme = (): ThemeConfig => {
  const theme = useTheme()

  return useMemo(() => generateAntTheme(theme), [theme])
}
