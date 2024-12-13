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

  /**
   * Additional content to be displayed alongside the badge title (e.g., a tag or an icon).
   */
  extra?: ReactNode;

  /**
   * The icon component to render within the badge.
   */
  icon: IconComponent;

  /**
   * Optional subtitle text to display below the badge title.
   */
  subtitle?: string;

  /**
   * The main title text to display within the badge.
   */
  title: string;
};

export type FeedbackProps = {

  /**
   * Props to configure an optional alert element displayed within the feedback.
   * Includes optional title, description, icon, and type.
   */
  alert?: Pick<AlertProps, 'description' | 'icon' | 'title' | 'type'>;

  /**
   * Props to customize the appearance and content of an optional badge displayed within the feedback.
   *
   * `object`:
   *  - extra: Additional content to be displayed alongside the badge title (e.g., a tag or an icon). <br> `ReactNode`
   *  - icon: The icon component to render within the badge. <br> `IconComponent`
   *  - subtitle: Optional subtitle text to display below the badge title. <br> `string`
   *  - title: The main title text to display within the badge. <br> `string`
   */
  badge?: FeedbackBadgeProps;

  /**
   * Child elements to render within the feedback component.
   * This can be any ReactNode, such as a confirm input or some action buttons.
   */
  children?: ReactNode;

  /**
   * A brief description to display in the feedback component.
   */
  description?: string;

  /**
   * A custom icon component to display on top of the feedback.
   * If not specified, the icon will be defaulted depending on the feedback type.
   */
  icon?: IconComponent;

  /**
   * The main title of the feedback message.
   */
  title: string;

  /**
   * The type of feedback to display, typically used to indicate the purpose or style (e.g., success, error).
   */
  type: Type;
};
