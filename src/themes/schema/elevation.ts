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
 * Position on the cartesian axis perpendicular to the screen.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/z-index}
 */
type Index = number

/**
 * Shadow effect around the element's frame.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow}
 *
 * @example 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
 * @example inset 5em 1em white;
 */
type Shadow = string

/**
 * Scale of elevations from lower to higher.
 */
type Elevation = 0 | 100 | 200 | 300 | 400 | 500

/**
 * Scale of indexes for each elevation value.
 */
type Indexes = Record<Elevation, Index>

/**
 * Set of shadows for each elevation value.
 */
type Shadows = Record<Elevation, Shadow>

export type {
  Elevation,
  Shadows,
  Indexes,
}
