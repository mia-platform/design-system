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

import { ReactNode } from 'react'

export type BreadcrumbItemMenuItem = {
  icon?: ReactNode
  key?: string
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
  label: string
}

export type OnSearch = (
  value: string,
  event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  info?: { source?: 'clear' | 'input';}
) => void

export type BreadcrumbItemMenu = {
  activeKey?: string
  items?: BreadcrumbItemMenuItem[]
  onDropdownVisibleChange?: (open: boolean) => void
  onSearch?: OnSearch
  open?: boolean
  searchAllowClear?: boolean
  searchPlaceholder?: string
  showSearch?: boolean
}

export type BreadcrumbItemType = {
  icon?: ReactNode
  key?: string
  label?: ReactNode
  menu?: BreadcrumbItemMenu
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
}
