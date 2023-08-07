import themeToVariables from '../themeToVariables'
import themes from '../../../../themes'

describe('Theme to Variables', () => {
  test('generate empty theme CSS variables', () => {
    const variables = themeToVariables()

    expect(variables).toMatchSnapshot()
  })

  for (const [themeName, theme] of Object.entries(themes)) {
    test(`generate ${themeName} CSS variables`, () => {
      const variables = themeToVariables(theme)

      expect(variables).toMatchSnapshot()
    })
  }
})
