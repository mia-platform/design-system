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

/* eslint-disable max-len */

import { Table as AntTable, Skeleton } from 'antd'
import { HTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames'

import { ColumnType, ExpandableConfig, GenericRecord, Layout, Locale, Pagination, RowFormatting, RowSelection, Scroll, Size, UserAction } from './Table.types'
import { getRecordFormatting } from './Table.utils'
import styles from './Table.module.css'

const { Auto } = Layout
const { Middle } = Size
const { table } = styles

export type TableProps<RecordType extends GenericRecord> = {

 /**
  * An array of column configurations for the table.
  *
  * column `object`:
  *   - dataIndex*: The column identifier or, if nested, an array of identifiers. <br> `string` | `string[]`
  *   - title*: Column displayed label. <br> `string`
  *   - align: The way the column content is aligned. <br> `"left"` | `"center"` | `"right"`
  *   - colSpan: The number of columns the header occupies. <br> `number`
  *   - defaultFilteredValue: The initially filtered values for the column. <br> `string[]`
  *   - defaultSortOrder: The initially applied sort order for the column. <br> `"ascend"` | `"descend"`
  *   - filtered: Whether the data source is filtered. <br> `boolean`
  *   - filteredValue: Controlled filtered values for the column. <br> `string[]`
  *   - filterIcon: Filter dropdown custom icon. <br> `ReactNode`
  *   - filterMode: Filter dropdown graphical appearance. <br> `"menu"` | `"tree"`
  *   - filterMultiple: Whether multiple filters can be selected. <br> `boolean`
  *   - filters: filters configurations for the column. <br> `object`:
  *       - text: Filter option display value. <br> `ReactNode`
  *       - value: Value provided to the table when the filter is applied. <br> `string` | `number` | `boolean`
  *       - children: sub-filters configurations (same as filters).`object`
  *   - filterSearch: Whether to display a search bar in filter dropdown. <br> `boolean`
  *   - filterResetToDefaultFilteredValue: Whether to apply the initial filter when filters reset. <br> `boolean`
  *   - fixed: Whether the column should stick to a fixed position. <br> `"left"` | `"right"`
  *   - key: Unique key for the column. Ignore if dataIndex is unique. <br> `string`
  *   - render: Column custom render function. <br> `(value: any, record: RecordType, index: number) => ReactNode`
  *   - shoSorterTooltip: Whether the sorter tooltip is displayed. <br> `booean`
  *   - sortDirections: Possible sort directions for the column. <br> `["ascend", "descend"]`
  *   - sorter: Sorting function applied between two records. <br> `(a: RecordType, b: RecordType, sortOrder: "ascend" | "descend") => boolean`
  *   - sortOrder: Controlled sort order for the column. <br> `"ascend" | "descend"`
  *   - sortIcon: Sorter custom icon. <br> `ReactNode`
  *   - width: Column width, either a percentage or number of pixels. <br> `string` | `number`
  *   - onCell: Function to set props for specific cells. <br> `(record: RecordType, rowIndex: number) => void`
  *   - onHeaderCell: Function to set props for specific header cells. <br> `(record: RecordType, rowIndex: number) => void`
  *   - onFilter: Function that determines filtered values. <br> `(value: any, record: RecordType) => boolean`
  *   - onFilterDropdownOpenChange: Callback invoked when opening or closing filter dropdown. <br> `(visible: boolean) => void`
  *
  * @see {@link https://ant.design/components/table#column} for advanced configurations.
  */
 columns: ColumnType<RecordType>[],

 /**
  * The array of data records to be displayed in the table.
  */
 data: RecordType[],

 /**
  * Configuration for making the table rows expandable.
  *
  * expandable `object`:
  *   - columnTitle: The name displayed on the expansion column. <br> `ReactNode`
  *   - columnWidth: The width of the expansion column. <br> `string` | `number`
  *   - defaultExpandAllRows: Whether the rows are initially expanded. <br> `boolean`
  *   - defaultExpandedRowKeys: The initially expanded rows. <br> `React.Key[]`
  *   - expandedRowClassName: A custom class for expanded rows. <br> `(record: RecordType, index: number) => string`
  *   - expandedRowKeys: Externally controlled expanded rows. <br> `React.Key[]`
  *   - expandedRowRender: A custom expanded row render. <br> `(record: RecordType, index: number) => ReactNode`
  *   - expandRowByClick: Whether the row expands by clicking the whole row. <br> `boolean`
  *   - expandIcon: A custom expand icon for the row. <br> `(prefixCls: string, expanded: boolean, record: RecordType, expandable: boolean, onExpand: (record: RecordType, event: Event) => void) => ReactNode`
  *   - fixed: Whether the expansion column should stick to a fixed position. <br> `"left"` | `"right"`
  *   - showExpandColumn: Whether the expansion column is visible. <br> `boolean`
  *   - rowExpandable: A function that determines whether a row is expandable. <br> `(record: RecordType) => boolean`
  *   - onExpand: Callback invoked when expanding a row. <br> `(expanded: boolean, record: RecordType) => void`
  *   - onExpandedRowsChange: Callback invoked when expanding any of the rows. <br> `(expandedKeys: readonly Key[]) => void`
  *
  * @see {@link https://ant.design/components/table#expandable} for advanced configurations.
  */
 expandable?: ExpandableConfig<RecordType>,

 /**
  * The locale configuration for internationalization
  */
 intlLocale?: Locale,

 /**
  * Indicates whether the table has borders
  */
 isBordered?: boolean,

 /**
  * Indicates whether the table is in a loading state (skeleton)
  */
 isLoading?: boolean,

 /**
  * A custom footer component for the table.
  *
  * @param currentPageData - The data of the current page.
  * @returns React element to be displayed under the table.
  */
 footer?: (currentPageData: readonly RecordType[]) => ReactElement,

 /**
  * The table-layout attribute of the table.
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
  extra: { currentDataSource: readonly RecordType[], action: UserAction }
) => void,

/**
  * Callback function for customizing the header row of the table.
  *
  * @param columns - The columns of the header row.
  * @param index - The index of the header row.
  * @returns The header row component.
  */
 onHeaderRow?: (columns: readonly ColumnType<RecordType>[], index?: number) => HTMLAttributes<unknown>,

 /**
  * Callback function for customizing each table row.
  *
  * @param record - The data record for the row.
  * @param index - The index of the row.
  * @returns The customized row component.
  */
 onRow?: (record: RecordType, index?: number) => HTMLAttributes<unknown>,

 /**
  * Configuration for table pagination.
  *
  * pagination `object`:
  *   - current: The externally controlled selected page. <br> `number`
  *   - defaultCurrent: The initially selected page. <br> `number`
  *   - defaultPageSize: The initially selected size of the page. <br> `number`
  *   - disabled: Whether the pagination is disabled. <br> `boolean`
  *   - hideOnSinglePage: Whether the pagination is hidden when only one page is present. <br> `boolean`
  *   - pageSize: The externally controlled size of the page. <br> `number`
  *   - pageSizeOptions: The options shown in the page size changer. <br> `number[]`
  *   - responsive: Whether the pagination resizes automatically with the window. <br> `boolean`
  *   - showLessItems: Whether to show less page items. <br> `boolean`
  *   - showQuickJumper: Whether to show the exact page selector. <br> `boolean`
  *   - showSizeChanger: Whether to show the page size selector. <br> `boolean`
  *   - showTitle: Whether to show the page size selector. <br> `boolean`
  *   - showTotal: Custom total title function. <br> `(total: number) => ReactElement`
  *   - simple: Whether a simpler pagination is set. <br> `boolean`
  *   - size: The size of the pagination. <br> `"small" | "default"`
  *   - total: Externally controlled number of total items. <br> `number`
  *   - onChange: Callback invoked when updating page size or page number. <br> `(page: number, pageSize: number) => void`
  *   - onShowSizeChange: Callback invoked when selecting an option. <br> `(current: number, pageSize: number) => void`
  *
  * @see {@link https://ant.design/components/pagination#api} for advanced configurations.
  */
 pagination?: Pagination,

 /**
 * Configuration for row selection in the table.
 *
 * - formattedRowKeys: Externally controlled formatted rows. <br> `Record<RecordType[keyof RecordType], "info" | "success" | "warning" | "error">`
 */
 rowFormatting?: RowFormatting<RecordType>

/**
  * The key used to identify each row of the table.
  *
  * @remarks use the first level key for nested fields (e.g. ["foo", "bar"] becomes "foo")
  */
 rowKey: keyof RecordType,

 /**
  * Configuration for row selection in the table.
  *
  * rowSelection `object`:
  *   - columnTitle: The name displayed on the selection column. <br> `ReactNode`
  *   - columnWidth: The width of the selection column. <br> `string` | `number`
  *   - defaultSelectedRowKeys: The initially selected rows. <br> `React.Key[]`
  *   - fixed: Whether the selection column should stick to a fixed position. <br> `"left"` | `"right"`
  *   - hideSelectAll: Whether to hide the select all checkbox (only for type "checkbox"). <br> `boolean`
  *   - selectedRowKeys: Externally controlled selected rows. <br> `React.Key[]`
  *   - type: Selection type, use radio for mutual exclusive selection. <br> `"checkbox"` | `"radio"`
  *   - onChange: Callback invoked when updating the table. <br> `(selectedRowKeys: string[], selectedRows: RecordType[], info: { type: "checkbox" | "radio" }) => void`
  *   - onSelect: Callback invoked when selecting an option. <br> `(record: RecordType, selected: boolean, selectedRows: RecordType[], nativeEvent: Event) => void`
  *   - onSelectAll: Callback invoked when selecting all options. <br> `(selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void`
  *   - onSelectMultiple: Callback invoked when selecting all options. <br> `(selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => void`
  *   - onSelectNone: Callback invoked when deselecting all options. <br> `() => void`
  *
  * @see {@link https://ant.design/components/table#rowselection} for advanced configurations.
  */
 rowSelection?: RowSelection<RecordType>,

 /**
  * The size of the table.
  */
 size?: Size,

 /**
  * Configuration for table scrolling.
  *
  * scroll `object`:
  *   - x: Minimum width from which the table scrolls horizontally. If true, it sets the width as max-content. <br> `number | string | true`
  *   - y: Minimum height from which the table scrolls vertically. <br> `number | string`
  *   - scrollToFirstRowOnChange: Whether to automatically scroll to the first row of the page after onChange is invoked. <br> `boolean`
  */
 scroll?: Scroll,
}

/**
 * UI component for presenting tabular structured data
 *
 * @link https://ant.design/components/table
 * @returns {Table} Table component
 */
export const Table = <RecordType extends GenericRecord>({
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
  rowFormatting,
  rowKey,
  rowSelection,
  pagination,
  size,
  scroll,
}: TableProps<RecordType>): ReactElement => {
  return (
    <Skeleton
      active
      loading={isLoading}
    >
      <AntTable<RecordType>
        bordered={isBordered}
        className={table}
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
        onRow={(record, i) => ({
          ...onRow?.(record, i),
          className: classNames([
            getRecordFormatting(rowKey, rowFormatting)(record),
            onRow?.(record, i)?.className,
          ]),
        })}
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
