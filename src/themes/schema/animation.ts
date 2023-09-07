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
 * Time interval in which the animation occurs,
 * expressed in seconds or in milliseconds.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration}
 *
 * @example 2s
 * @example 200ms
 */
type Duration = {
  shortest: number,
  shorter: number,
  short: number,
  standard: number,
  complex: number
}

/**
 * Acceleration curve describing the speed of the animation.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function}
 *
 * @remarks
 * in: affects the initial part of the animation.
 *
 * out: affects the final part of the animation.
 *
 * inOut: affects the entire animation.
 *
 * @example linear
 * @example cubic-bezier(.29, 1.01, 1, -0.68);
 */
type Ease = {
  inOut: string,
  in: string,
  out: string
}

/**
 * Set of all properties handling animations.
 */
type Transition = {
  ease: Ease,
  duration: Duration
}

export default Transition
