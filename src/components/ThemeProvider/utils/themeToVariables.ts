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

import { isObject } from 'lodash-es'

/**
 * Converts a theme configuration into CSS variables.
 *
 * @param {Theme} theme - The theme configuration to convert.
 * @param {string} prefix - Incremental prefix composing the CSS variable names (e.g. -, --palette, --palette-primary).
 * @returns {Record<string, string>} A record of CSS variable names and their corresponding values.
 */
export default function themeToVariables(theme = {}, prefix = '-'): Record<string, string> {
  const fields = Object.entries(theme)

  return fields.reduce((variables, [field, value]) => {
    const fieldName = [prefix, field].join('-')
    const isNested = isObject(value)

    return {
      ...variables,
      ...isNested
        ? themeToVariables(value, fieldName)
        : { [fieldName]: value },
    }
  }, {})
}
