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

import { ColumnType, GenericRecord, Layout, Pagination, Size, TableLocale } from './Table.types'

const { Middle } = Size

export type TableProps<Record> = {
 columns: ColumnType<Record>[],
 data: Record[],
 intlLocale?: TableLocale,
 isBordered?: boolean,
 isLoading?: boolean,
 footer?: (currentPageData: readonly Record[]) => ReactElement,
 layout?: Layout,
 onChange?: (
  pagination: unknown,
  filters: any,
  sorter: unknown,
  extra: {
    currentDataSource: readonly Record[],
    action: 'paginate' | 'sort' | 'filter'
}) => void,
 onHeaderRow?: (columns: any, index?: number) => any,
 onRow?: (record: Record, index?: number) => any,
 pagination?: Pagination,
 rowKey?: string,
 size: Size,
 title?: (data: any) => string,
}

/**
 * UI component for presenting tabular data
 *
 * @link https://ant.design/components/table
 * @returns {Table} Table component
 */
export const Table = <Record extends GenericRecord>({
  columns,
  data,
  footer,
  intlLocale,
  isBordered,
  isLoading,
  layout,
  onChange,
  onHeaderRow,
  onRow,
  // rowKey,
  pagination,
  size,
  title,
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
        // expandable={}
        footer={footer}
        loading={false}
        locale={intlLocale}
        pagination={pagination}
        // rowKey={rowKey ?? columns?.[0]?.dataIndex}
        // rowSelection={}
        // scroll={}
        showHeader
        // showSorterTooltip={}
        size={size}
        // sticky={}
        tableLayout={layout}
        title={title}
        onChange={onChange}
        onHeaderRow={onHeaderRow}
        onRow={onRow}
        // virtual={}
      />
    </Skeleton>
  )
}

Table.defaultProps = {
  isBordered: false,
  isLoading: false,
  pagination: {
    defaultCurrent: 1,
    defaultPageSize: 10,
    hideOnSinglePage: true,
    pageSizeOptions: [10, 20, 50],
    responsive: true,
    showLessItems: false,
    showTitle: true,
    showTotal: Table.showTotal,
  },
  size: Middle,
}

Table.showTotal = (total: number): ReactElement => (
  <div style={{ display: 'flex', gap: 4 }}>
    <b>{total}</b>
    {'in total'}
  </div>
)