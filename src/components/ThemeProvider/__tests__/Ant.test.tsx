import { generateAntTheme } from '../Ant'
import themes from '../../../themes'

describe('Generate Ant Theme', () => {
  test('generate ant theme from empty theme', () => {
    const variables = generateAntTheme()

    expect(variables).toMatchSnapshot()
  })

  for (const [themeName, theme] of Object.entries(themes)) {
    test(`generate ant theme from ${themeName}`, () => {
      const variables = generateAntTheme(theme)

      expect(variables).toMatchSnapshot()
    })
  }
})
