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
   * Optional description, it displays formatted text customized content below the badge title.
   */
  description?: string | ReactNode;

  /**
   * Additional content to be displayed on the right side of the badge.
   */
  extra?: ReactNode;

  /**
   * The icon component to render within the badge.
   */
  icon: IconComponent;

  /**
   * The main title text, it displays formatted text or customized content within the badge.
   */
  title: string | ReactNode;

  /**
   * Whether the badge description should be multiline or clipped with ellipsis at the first line.
   * */
  hasMultilineDescription?: boolean;

  /**
   * Additional content to be displayed alongside the badge title (e.g., a tag or an icon).
   */
  titleExtra?: ReactNode;
};
