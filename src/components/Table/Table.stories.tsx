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

import { Record, alignedColumns, columns, data, filteredAndSortedColumns, footer, pagination, sizedColumns } from './Table.mocks'
import { Table } from '.'

const meta = {
  component: Table<Record>,
  args: {
    ...Table.defaultProps,
    columns,
    data,
    onChange: action('onChange'),
    onHeaderRow: action('onHeaderRow'),
    onRow: action('onRow'),
  },
} satisfies Meta<typeof Table<Record>>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: meta.args,
}

export const Empty: Story = {
  args: { ...meta.args, data: [] },
}

export const Bordered: Story = {
  args: { ...meta.args, isBordered: true },
}

export const Loading: Story = {
  args: { ...meta.args, isLoading: true },
}

export const Pagination: Story = {
  args: { ...meta.args, pagination: pagination({ onChange: action('onPageChange') }) },
}

export const Footer: Story = {
  args: { ...meta.args, footer },
}

export const ColumnFiltersAndSorting: Story = {
  args: { ...meta.args, columns: filteredAndSortedColumns },
}

export const ColumnAlignment: Story = {
  args: { ...meta.args, columns: alignedColumns },
}

// export const ColumnSpan: Story = {
//   args: { ...meta.args, columns: spannedColumns },
// }

export const ColumnWidth: Story = {
  args: { ...meta.args, columns: sizedColumns },
}
