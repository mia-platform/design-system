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

import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { ReactNode } from 'react'

export type CheckboxProps = {

  /**
   * Additional description of the checkbox, to be rendered below the checkbox `text`.
   * Is ignored if the `text` prop is not provided.
   */
  description?: ReactNode,

  /**
   * Allows you to control whether the checkbox is checked.
   */
  isChecked?: boolean,

  /**
   * Allows you to control whether the checkbox is disabled. Defaults to false.
   */
  isDisabled?: boolean,

  /**
   * Allows you to control whether the checkbox is checked on its first render. Defaults to false.
   */
  isInitiallyChecked?: boolean,

  /**
   * Allows you to control whether the checkbox is indeterminate. Defaults to false.
   */
  isIndeterminate?: boolean

  /**
   * Function that is invoked when the checkbox state is changed.
   */
  onChange?: (event: CheckboxChangeEvent) => void

  /**
   * Text to be displayed next to the checkbox.
   */
  text?: ReactNode
}
