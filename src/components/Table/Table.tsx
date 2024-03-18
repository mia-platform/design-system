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
import { ReactElement, useMemo } from 'react'

import { GenericRecord, Layout, Size } from './Table.types'
import { Icon } from '../Icon'
import { IconProps } from '../Icon/Icon.props'
import { TableProps } from './Table.props'
import { getAction } from './Table.Action'
import styles from './Table.module.css'
import { useTheme } from '../../hooks/useTheme'

const { Auto } = Layout
const { Middle } = Size
const { table } = styles

/**
 * UI component for presenting tabular structured data
 *
 * @link https://ant.design/components/table
 * @returns {Table} Table component
 */
export const Table = <RecordType extends GenericRecord>({
  columns,
  data,
  actions,
  expandable,
  footer,
  intlLocale,
  isBordered,
  isLoading,
  layout,
  onChange,
  onHeaderRow,
  onRow,
  onEditRow,
  onDeleteRow,
  rowKey,
  rowSelection,
  pagination,
  size,
  scroll,
}: TableProps<RecordType>): ReactElement => {
  const theme = useTheme()
  const iconSize = theme?.shape?.size?.lg as IconProps['size'] ?? 24

  const tableColumns = useMemo(() => [
    ...columns,
    ...actions?.map(getAction) ?? [],
    ...onEditRow ? [getAction({
      dataIndex: 'edit',
      icon: <Icon color="currentColor" name="PiPencilSimpleLine" size={iconSize} />,
      onClick: onEditRow,
    })] : [],
    ...onDeleteRow ? [getAction({
      dataIndex: 'delete',
      icon: <Icon color="currentColor" name="PiTrash" size={iconSize} />,
      isDanger: true,
      onClick: onDeleteRow,
    })] : [],
  ], [actions, columns, iconSize, onDeleteRow, onEditRow])

  const tablePagination = useMemo(() => pagination !== false && ({
    ...Table.pagination,
    ...pagination,
  }), [pagination])

  return (
    <Skeleton
      active
      loading={isLoading}
    >
      <AntTable<RecordType>
        bordered={isBordered}
        className={table}
        columns={tableColumns}
        dataSource={data}
        expandable={expandable}
        footer={footer}
        loading={false}
        locale={intlLocale}
        pagination={tablePagination}
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
  actions: [],
  isBordered: false,
  isLoading: false,
  layout: Auto,
  pagination: Table.pagination,
  scroll: Table.scroll,
  size: Middle,
}
