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

import { IconComponent } from '../Icon/Icon.props.ts'
import { Type } from './types.ts'

export type CardSelectionProps<T> = {

  /**
   * The main title displayed prominently on the card.
   */
  title: ReactNode

  /**
   * An optional icon displayed alongside the title.
   */
  icon?: IconComponent

  /**
   * A subtitle displayed below the title.
   */
  subtitle?: ReactNode

  /**
   * Custom children content to be rendered inside the card.
   */
  children?: ReactNode

  /**
   * Determines if the card should be displayed in a horizontal layout.
   */
  horizontal?: boolean

  /**
   * The type of selection for the card.
   */
  type?: Type

  /**
   * The value associated with the card.
   */
  value?: T

  /**
   * Indicates if the card is currently checked.
   */
  isChecked?: boolean

  /**
   * Determines if the card is disabled.
   */
  isDisabled?: boolean

  /**
   * Callback triggered when the card is clicked.
   */
  onClick?: (checked: boolean, value?: T) => void

  /**
   * Indicates if the card should be checked initially.
   */
  isInitiallyChecked?: boolean
}