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
export type { TableLocale } from 'antd/es/table/interface'
export type { AnyObject as GenericRecord } from 'antd/es/_util/type'
export type { TablePaginationConfig as Pagination } from 'antd'

export enum Layout {
  Auto = 'auto',
  Fixed = 'fixed',
}

export enum SortOrder {
  Ascend = 'ascend',
  Descend = 'descend',
}

export enum Size {
  Middle ='middle',
  Larger = 'large',
}

export enum ColumnAlignment {
  Left = 'left',
  Right = 'right',
}
