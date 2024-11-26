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

export type AlertProps = {

  /**
   * The title displayed at the top of the alert.
   */
  title?: ReactNode

  /**
   * The description providing additional details about the alert.
   */
  description?: ReactNode

  /**
   * Custom children content to be rendered inside the alert.
   */
  children?: ReactNode

  /**
   * Indicates if the alert is closable.
   */
  isClosable?: boolean

  /**
   * The type of alert.
   */
  type?: Type

  /**
   * If true, renders a compact version of the alert with reduced padding.
   */
  isCompressed?: boolean

  /**
   * A custom icon to display in the alert. Replaces the default icon based on the `type`.
   */
  icon?: IconComponent

  /**
   * A custom action element (e.g., a button) to display inside the alert.
   */
  action?: ReactNode

  /**
   * A callback function triggered when the alert is closed.
   */
  onClose?: () => void
}
