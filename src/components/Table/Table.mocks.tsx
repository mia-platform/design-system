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

/* eslint-disable react/prop-types */

import { ReactElement, useState } from 'react'
import { Space } from 'antd'
import { StoryFn } from '@storybook/react'
import { get } from 'lodash'

import * as ButtonTypes from '../Button/Button.types'
import { ColumnAlignment, ColumnFilterMode, ColumnType, Pagination, SortOrder } from './Table.types'
import { Button } from '../Button'
import { Table } from '.'
import { TableProps } from './Table'

const { Left, Center, Right } = ColumnAlignment
const { Menu, Tree } = ColumnFilterMode
const { Ascend, Descend } = SortOrder

/** Data */

export type Record = {
  field1: string,
  field2: string,
  field3: string,
  nested: {
    field4: string
  },
  actions?: string[]
}

export const data: Record[] = [
  { field1: 'Value 1', field2: 'Value 1', field3: 'Value 1', nested: { field4: 'Value 1' } },
  { field1: 'Value 2', field2: 'Value 2', field3: 'Value 2', nested: { field4: 'Value 2' } },
  { field1: 'Value 3', field2: 'Value 3', field3: 'Value 3', nested: { field4: 'Value 3' } },
  { field1: 'Value 4', field2: 'Value 4', field3: 'Value 4', nested: { field4: 'Value 4' } },
]

export const hugeData: Record[] = Array.from({ length: 50 }).map((i) => ({
  field1: `Value ${i}`,
  field2: `Value ${i}`,
  field3: `Value ${i}`,
  nested: { field4: `Value ${i}` },
}))

/** Filters */

export const filters = [
  { text: 'Value 1', value: 'Value 1' },
  { text: 'Value 2', value: 'Value 2' },
  { text: 'Submenu',
    value: 'Submenu',
    children: [
      { text: 'Value 3', value: 'Value 3' },
      { text: 'Value 4', value: 'Value 4' },
    ],
  },
]

const menufilterProps = {
  filterMode: Menu,
  filterSearch: true,
  onFilter: (value: unknown, record: Record) => record.field1 === value,
}

const treefilterProps = {
  filterMode: Tree,
  filterSearch: true,
  onFilter: (value: unknown, record: Record) => record.field2 === value,
}

export const ExternallyControlledFilters = (_: StoryFn, { args }: {args: TableProps<Record>}): ReactElement => {
  const { columns } = args

  const [filteredData, setFilteredData] = useState<Record[]>([])
  const [{ sortedColumn, order }, setSortedInfo] = useState<{sortedColumn?: string, order?: SortOrder}>({})

  const dataWithValue2 = data.filter(record => Object.values(record).includes('Value 2'))
  const field2Descending = { sortedColumn: 'field2', order: Descend }

  const clearFilters = (): void => setFilteredData([])
  const filterValue2 = (): void => setFilteredData(dataWithValue2)

  const clearSort = (): void => setSortedInfo({})
  const sortField2Descending = (): void => setSortedInfo(field2Descending)

  const filteredAndSortedColumns = columns?.map((column: ColumnType<Record>) => ({
    ...column,

    /* Apply sort order */
    sortOrder: sortedColumn === column.dataIndex ? order : undefined,
    sorter: (fieldA: Record, fieldB: Record) => (fieldA?.field2 > fieldB?.field2 ? 1 : -1),

    /* Apply filters */
    filteredValue: filteredData.map(record => get(record, column.dataIndex!)),
    onFilter: (value: unknown, record: Record) => get(record, column.dataIndex!) === value,
  }))

  return (
    <Space direction="vertical" style={{ width: '100%' }} >
      <Space>
        <Button type={ButtonTypes.Type.Outlined} onClick={filterValue2}>{'Filter Value 2'}</Button>
        <Button type={ButtonTypes.Type.Outlined} onClick={sortField2Descending}>{'Sort Field 2 Descending'}</Button>
        <Button type={ButtonTypes.Type.Outlined} onClick={clearFilters}>{'Clear filters'}</Button>
        <Button type={ButtonTypes.Type.Outlined} onClick={clearSort}>{'Clear sort'}</Button>
      </Space>
      <Table {...args} columns={filteredAndSortedColumns} />
    </Space>
  )
}

/** Sorters */

export const sorter = (
  { field1: fieldA }: Record,
  { field1: fieldB }: Record
): number => (fieldA > fieldB ? 1 : -1)

const sortProps = {
  defaultSortOrder: Ascend,
  sortDirections: [Ascend, Descend],
  showSorterTooltip: true,
}

/** Columns */

export const columns: ColumnType<Record>[] = [
  { dataIndex: 'field1', title: 'Field 1' },
  { dataIndex: 'field2', title: 'Field 2' },
  { dataIndex: 'field3', title: 'Field 3' },
  { dataIndex: ['nested', 'field4'], title: 'Field 4' },
]

export const alignedColumns: ColumnType<Record>[] = [
  { dataIndex: 'field1', title: 'Left Alignment', align: Left },
  { dataIndex: 'field2', title: 'Center Alignment', align: Center },
  { dataIndex: ['nested', 'field4'], title: 'Right Alignment', align: Right },
]

export const filteredAndSortedColumns: ColumnType<Record>[] = [
  { dataIndex: 'field1', title: 'Filtered (Menu)', filters, ...menufilterProps },
  { dataIndex: 'field2', title: 'Filtered (Tree)', filters, ...treefilterProps },
  { dataIndex: 'field3', title: 'Sorted', sorter, ...sortProps },
  { dataIndex: 'field4', title: 'Filtered and Sorted', filters, sorter },
]

export const spannedColumns: ColumnType<Record>[] = [
  { dataIndex: 'field1', title: 'Left Alignment', colSpan: 0 },
  { dataIndex: 'field2', title: 'Center Alignment' },
  { dataIndex: 'field3', title: 'Right Alignment' },
]

export const sizedColumns: ColumnType<Record>[] = [
  { dataIndex: 'field1', title: '20%', width: '20%' },
  { dataIndex: 'field2', title: '30%', width: '30%' },
  { dataIndex: 'field3', title: '40%', width: '40%' },
  { dataIndex: ['nested', 'field4'], title: '10%', width: '10%' },
]

/** Pagination */

export const pagination = ({ onChange, onShowSizeChange }: {
  onChange?: () => void,
  onShowSizeChange?: () => void,
  showTotal?: (total: number) => ReactElement
}): Pagination => ({
  ...Table.pagination,
  defaultCurrent: 1,
  defaultPageSize: 4,
  pageSizeOptions: [4, 10, 20],
  onChange,
  onShowSizeChange,
})

/** Footer */

export const footer = (currentPageData: readonly Record[]): ReactElement => {
  return (
    <span>
      {`Total rows number: ${currentPageData.length}`}
    </span>
  )
}
