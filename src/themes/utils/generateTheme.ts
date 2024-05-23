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

/* eslint-disable array-callback-return */
/* eslint-disable func-names */

import { readFileSync, writeFileSync } from 'fs'
import { get } from 'lodash-es'
import { resolve } from 'path'
import traverse from 'traverse'

import Theme from '../schema'

export const THEMES_DIR = resolve(__dirname, '../files')
export const THEME_GENERATOR_FILE = 'theme-generator.json'
export const PRIMITIVES_FILE = 'primitives.json'
export const GENERATED_FILE = 'theme.json'

const INTERPOLATED_VALUE = /^{.*}$/g
const PARENTHESES = /[{}]/g

const getFile = (theme: string, file: string): string => resolve(THEMES_DIR, theme, file)

/**
 * Resolves interpolated values from a global definitions file in the theme.
 *
 * @param {Theme} themeValues - The theme values to resolve interpolated values from.
 * @returns {func} A function that resolves interpolated values.
 */
const resolveThemeValues = (themeValues: Theme) => (node: string) => {
  if (node.match?.(INTERPOLATED_VALUE)) {
    const path = node.replace(PARENTHESES, '').split('.')

    const { $value } = get(themeValues, path) || {}

    return $value
  }
  return node
}

/**
 * Generates a theme based on the provided theme name.
 *
 * @param {string} themeName - The name of the theme to generate.
 * @returns {Promise<void>} A promise that resolves when the theme generation is complete.
 */
export default async function generateTheme(themeName: string): Promise<void> {
  const structure = await readFileSync(getFile(themeName, THEME_GENERATOR_FILE)).toString()
  const values = await readFileSync(getFile(themeName, PRIMITIVES_FILE)).toString()

  const themeStructure: object = JSON.parse(structure)
  const themeValues: Theme = JSON.parse(values)

  const resolveVariable = resolveThemeValues(themeValues)

  const resolvedTheme: Theme = traverse(themeStructure).map(function(node) {
    const isLeaf = node?.$value && node?.$type
    const resolvedNode = resolveVariable(isLeaf ? node.$value : node)

    this.update(resolvedNode)
  })

  writeFileSync(getFile(themeName, GENERATED_FILE), JSON.stringify(resolvedTheme, null, 2))
}
