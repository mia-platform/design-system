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

import { MouseEvent } from 'react'

import { Hierarchy, Option, OptionAlignment } from './SegmentedControl.types'

export type SegmentedControlProps = {

  /**
   * The option initially selected. Either one of the following:
   *
   * - `string`: the key of the initially selected option
   * - `number`: the position in the array of the initially selected option
   */
  defaultValue?: string | number,

  /**
   * Defines the segmented hierarchy. Either:
   *
   * - "primary": segmented associated with the most significant (and therefore primary) action on the page
   * - "neutral": segmented associated with a general purpose action
   */
  hierarchy?: Hierarchy,

  /**
   * Determines whether the segmented control is disabled.
   */
  isDisabled?: boolean,

  /**
   * A callback function that is invoked when the selected option changes.
   *
   * @param {Option} option - The newly selected option.
   * @param {MouseEvent} event - The event linked to the mouse click.
   */
  onChange?: (option: Option, event: MouseEvent) => void,

  /**
   * An array of segmented options to be displayed. Either one of the following:
   *
   * - `string`
   * - `object`:
   *    - icon?: The icon of the option <br> `ReactNode`
   *    - label: The selectable text of the option <br> `ReactNode`
   *    - isDisabled?: Whether the option is clickable <br> `boolean`
   *    - key: The value associated with the option <br> `string`
   */
  options: Option[],

  /**
   * The alignment of the options within the segmented control. Either one of the following:
   *
   * - "horizontal": icons and labels of every option are aligned horizontally
   * - "vertical": icons and labels of every option are aligned vertically
   */
  optionsAlignment?: OptionAlignment,

  /**
   * The current selected value. Either one of the following:
   *
   * - `string`: the key of the selected option
   * - `number`: the position of the selected option in the array
   */
  value?: string | number,
}
