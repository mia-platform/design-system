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

import { ColumnsType } from 'antd/es/table'
import { ReactElement } from 'react'

import { ColumnAlignment, Pagination, SortOrder } from './Table.types'
import { Table } from '.'
// import { Icon } from '../Icon'

const { Left, Right } = ColumnAlignment
const { Ascend, Descend } = SortOrder

/** Data */

export type Record = {
  field1: string,
  field2: string,
  field3: string,
  nested: {
    field4: string
  },
}

export const data: Record[] = [
  { field1: 'Value 1', field2: 'Value 1', field3: 'Value 1', nested: { field4: 'Value 1' } },
  { field1: 'Value 2', field2: 'Value 2', field3: 'Value 2', nested: { field4: 'Value 2' } },
  { field1: 'Value 3', field2: 'Value 3', field3: 'Value 3', nested: { field4: 'Value 3' } },
  { field1: 'Value 4', field2: 'Value 4', field3: 'Value 4', nested: { field4: 'Value 4' } },
]

/** Filters */

export const filters = [
  { text: 'Field 1', value: 'test1' },
  { text: 'Field 1', value: 'field2' },
  { text: 'Submenu',
    value: 'Submenu',
    children: [
      { text: 'Green', value: 'Green' },
      { text: 'Black', value: 'Black' },
    ],
  },
]

/** Sorters */

export const sorter = (
  { field1: fieldA }: Record,
  { field1: fieldB }: Record
): number => (fieldA > fieldB ? 1 : -1)

const sortProps = {
  defaultSortOrder: Ascend,
  sortDirections: [Ascend, Descend],
  showSorterTooltip: true,
  // sortOrder: Ascend,
  // sortIcon: ({ sortOrder }) => {
  //   return sortOrder
  //     ? <Icon name={sortOrder === Ascend ? 'PiSortAscending' : 'PiSortDescending'} size={16} />
  //     : null
  // },
}

/** Columns */

export const columns: ColumnsType<Record> = [
  { dataIndex: 'field1', title: 'Field 1' },
  { dataIndex: 'field2', title: 'Field 2' },
  { dataIndex: 'field3', title: 'Field 3' },
  { dataIndex: ['nested', 'field4'], title: 'Field 4' },
]

export const alignedColumns: ColumnsType<Record> = [
  { dataIndex: 'field1', title: 'Left Alignment', align: Left },
  { dataIndex: 'field2', title: 'Right Alignment', align: Right },
  { dataIndex: 'field3', title: 'Left Alignment', align: Left },
  { dataIndex: ['nested', 'field4'], title: 'Right Alignment', align: Right },
]

export const filteredAndSortedColumns: ColumnsType<Record> = [
  { dataIndex: 'field1', title: 'Filtered and Sorted', filters, sorter },
  { dataIndex: 'field2', title: 'Sorted', sorter, ...sortProps },
  { dataIndex: 'field3', title: 'Right Alignment', filters },
]

export const spannedColumns: ColumnsType<Record> = [
  { dataIndex: 'field1', title: 'Left Alignment', colSpan: 0 },
  { dataIndex: 'field2', title: 'Center Alignment' },
  { dataIndex: 'field3', title: 'Right Alignment' },
]

export const sizedColumns: ColumnsType<Record> = [
  { dataIndex: 'field1', title: '20%', width: '20%' },
  { dataIndex: 'field2', title: '30%', width: '30%' },
  { dataIndex: 'field3', title: '40%', width: '40%' },
  { dataIndex: ['nested', 'field4'], title: '10%', width: '10%' },
]

/** Pagination */

export const pagination = ({ onChange, showTotal = Table.showTotal }: {
  onChange?: () => void,
  showTotal?: (total: number) => ReactElement
}): Pagination => ({
  defaultCurrent: 1,
  defaultPageSize: 2,
  showTotal,
  onChange,
})

/** Footer */

export const footer = (currentPageData: readonly Record[]): ReactElement => {
  return (
    <div>
      {`Total rows number: ${currentPageData.length}`}
    </div>
  )
}
