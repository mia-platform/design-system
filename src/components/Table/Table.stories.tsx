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

import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  TableRecord,
  WithExternalFiltersandSorters,
  alignedColumns,
  columns,
  data,
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
import { Size } from './Table.types'
import { Table } from '.'

const meta = {
  component: Table<TableRecord>,
  args: {
    ...Table.defaultProps,
    columns,
    data,
    rowKey,
    onChange: action('onChange'),
    onHeaderRow: action('onHeaderRow'),
    onRow: action('onRow'),
  },
} satisfies Meta<typeof Table<TableRecord>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: meta.args,
}

export const Small: Story = {
  args: { ...meta.args, size: Size.Small },
}

export const Large: Story = {
  args: { ...meta.args, size: Size.Large },
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
      onExpandRowsChange: action('onExpandRowsChange'),
    }),
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
  decorators: [WithExternalFiltersandSorters],
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
