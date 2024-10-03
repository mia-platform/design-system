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
 * Unit value expressing a dimension (in pixels).
 *
 * @example 2px
 * @example 16
 */
export type Space = string | number

/**
 * Scale of distances from lower to higher.
 */
type Spacer = {
  none: Space,
  xs: Space,
  sm: Space,
  md: Space,
  lg: Space,
  xl: Space
}

/**
 * Set of all properties expressing distances among elements.
 *
 * @remarks
 * margin: properties handling distances between element borders and other elements.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin}
 *
 * padding: properties handling distances between element content and borders.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding}
 *
 * gap: properties handling dimensions among elements.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gap}
 */
type Spacing = {
  margin: Spacer,
  padding: Spacer,
  gap: Spacer
}

export default Spacing
