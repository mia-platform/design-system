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

import { IconComponent } from '../Icon/Icon.props'

export type BadgeProps = {

  /**
   * A customizable element to display in the subtitle position.
   * If present, it overrides the `subtitle` content.
   */
  customSubtitle?: ReactNode

  /**
   * A customizable element to display in the title position.
   * If present, it overrides the `title` and `titleExtra` content.
   */
  customTitle?: ReactNode

  /**
   * Additional content to be displayed on the right side of the badge.
   */
  extra?: ReactNode;

  /**
   * The icon component to render within the badge.
   */
  icon: IconComponent;

  /**
   * Optional subtitle, it displays formatted text below the badge title.
   */
  subtitle?: string;

  /**
   * The main title, it displays formatted text within the badge.
   */
  title?: string;

  /**
   * Additional content to be displayed alongside the badge title (e.g., a tag or an icon).
   */
  titleExtra?: ReactNode;
};
