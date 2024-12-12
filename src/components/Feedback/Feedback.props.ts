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

import { AlertProps } from '../Alert/props'
import { IconComponent } from '../Icon/Icon.props'
import { Type } from './Feedback.types'

type FeedbackBadgeProps = {
  extra?: ReactNode
  icon: IconComponent
  subtitle?: string
  title: string
}

export type FeedbackProps = {
  alert?: Pick<AlertProps, 'description' | 'icon' | 'title' | 'type'>
  badge?: FeedbackBadgeProps
  children?: ReactNode
  description?: string
  icon?: IconComponent
  title: string
  type: Type
}
