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

import { get } from 'lodash-es'
import { readFileSync } from 'fs'
import traverse from 'traverse'

import Theme from '../schema'

const INTERPOLATED_VALUE = /^{.*}$/g
const PARENTHESES = /[{}]/g

/**
 * Resolves interpolated values from a global definitions file in the theme.
 *
 * @param {Theme} themeValues - The theme values to resolve interpolated values from.
 * @param {object} themeTokens - The theme tokens to resolve recursive token values referring to other tokens values.
 * @returns {func} A function that resolves interpolated values.
 */
const resolveThemeValues = (themeValues: Theme, themeTokens: object) => (nodeValue: string): (string|undefined) => {
  if (!nodeValue.match(INTERPOLATED_VALUE)) {
    // The value does not require interpolation
    return nodeValue
  }

  const path = nodeValue.replace(PARENTHESES, '').split('.')
  const { $value } = get(themeValues, path) || {}

  if ($value === undefined) {
    // The value is referred to another token value instead of a primitive
    const { $value: tokenValue } = get(themeTokens, path) || {}
    if (tokenValue === undefined) {
      throw new Error(`Something went wrong resolving ${nodeValue}`)
    }

    return resolveThemeValues(themeValues, themeTokens)(tokenValue)
  }

  return $value
}

/**
 * Generates a theme based on the provided theme name.
 *
 * @param {string} themeGeneratorFilePath - The path of the theme generator file.
 * @param {string} primitivesFilePath - The path of the primitives file.
 * @returns {Theme} The generated theme with all the resolved values.
 */
export function generateTheme(themeGeneratorFilePath: string, primitivesFilePath: string): Theme {
  const structure = readFileSync(themeGeneratorFilePath).toString()
  const values = readFileSync(primitivesFilePath).toString()
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

