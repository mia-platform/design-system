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

import { ConfigProvider, ThemeConfig, theme as baseAntTheme } from 'antd'
import { ReactElement, useMemo } from 'react'

import { DEFAULT_COLOR, DEFAULT_FONT_SIZE } from './utils/themeDefaultStyle'
import ButtonTheme from '../Button/Button.theme'
import MenuTheme from '../Menu/Menu.theme'
import Theme from '../../themes/schema'
import { ThemeProviderProps } from '.'
import TypographyTheme from '../Typography/Typography.theme'

const ANT_PREFIX = 'mia-platform'

const { defaultAlgorithm, darkAlgorithm } = baseAntTheme

/**
 * Parses a value into a number or returns undefined.
 *
 * @param {string | number} value - The value to parse, either a string or a number.
 * @returns {number | undefined} The parsed number or undefined if parsing is not possible.
 */
const parse = (value?: string | number): number | undefined => {
  if (value && typeof value === 'string') { return parseInt(value) }
  if (value && typeof value === 'number') { return value }
  return undefined
}

/**
 * Generates a theme configuration for Ant Design based on a theme configuration.
 *
 * @param {Partial<Theme>} theme - theme configuration used to customize the generated Ant theme.
 * @returns {ThemeConfig} The generated Ant theme configuration.
 */
const generateAntTheme = ({ palette, typography, shape, spacing }: Partial<Theme> = {}): ThemeConfig => ({
  algorithm: palette?.mode === 'dark'
    ? darkAlgorithm
    : defaultAlgorithm,

  token: {
    // Palette
    colorPrimary: palette?.primary?.['600'],
    colorSuccess: palette?.success?.['600'],
    colorInfo: palette?.info?.['600'],
    colorWarning: palette?.warning?.['600'],
    colorError: palette?.error?.['600'],
    colorTextBase: palette?.common?.grey?.['700'] ?? DEFAULT_COLOR,
    colorBgLayout: palette?.background?.primary?.['200'],
    colorBgBase: palette?.background?.primary?.['400'],
    colorBgElevated: palette?.background?.primary?.['600'],

    // Typography
    fontSize: typography?.bodyS?.fontSize ?? DEFAULT_FONT_SIZE,

    // Spacing
    padding: parse(spacing?.padding?.lg),
    margin: parse(spacing?.margin?.lg),

    // Shape
    borderRadius: parse(shape?.border?.radius.md),

    // Others
    wireframe: false,
  },
  components: {
    Button: ButtonTheme({ typography }),
    Menu: MenuTheme({ palette, shape, spacing, typography }),
    Typography: TypographyTheme({ typography }),
  },
})

/**
 * Provides an Ant Design themed environment for the application.
 *
 * @param {ThemeProviderProps} props - The theme provider props.
 * @returns {ReactElement} A component providing the Ant Design theme to its children.
 */
const AntThemeProvider = ({ theme, children }: ThemeProviderProps): ReactElement => {
  const antTheme = useMemo(() => generateAntTheme(theme), [theme])

  return (
    <ConfigProvider
      iconPrefixCls={ANT_PREFIX}
      prefixCls={ANT_PREFIX}
      theme={antTheme}
    >
      {children}
    </ConfigProvider>
  )
}

export type ComponentsTheme = NonNullable<ThemeConfig['components']>

export {
  AntThemeProvider,
  generateAntTheme,
}
