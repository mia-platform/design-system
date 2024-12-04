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

import { InputType, Layout } from './types.ts'
import { IconComponent } from '../Icon/Icon.props.ts'

export type CardSelectionOption<T> = {

  /**
   * Optional id value for the card.
   */
  id?: string

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
   * Custom content to be rendered inside the card.
   */
  content?: ReactNode

  /**
   * The value associated with the card.
   */
  value?: T

  /**
   * Determines if the card is disabled.
   */
  disabled?: boolean
}

export type CardSelectionProps<T> = {

  /**
   * The default value for the card selection.
   * Must be an array if inputType is "checkbox", a value if inputType is "radio".
   */
  defaultValue?: T | T[]

  gap?: number

  /**
   * The inputType of the card selection. Defaults: undefined (no input will be displayed).
   */
  inputType?: InputType,

  isDisabled?: boolean

  /**
   * The layout of the cards. Can be "horizontal" or "vertical". Default: "vertical".
   */
  layout: Layout

  /*
  * Handler triggered when the value of the selection changes (only triggered if inputType is "checkbox" or "radio")
  * */
  onChange?: (value: T | T[]) => void

  /*
  * Handler triggered when a card is clicked
  * */
  onClick?: (value?: T) => void

  /**
   * The options array for the card selection.
   */
  options: CardSelectionOption<T>[]

  /**
   * The controlled value for the card selection.
   * Must be an array if inputType is "checkbox", a value if inputType is "radio".
   */
  value?: T | T[]
}
