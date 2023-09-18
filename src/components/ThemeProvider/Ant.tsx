/* eslint-disable react-refresh/only-export-components */

import { ConfigProvider, ThemeConfig, theme as baseAntTheme } from 'antd'
import { ReactElement, useMemo } from 'react'

import MenuTheme from '../Menu/Menu.theme'
import Theme from '../../themes/schema'
import { ThemeProviderProps } from '.'

const ANT_PREFIX = 'ant-5'

const { defaultAlgorithm, darkAlgorithm } = baseAntTheme

/**
 * Parses a value into a number or returns undefined.
 *
 * @param {string | number} value - The value to parse, either a string or a number.
 * @returns {number | undefined} The parsed number or undefined if parsing is not possible.
 */
export const parse = (value?: string | number): number | undefined => {
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
    colorPrimary: palette?.primary?.main,
    colorSuccess: palette?.success?.main,
    colorInfo: palette?.info?.main,
    colorWarning: palette?.warning?.main,
    colorError: palette?.error?.main,
    colorTextBase: palette?.common?.grey?.['800'],
    colorBgLayout: palette?.common?.grey?.['200'],
    colorBgBase: palette?.background?.['0'],
    colorBgElevated: palette?.background?.['200'],

    // Typography
    fontSize: parse(typography?.bodyS?.fontSize),

    // Spacing
    padding: parse(spacing?.padding?.md),
    margin: parse(spacing?.margin?.md),

    // Shape
    borderRadius: parse(shape?.border?.radius.md),

    // Others
    wireframe: false,
  },
  components: {
    Menu: MenuTheme({ spacing, typography }),
  },
})

/**
 * Provides an Ant Design themed environment for the application.
 *
 * @param {ThemeProviderProps} props - The component props.
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
