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

/**
 * Returns true if the value is a plain object.
 *
 * @param {unknown} value - The value to test.
 * @returns {boolean}
 */

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return (
    // equality operator checks undefined and null
    value !== null
    && (value?.constructor === Object || (!value?.constructor && typeof value === 'object'))
  )
}
