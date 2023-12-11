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

 /**
  * An array of column configurations for the table.
  */
 columns: ColumnType<Record>[],

 /**
  * The array of data records to be displayed in the table.
  */
 data: Record[],

 /**
  * Configuration for making the table rows expandable.
  */
 expandable?: ExpandableConfig<Record>,

 /**
  * The locale configuration for internationalization
  */
 intlLocale?: Locale,

 /**
  * Indicates wheter the table has borders
  */
 isBordered?: boolean,

 /**
  * Indicates wheter the table is in a loading state (skeleton)
  */
 isLoading?: boolean,

 /**
  * A custom footer component for the table.
  *
  * @param currentPageData - The data of the current page.
  * @returns React element to be displayed under the table.
  */
 footer?: (currentPageData: readonly Record[]) => ReactElement,

 /**
  * The table-layout attributre of the table.
  *
  * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout}
  */
 layout?: Layout,

 /**
  * Callback function triggered when there are changes in the table (pagination, filters, sorter, etc.).
  *
  * @param pagination - The pagination configuration.
  * @param filters - The applied filters.
  * @param sorter - The sorting configuration.
  * @param extra - Additional information including current data source and the triggered user action.
  */
 onChange?: (
  pagination: unknown,
  filters: unknown,
  sorter: unknown,
  extra: { currentDataSource: readonly Record[], action: UserAction }
) => void,

/**
  * Callback function for customizing the header row of the table.
  *
  * @param columns - The columns of the header row.
  * @param index - The index of the header row.
  * @returns The header row component.
  */
 onHeaderRow?: (columns: readonly ColumnType<Record>[], index?: number) => any,

 /**
  * Callback function for customizing each table row.
  *
  * @param record - The data record for the row.
  * @param index - The index of the row.
  * @returns The customized row component.
  */
 onRow?: (record: Record, index?: number) => any,

 /**
  * Configuration for table pagination.
  */
 pagination?: Pagination,

/**
  * The key used to identify each row of the table.
  *
  * @remarks use the first level key for nested fields (e.g. ["foo", "bar"] becomes "foo")
  */
 rowKey: string,

 /**
  * Configuration for row selection in the table.
  */
 rowSelection?: RowSelection<Record>,

 /**
  * The size of the table.
  */
 size?: Size,

 /**
  * Configuration for table scrolling.
  */
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
        sticky={true}
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
