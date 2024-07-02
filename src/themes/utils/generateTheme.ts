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
 * @param {object} themeTokens - The theme tokens to resolve recursive token values referring to other tokens values.
 * @returns {func} A function that resolves interpolated values.
 */
const resolveThemeValues = (themeValues: Theme, themeTokens: object) => (nodeValue: string): (string|undefined) => {
  if (!nodeValue.match?.(INTERPOLATED_VALUE)) {
    // The value does not require interpolation
    return nodeValue
  }

  const path = nodeValue.replace(PARENTHESES, '').split('.')
  const { $value } = get(themeValues, path) || {}

  if (!$value) {
    // The value is referred to another token value instead of a primitive
    const { $value: tokenValue } = get(themeTokens, path) || {}
    if (!tokenValue) {
      throw new Error(`Something went wrong resolving ${nodeValue}`)
    }

    return resolveThemeValues(themeValues, themeTokens)(tokenValue)
  }

  return $value
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

  const resolvedTheme = resolveThemeTokens(structure, values)

  writeFileSync(getFile(themeName, GENERATED_FILE), JSON.stringify(resolvedTheme, null, 2))
}

function resolveThemeTokens(structure: string, values: string): Theme {
  const themeStructure: object = JSON.parse(structure)
  const themeValues: Theme = JSON.parse(values)

  const resolveVariable = resolveThemeValues(themeValues, themeStructure)

  return traverse(themeStructure).map(function(node) {
    const isLeaf = node?.$value && node?.$type

    if (!isLeaf) {
      this.update(node)
      return
    }

    this.update(resolveVariable(node.$value))
  })
}

export const forTest = {
  resolveThemeTokens,
}
