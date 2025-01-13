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

/* eslint-disable  react/no-multi-comp */
import type { Meta, StoryObj } from '@storybook/react'
import { ReactElement } from 'react'
import { action } from '@storybook/addon-actions'

import { Action, RowState as RowStateEnum } from './Table.types'
import {
  TableRecord,
  TableRecordState,
  WithExternalFiltersAndSorters,
  alignedColumns,
  columns,
  columnsState,
  customActions,
  data,
  dataState,
  expandable,
  filteredAndSortedColumns,
  footer,
  hugeData,
  pagination,
  rowKey,
  rowSelection,
  scroll,
  scrollableColumns,
  sizedColumns,
  spannedColumns,
} from './Table.mocks'
import { Table } from '.'
import { defaults } from './Table'

const meta = {
  component: Table<TableRecord>,
  args: {
    ...defaults,
    columns,
    data,
    rowKey,
    onChange: action('onChange'),
  },
} satisfies Meta<typeof Table<TableRecord>>

export default meta
type Story = StoryObj<typeof meta>
type StoryFn = () => ReactElement

export const Default: Story = {
  args: meta.args,
}

export const Small: Story = {
  args: { ...meta.args, size: Table.Size.Small },
}

export const Large: Story = {
  args: { ...meta.args, size: Table.Size.Large },
}

export const Loading: Story = {
  args: { ...meta.args, isLoading: true },
}

export const Bordered: Story = {
  args: { ...meta.args, isBordered: true },
}

export const Selection: Story = {
  args: { ...meta.args,
    rowSelection: rowSelection({
      onChange: action('onChange'),
      onSelect: action('onSelect'),
      onSelectMultiple: action('onSelectMuliptle'),
      onSelectAll: action('onSelectAll'),
      onSelectNone: action('onSelectNone'),
    }),
  },
}

export const Expandable: Story = {
  args: { ...meta.args,
    expandable: expandable({
      onExpand: action('onExpand'),
      onExpandedRowsChange: action('onExpandedRowsChange'),
    }),
  },
}

export const SimpleActionsUsage: Story = {
  args: { ...meta.args,
    actions: [
      { dataIndex: Action.Edit, onClick: action('edit') },
      { dataIndex: Action.Delete, onClick: action('delete') },
    ],
  },
}

export const Actions: Story = {
  args: { ...meta.args,
    actions: customActions({
      detail: action('detail'),
      overview: action('overview'),
    }),
    onEditRow: action('edit'),
    onDeleteRow: action('delete'),
  },
}

export const Pagination: Story = {
  args: { ...meta.args,
    data: hugeData,
    pagination: pagination({
      onChange: action('onPageChange'),
      onShowSizeChange: action('onShowSizeChange'),
    }),
  },
}

export const Footer: Story = {
  args: { ...meta.args, footer },
}

export const Scroll: Story = {
  args: { ...meta.args, data: hugeData, columns: scrollableColumns, scroll },
}

export const ExternalFiltersAndSorting: Story = {
  args: { ...meta.args },
  decorators: [(_, { args }) => <WithExternalFiltersAndSorters {...args} />],
}

export const ColumnFiltersAndSorting: Story = {
  args: { ...meta.args, columns: filteredAndSortedColumns },
}

export const ColumnAlignment: Story = {
  args: { ...meta.args, columns: alignedColumns },
}

export const ColumnWidth: Story = {
  args: { ...meta.args, columns: sizedColumns },
}

export const ColumnSpan: Story = {
  args: { ...meta.args, columns: spannedColumns, isBordered: true },
}

export const RowState: Story = {
  args: {
    ...meta.args,
    columns: columnsState,
    data: dataState,
    rowState: (record: TableRecordState) => (record.state?.toLowerCase() as RowStateEnum),
  },
}

export const FitParentHeight = () => {
  return (
    <div style={{ height: 'calc(100vh - 2em - 40px)' }}>
      <Table
        {...meta.args}
        data={[...Array(30).keys()].reduce((acc) => [...acc, ...data], data)}
        hasParentHeight={true}
        pagination={false}
        scroll={{ x: true, y: '100%' }}
      />
    </div>
  )
}

export const FitParentHeightEmpty: StoryFn = () => {
  return (
    <div style={{ height: 'calc(100vh - 2em - 40px)' }}>
      <Table
        {...meta.args}
        data={[]}
        hasParentHeight={true}
        pagination={false}
        scroll={{ x: true, y: '100%' }}
      />
    </div>
  )
}

export const FitParentHeightHalfEmpty = () : ReactElement => {
  return (
    <div style={{ height: 'calc(100vh - 2em - 40px)' }}>
      <Table
        {...meta.args}
        hasParentHeight={true}
        pagination={false}
        scroll={{ x: true, y: '100%' }}
      />
    </div>
  )
}
