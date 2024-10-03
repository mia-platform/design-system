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
export type Size = string | number

/**
 * Scale of dimensions from lower to higher.
 */
type Sizer = {
  xs: Size,
  sm: Size,
  md: Size,
  lg: Size,
  xl: Size
}

/**
 * Set of all properties expressing the shape of elements.
 *
 * @remarks
 * border: properties handling the outer layer of elements.
 *
 * size: properties handling inner dimensions of elements
 * (e.g. size of icons).
 */
type Shape = {
  border: {
    radius: Sizer,
    width: Sizer
  },
  size: Sizer & {
    '3xs': Size,
    '2xs': Size,
    '2xl': Size,
    '3xl': Size,
  }
}

export default Shape
