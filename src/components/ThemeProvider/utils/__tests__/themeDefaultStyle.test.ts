import themeDefaultStyle from '../themeDefaultStyle'
import themes from '../../../../themes'

describe('Theme to Variables', () => {
  test('generate empty theme default style', () => {
    const style = themeDefaultStyle()

    expect(style).toMatchSnapshot()
  })

  for (const [themeName, theme] of Object.entries(themes)) {
    test(`generate ${themeName} default style`, () => {
      const style = themeDefaultStyle(theme)

      expect(style).toMatchSnapshot()
    })
  }
})
