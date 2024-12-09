/**
 * Copyright 2024 Mia srl
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

import { BaseInputProps } from '../BaseInput/props'

export type InputNumberProps = BaseInputProps & {

  /**
   * The id of the input.
   */
  id?: string

  /**
   * The input content value.
   */
  value?: number

  /**
   */
  defaultValue?: number

  /**
   * The min value of the input.
   */
  min?: number

  /**
   * The max value of the input.
   */
  max?: number

  /**
   * The precision of the input value.
   */
  precision?: number

  /**
   * The number to which the current value is increased or decreased
   */
  step?: number

  /**
   * Callback when user input.
   */
  onChange?: (value: string | number | null) => void
  ;
}
