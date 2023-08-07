import { ConfigProvider, ThemeConfig, theme as baseAntTheme } from 'antd'
import { ReactElement, useMemo } from 'react'
import Theme from '../../themes/schema'
import { ThemeProviderProps } from '.'

const ANT_PREFIX = 'ant-5'

const { defaultAlgorithm, darkAlgorithm } = baseAntTheme

const parse = (value?: string | number): number | undefined => {
  if (value && typeof value === 'string') { return parseInt(value) }
  if (value && typeof value === 'number') { return value }
  return undefined
}

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
})

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

export {
  AntThemeProvider,
  generateAntTheme,
}
