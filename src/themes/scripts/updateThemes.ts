import { readdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

import {
  GENERATED_FILE,
  PRIMITIVES_FILE,
  THEMES_DIR,
  THEME_GENERATOR_FILE,
} from '../constants'
import { generateTheme } from '../utils/generateTheme'


const getFile = (theme: string, file: string): string => resolve(THEMES_DIR, theme, file)


function main(): void {
  for (const themeName of readdirSync(THEMES_DIR)) {
    const themeGeneratorFilePath = getFile(themeName, THEME_GENERATOR_FILE)
    const primitivesFilePath = getFile(themeName, PRIMITIVES_FILE)

    const resolvedTheme = generateTheme(themeGeneratorFilePath, primitivesFilePath)

    writeFileSync(getFile(themeName, GENERATED_FILE), JSON.stringify(resolvedTheme, null, 2))
  }
}

main()
