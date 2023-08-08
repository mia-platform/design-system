
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'

import generateTheme, { GENERATED_FILE, THEMES_DIR } from '../generateTheme'

describe('Generate Theme', () => {
  for (const themeName of readdirSync(THEMES_DIR)) {
    test(`generates ${themeName} theme configuration`, async() => {
      await generateTheme(themeName)

      const generated = await readFileSync(resolve(THEMES_DIR, themeName, GENERATED_FILE)).toString()
      expect(JSON.parse(generated)).toMatchSnapshot()
    })
  }
})
