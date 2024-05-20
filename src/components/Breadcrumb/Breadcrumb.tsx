/**
 * Copyright 2023 Mia srl
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

import { ReactElement } from 'react'

import { BreadcrumbItem } from './BreadcrumbItem'
import { BreadcrumbProps } from './Breadcrumb.props'

/**
 * UI component for displaying the current location within an hierarchy
 *
 * @returns {Breadcrumb} Breadcrumb component
 */
export const Breadcrumb = ({
  items,
}: BreadcrumbProps): ReactElement => {
  return (
    <>
      {items.map(({ icon, onClick, title }, index) =>
        <BreadcrumbItem
          icon={icon}
          index={index}
          key={'breadcrumb-item'}
          title={title}
          onClick={onClick}
        />
      )}
    </>
  )
}
