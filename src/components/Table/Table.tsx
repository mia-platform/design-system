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

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table as AntTable, Skeleton } from 'antd'
import { ReactElement } from 'react'

import { ColumnType, ExpandableConfig, GenericRecord, Layout, Locale, Pagination, RowSelection, Scroll, Size, UserAction } from './Table.types'

const { Auto } = Layout
const { Middle } = Size

export type TableProps<Record> = {
 columns: ColumnType<Record>[],
 data: Record[],
 expandable?: ExpandableConfig<Record>,
 intlLocale?: Locale,
 isBordered?: boolean,
 isLoading?: boolean,
 footer?: (currentPageData: readonly Record[]) => ReactElement,
 layout?: Layout,
 onChange?: (
  pagination: unknown,
  filters: unknown,
  sorter: unknown,
  extra: {
    currentDataSource: readonly Record[],
    action: UserAction
}) => void,
 onHeaderRow?: (columns: readonly ColumnType<Record>[], index?: number) => any,
 onRow?: (record: Record, index?: number) => any,
 pagination?: Pagination,
 rowKey: string,
 rowSelection?: RowSelection<Record>,
 size?: Size,
 scroll?: Scroll,
}

/**
 * UI component for presenting tabular structured data
 *
 * @link https://ant.design/components/table
 * @returns {Table} Table component
 */
export const Table = <Record extends GenericRecord>({
  columns,
  data,
  expandable,
  footer,
  intlLocale,
  isBordered,
  isLoading,
  layout,
  onChange,
  onHeaderRow,
  onRow,
  rowKey,
  rowSelection,
  pagination,
  size,
  scroll,
}: TableProps<Record>): ReactElement => {
  return (
    <Skeleton
      active
      loading={isLoading}
    >
      <AntTable<Record>
        bordered={isBordered}
        columns={columns}
        dataSource={data}
        expandable={expandable}
        footer={footer}
        loading={false}
        locale={intlLocale}
        pagination={pagination}
        rowKey={rowKey}
        rowSelection={rowSelection}
        scroll={scroll}
        showHeader
        showSorterTooltip={false}
        size={size}
        // sticky={}
        tableLayout={layout}
        virtual={false}
        onChange={onChange}
        onHeaderRow={onHeaderRow}
        onRow={onRow}
      />
    </Skeleton>
  )
}

Table.scroll = {
  x: true as const,
}

Table.pagination = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  hideOnSinglePage: true,
  pageSizeOptions: [10, 20, 50],
  responsive: true,
  showLessItems: false,
  showSizeChanger: true,
  showTitle: true,
  showTotal: (total: number): ReactElement => (
    <span>
      <b>{total}</b>
      {' in total'}
    </span>
  ),
}

Table.defaultProps = {
  isBordered: false,
  isLoading: false,
  layout: Auto,
  pagination: Table.pagination,
  scroll: Table.scroll,
  size: Middle,
}
