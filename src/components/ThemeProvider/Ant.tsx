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

import { DEFAULT_COLOR, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from './utils/themeDefaultStyle'
import ButtonTheme from '../Button/Button.theme'
import CheckboxTheme from '../Checkbox/Checkbox.theme.ts'
import DatePickerTheme from '../DatePickers/theme.ts'
import DividerTheme from '../Divider/Divider.theme'
import FeedbackMessageTheme from '../FeedbackMessage/FeedbackMessage.theme'
import InputTheme from '../BaseInput/BaseInput.theme'
import MenuTheme from '../Menu/Menu.theme'
import RadioTheme from '../RadioGroup/components/Radio/index.theme.ts'
import SelectTheme from '../Select/Select.theme'
import SwitchTheme from '../Switch/Switch.theme'
import TableTheme from '../Table/Table.theme'
import TagTheme from '../Tag/Tag.theme'
import Theme from '../../themes/schema'
import { ThemeProviderProps } from './ThemeProvider.props'
import TreeTheme from '../Tree/Tree.theme'
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
    colorBorder: palette?.text?.neutral?.subtler,
    colorPrimary: palette?.primary?.[600],
    colorSuccess: palette?.success?.[600],
    colorInfo: palette?.info?.[600],
    colorWarning: palette?.warning?.[600],
    colorError: palette?.error?.[600],
    colorText: palette?.text?.neutral?.main ?? DEFAULT_COLOR,
    colorTextBase: palette?.common?.grey?.[700] ?? DEFAULT_COLOR,
    colorTextDisabled: palette?.text?.neutral?.subtle,
    colorBgLayout: palette?.background?.primary?.[200],
    colorBgBase: palette?.background?.primary?.[400],
    colorBgElevated: palette?.background?.primary?.[600],
    colorPrimaryHover: palette?.action?.primary?.hover,
    colorPrimaryActive: palette?.action?.primary?.active,
    colorErrorHover: palette?.action?.danger?.hover,
    colorErrorActive: palette?.action?.danger?.active,
    colorBgContainerDisabled: palette?.action.disabled.main,
    colorTextPlaceholder: palette?.text.neutral.subtle,
    colorErrorBorderHover: palette?.action.danger.hover,

    // Typography
    fontFamily: typography?.bodyS?.fontFamily ?? DEFAULT_FONT_FAMILY,
    fontSize: typography?.bodyS?.fontSize ?? DEFAULT_FONT_SIZE,

    // Spacing
    padding: parse(spacing?.padding?.lg),
    paddingXS: parse(spacing?.padding?.sm),
    paddingXXS: parse(spacing?.padding?.xs),
    margin: parse(spacing?.margin?.lg),
    marginXXS: parse(spacing?.margin?.xs),

    // Shape
    borderRadius: parse(shape?.border?.radius.md),

    // Others
    wireframe: false,
  },
  components: {
    Button: ButtonTheme({ typography, palette }),
    Divider: DividerTheme({ palette }),
    Message: FeedbackMessageTheme({ palette }),
    Menu: MenuTheme({ palette, shape, spacing, typography }),
    Switch: SwitchTheme({ palette }),
    Table: TableTheme({ palette, spacing }),
    Tree: TreeTheme({ palette, shape }),
    Typography: TypographyTheme({ typography }),
    Input: InputTheme({ palette, shape, typography, spacing }),
    InputNumber: InputTheme({ palette, shape, typography, spacing }),
    Select: SelectTheme({ palette, shape, typography, spacing }),
    Tag: TagTheme({ palette }),
    Radio: RadioTheme({ palette, shape }),
    Checkbox: CheckboxTheme({ palette, shape }),
    DatePicker: DatePickerTheme({ palette, shape }),
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
  ANT_PREFIX,
  AntThemeProvider,
  generateAntTheme,
  parse,
}
