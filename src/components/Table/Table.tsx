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

import { Table as AntTable, Skeleton } from 'antd'
import { PiPencilSimpleLine, PiTrash } from 'react-icons/pi'
import { ReactElement, useCallback, useMemo } from 'react'
import classnames from 'classnames'

import { Action, ColumnAlignment, ColumnFilterMode, GenericRecord, Layout, RowState, Size, SortOrder } from './Table.types'
import { Icon } from '../Icon'
import { IconProps } from '../Icon/Icon.props'
import { TableProps } from './Table.props'
import { getAction } from './Table.Action'
import styles from './Table.module.css'
import { useTheme } from '../../hooks/useTheme'

const { Auto } = Layout
const { Middle } = Size
const { Edit, Delete } = Action
const { table, fitParentHeight, hasPagination } = styles

export const defaults = {
  actions: [],
  pagination: {
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
  },
  scroll: { x: true as const },
  isBordered: false,
  isLoading: false,
  layout: Auto,
  onDeleteRow: undefined,
  onEditRow: undefined,
  size: Middle,
}

/**
 * UI component for presenting tabular structured data
 *
 * @link https://ant.design/components/table
 * @returns {ReactElement} Table component
 */
export const Table = <RecordType extends GenericRecord>({
  columns,
  data,
  actions = defaults.actions,
  expandable,
  footer,
  intlLocale,
  isBordered = defaults.isBordered,
  isLoading = defaults.isLoading,
  layout = defaults.layout,
  onChange,
  onHeaderRow,
  onRow,
  onEditRow = defaults.onEditRow,
  onDeleteRow = defaults.onDeleteRow,
  rowKey,
  rowSelection,
  pagination = defaults.pagination,
  size = defaults.size,
  scroll = defaults.scroll,
  rowState,
  hasParentHeight,
  preventUnmountOnLoading,
}: TableProps<RecordType>): ReactElement => {
  const theme = useTheme()
  const className = useMemo(() => classnames([
    table,
    hasParentHeight && fitParentHeight,
    pagination && hasPagination,
  ]), [hasParentHeight, pagination])

  const iconSize = theme?.shape?.size?.md as IconProps['size'] || 16

  const editAction = useMemo(() => actions?.find(({ dataIndex }) => dataIndex === Edit), [actions])
  const deleteAction = useMemo(() => actions?.find(({ dataIndex }) => dataIndex === Delete), [actions])
  const customActions = useMemo(() => actions?.filter(({ dataIndex }) => (
    dataIndex !== Edit && dataIndex !== Delete
  )), [actions])

  const tableColumns = useMemo(() => [
    ...columns.map((column) => ({ ellipsis: true, ...column })),
    ...customActions?.map(getAction) || [],
    ...editAction?.onClick || onEditRow ? [getAction({
      dataIndex: Edit,
      icon: (
        <Icon
          aria-label={'Edit row'}
          color="currentColor"
          component={PiPencilSimpleLine}
          size={iconSize}
        />
      ),
      onClick: onEditRow,
      ...editAction,
    })] : [],
    ...deleteAction?.onClick || onDeleteRow ? [getAction({
      dataIndex: Delete,
      icon: (
        <Icon
          aria-label={'Delete row'}
          color="currentColor"
          component={PiTrash}
          size={iconSize}
        />
      ),
      isDanger: true,
      onClick: onDeleteRow,
      ...deleteAction,
    })] : [],
  ], [columns, customActions, deleteAction, editAction, iconSize, onDeleteRow, onEditRow])

  const tablePagination = useMemo(() => pagination !== false && ({
    ...Table.pagination,
    ...pagination,
  }), [pagination])

  const rowClassName = useCallback((record: RecordType, index: number) => {
    const state = rowState?.(record, index)
    const isValidState = state && Object.values(Table.RowState).includes(state)
    return isValidState ? styles[`${state}State`] : ''
  }, [rowState])

  const tableComponent = useMemo(() => (
    <AntTable<RecordType>
      bordered={isBordered}
      className={className}
      columns={tableColumns}
      dataSource={data}
      expandable={expandable}
      footer={footer}
      loading={isLoading}
      locale={intlLocale}
      pagination={tablePagination}
      rowClassName={rowState ? rowClassName : undefined}
      rowKey={rowKey}
      rowSelection={rowSelection}
      scroll={scroll}
      showHeader
      showSorterTooltip={false}
      size={size}
      sticky={false}
      tableLayout={layout}
      virtual={false}
      onChange={onChange}
      onHeaderRow={onHeaderRow}
      onRow={onRow}
    />
  ), [
    className,
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
    rowClassName,
    rowKey,
    rowSelection,
    rowState,
    scroll,
    size,
    tableColumns,
    tablePagination,
  ])

  if (preventUnmountOnLoading) {
    return tableComponent
  }

  return (
    <Skeleton active loading={isLoading}>
      {tableComponent}
    </Skeleton>
  )
}

Table.scroll = defaults.scroll
Table.pagination = defaults.pagination

Table.ColumnAlignment = ColumnAlignment
Table.ColumnFilterMode = ColumnFilterMode
Table.Layout = Layout
Table.Size = Size
Table.SortOrder = SortOrder
Table.Action = Action
Table.RowState = RowState
