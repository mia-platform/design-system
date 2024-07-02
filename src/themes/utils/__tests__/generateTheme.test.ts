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

import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'

import { GENERATED_FILE, THEMES_DIR } from '../../constants'
import { generateTheme } from '../generateTheme'


describe('Generate Theme', () => {
  for (const themeName of readdirSync(THEMES_DIR)) {
    test(`${themeName} matches snapshot`, async() => {
      const generated = readFileSync(resolve(THEMES_DIR, themeName, GENERATED_FILE)).toString()
      expect(JSON.parse(generated)).toMatchSnapshot()
    })
  }

  test('throws error if there is some error on theme generation file', async() => {
    const themeGeneratorFilePath = resolve(__dirname, '../mocks/theme-generator-with-error.json')
    const primitivesFilePath = resolve(__dirname, '../mocks/primitives.json')

    expect(() => generateTheme(themeGeneratorFilePath, primitivesFilePath)).toThrow('Something went wrong resolving {this.primitive.not.exists}')
  })
})
