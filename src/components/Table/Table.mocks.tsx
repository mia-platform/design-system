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

import { ReactElement, useState } from 'react'
import { Space } from 'antd'
import { StoryFn } from '@storybook/react'
import { get } from 'lodash'

import { ColumnAlignment, ColumnFilterMode, ColumnType, ExpandableConfig, Pagination, RowSelection, SortOrder } from './Table.types'
import { Button } from '../Button'
import { Hierarchy as ButtonHierarchy } from '../Button/Button.types'
import { Table } from '.'
import { TableProps } from './Table'

const { Left, Center, Right } = ColumnAlignment
const { Menu, Tree } = ColumnFilterMode
const { Ascend, Descend } = SortOrder

type FieldName = string | string[]
type Callbacks = Record<string, () => void>

/** Data */

export type TableRecord = {
  field1: string,
  field2: string,
  field3: string,
  nested: {
    field4: string
  }
}

export const data: TableRecord[] = [
  { field1: 'Value 1', field2: 'Value 1', field3: 'Value 1', nested: { field4: 'Value 1' } },
  { field1: 'Value 2', field2: 'Value 2', field3: 'Value 2', nested: { field4: 'Value 2' } },
  { field1: 'Value 3', field2: 'Value 3', field3: 'Value 3', nested: { field4: 'Value 3' } },
  { field1: 'Value 4', field2: 'Value 4', field3: 'Value 4', nested: { field4: 'Value 4' } },
]

export const hugeData: TableRecord[] = Array.from({ length: 50 }).map((_, i) => ({
  field1: `Value ${i + 1}`,
  field2: `Value ${i + 1}`,
  field3: `Value ${i + 1}`,
  nested: { field4: `Value ${i + 1}` },
}))

export const rowKey = Object.keys(data[0])[0] as keyof TableRecord

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

const menufilterProps = (fieldName: FieldName): object => ({
  filters,
  filterMode: Menu,
  filterSearch: true,
  filterResetToDefaultFilteredValue: true,
  onFilter: (value: unknown, record: TableRecord) => get(record, fieldName) === value,
})

const treefilterProps = (fieldName: FieldName): object => ({
  filters,
  filterMode: Tree,
  filterSearch: true,
  filterResetToDefaultFilteredValue: true,
  onFilter: (value: unknown, record: TableRecord) => get(record, fieldName) === value,
})

/** Sorters */

const sortProps = (fieldName: FieldName): object => ({
  defaultSortOrder: Ascend,
  sortDirections: [Ascend, Descend],
  showSorterTooltip: true,
  sorter: (
    fieldA: TableRecord,
    fieldB: TableRecord
  ): number => (
    get(fieldA, fieldName) > get(fieldB, fieldName) ? 1 : -1
  ),
})

/** Columns */

export const columns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Field 1' },
  { dataIndex: 'field2', title: 'Field 2' },
  { dataIndex: 'field3', title: 'Field 3' },
  { dataIndex: ['nested', 'field4'], title: 'Field 4' },
]

export const scrollableColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Field 1 (fixed left)', width: '10%', fixed: Left },
  { dataIndex: 'field2', title: 'Field 2' },
  { dataIndex: 'field3', title: 'Field 3' },
  { dataIndex: ['nested', 'field4'], title: 'Field 4 (fixed right)', width: '10%', fixed: Right },
]

export const filteredAndSortedColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Filtered (Menu)', ...menufilterProps('field1') },
  { dataIndex: 'field2', title: 'Filtered (Tree)', ...treefilterProps('field2') },
  { dataIndex: 'field3', title: 'Sorted', ...sortProps('field3') },
  { dataIndex: ['nested', 'field4'], title: 'Filtered and Sorted', ...menufilterProps(['nested', 'field4']), ...sortProps(['nested', 'field4']) },
]

export const alignedColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Left Alignment', align: Left },
  { dataIndex: 'field2', title: 'Center Alignment', align: Center },
  { dataIndex: ['nested', 'field4'], title: 'Right Alignment', align: Right },
]

export const sizedColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: '20%', width: '20%' },
  { dataIndex: 'field2', title: '30%', width: '30%' },
  { dataIndex: 'field3', title: '40%', width: '40%' },
  { dataIndex: ['nested', 'field4'], title: '10%', width: '10%' },
]

export const spannedColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Field 1', colSpan: 1 },
  { dataIndex: 'field2', title: 'Field 2 - Field 3', colSpan: 2 },
  { dataIndex: 'field3', title: 'Field 3', colSpan: 0 },
  { dataIndex: ['nested', 'field4'], title: 'Field 4', colSpan: 1 },
]

/** Scroll */

export const scroll = {
  x: 1800,
  y: 200,
  scrollToFirstRowOnChange: true,
}

/** Row Selection */

export const rowSelection = (callbacks: Callbacks = {}): RowSelection<TableRecord> => ({
  columnTitle: '',
  defaultSelectedRowKeys: ['Value 1'],
  fixed: Left,
  hideSelectAll: false,
  type: 'checkbox',
  ...callbacks,
})

/** Row Expansion */

export const expandable = (callbacks: Callbacks = {}): ExpandableConfig<TableRecord> => ({
  columnTitle: '',
  defaultExpandAllRows: false,
  defaultExpandedRowKeys: ['Value 1'],
  expandIcon: undefined,
  expandedRowRender: () => 'Expandable row',
  expandRowByClick: true,
  rowExpandable: (record: TableRecord) => record.field1 !== 'Value 3',
  showExpandColumn: true,
  ...callbacks,
})

/** Pagination */

export const pagination = (callbacks: Callbacks = {}): Pagination => ({
  ...Table.pagination,
  ...callbacks,

  // Only to fit Storybook size
  defaultPageSize: 4,
  pageSizeOptions: [4, 10, 20],
})

/** Footer */

export const footer = (currentPageData: readonly TableRecord[]): ReactElement => {
  return (
    <span>
      {`Total rows number: ${currentPageData.length}`}
    </span>
  )
}

/** Externally controlled Filters and Sorters */

type FilterState = TableRecord[]
type SortState = {
  sortedColumn?: ColumnType<TableRecord>['dataIndex'],
  sortOrder?: SortOrder
}

export const WithExternalFiltersandSorters = (_: StoryFn, { args }: {args: TableProps<TableRecord>}): ReactElement => {
  const [filteredData, setFilteredData] = useState<FilterState>([])
  const [{ sortedColumn, sortOrder }, setSortedInfo] = useState<SortState>({})

  const dataWithValue2 = data.filter(record => Object.values(record).includes('Value 2'))
  const field2Descending = { sortedColumn: 'field2', sortOrder: Descend }

  const filterValue2 = (): void => setFilteredData(dataWithValue2)
  const sortField2Descending = (): void => setSortedInfo(field2Descending)

  const clearFilters = (): void => setFilteredData([])
  const clearSort = (): void => setSortedInfo({})

  return (
    <Space direction="vertical" style={{ width: '100%' }} >
      <Space>
        <Button hierarchy={ButtonHierarchy.Neutral} onClick={filterValue2}>{'Filter Value 2'}</Button>
        <Button hierarchy={ButtonHierarchy.Neutral} onClick={sortField2Descending}>{'Sort Field 2 Descending'}</Button>
        <Button hierarchy={ButtonHierarchy.Neutral} onClick={clearFilters}>{'Clear filters'}</Button>
        <Button hierarchy={ButtonHierarchy.Neutral} onClick={clearSort}>{'Clear sort'}</Button>
      </Space>
      <Table
        {...args}
        columns={args.columns?.map((column: ColumnType<TableRecord>) => ({
          ...column,

          /* Apply sort order */
          sortOrder: sortedColumn === column.dataIndex ? sortOrder : undefined,
          sorter: (fieldA: TableRecord, fieldB: TableRecord) => (fieldA?.field2 > fieldB?.field2 ? 1 : -1),

          /* Apply filters */
          filtered: true,
          filteredValue: filteredData.map(record => get(record, column.dataIndex!)),
          onFilter: (value: unknown, record: TableRecord) => get(record, column.dataIndex!) === value,
        }))}
      />
    </Space>
  )
}
