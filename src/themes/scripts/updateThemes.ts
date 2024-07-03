/**
 * Copyright 2024 Mia srl
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
