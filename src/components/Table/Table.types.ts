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

export type { ColumnType } from 'antd/es/table'
export type { ColumnFilterItem, ExpandableConfig, TableLocale as Locale, TableRowSelection as RowSelection } from 'antd/es/table/interface'
export type { AnyObject as GenericRecord } from 'antd/es/_util/type'
export type { TablePaginationConfig as Pagination } from 'antd'

export type Scroll = {
  x?: number | string | true,
  y?: number | string,
  scrollToFirstRowOnChange?: boolean,
}

export type UserAction = 'paginate' | 'sort' | 'filter'

export enum ColumnAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum ColumnFilterMode {
  Menu = 'menu',
  Tree = 'tree',
}

export enum Layout {
  Auto = 'auto',
  Fixed = 'fixed',
}

export enum Size {
  Small = 'small',
  Middle ='middle',
  Large = 'large',
}

export enum SortOrder {
  Ascend = 'ascend',
  Descend = 'descend',
}
