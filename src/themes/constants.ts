/* eslint-disable no-underscore-dangle */
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const THEMES_DIR = resolve(__dirname, 'files')
export const THEME_GENERATOR_FILE = 'theme-generator.json'
export const PRIMITIVES_FILE = 'primitives.json'
export const GENERATED_FILE = 'theme.json'
