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
import { ReactNode } from 'react'

import { Direction } from './types.ts'

export type CheckboxGroupOption<T> = {

  /**
   * Adds the Radio id attribute value
   */
  value: T;

  /**
   * The text used to display the radio option
   */
  label: ReactNode;

  /**
   * description of the label that is placed underneath the label
   */
  description?: ReactNode;

  /**
   * Specifies whether the Radio option is disabled
   */
  disabled?: boolean;

}

export type CheckboxGroupProps<T> = {

  /**
   * The selected value displayed on first render
   */
  defaultValue?: T[];

  /**
   * Used for setting the currently selected value
   */
  value?: T[];

  /**
   * Options of the checkbox group
   */
  options: CheckboxGroupOption<T>[];

  /**
   * The callback function that is triggered when the state changes
   */
  onChange?: (checkedValue: T[]) => void;

  /**
   * If true, disable all checkboxes
   */
  isDisabled?: boolean;

  /**
   * The direction of the radio group. Defaults to 'vertical'
   */
  direction?: Direction
}
