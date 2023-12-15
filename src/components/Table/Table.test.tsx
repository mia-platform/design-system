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

import { alignedColumns, columns, data, expandable, filteredAndSortedColumns, footer, hugeData, pagination, rowKey, rowSelection, sizedColumns, spannedColumns } from './Table.mocks'
import { fireEvent, render, screen, waitFor } from '../../test-utils'
import { Size } from './Table.types'
import { Table } from '.'

const { Small, Large } = Size

describe('Table Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const props = {
    columns,
    data,
    rowKey,
    onchange: jest.fn(),
  }

  test('renders table correctly', async() => {
    const { asFragment } = render(<Table {...props} />)

    expect(screen.getByRole('table')).toBeVisible()

    expect(screen.getByRole('row', { name: 'Value 1 Value 1 Value 1 Value 1' })).toBeVisible()
    expect(screen.getByRole('row', { name: 'Value 2 Value 2 Value 2 Value 2' })).toBeVisible()
    expect(screen.getByRole('row', { name: 'Value 3 Value 3 Value 3 Value 3' })).toBeVisible()
    expect(screen.getByRole('row', { name: 'Value 4 Value 4 Value 4 Value 4' })).toBeVisible()

    expect(screen.getAllByRole('cell', { name: 'Value 1' })).toHaveLength(columns.length)
    expect(screen.getAllByRole('cell', { name: 'Value 2' })).toHaveLength(columns.length)
    expect(screen.getAllByRole('cell', { name: 'Value 3' })).toHaveLength(columns.length)
    expect(screen.getAllByRole('cell', { name: 'Value 4' })).toHaveLength(columns.length)

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders small table correctly', async() => {
    const { asFragment } = render(<Table {...props} size={Small} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders large table correctly', async() => {
    const { asFragment } = render(<Table {...props} size={Large} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders table correctly while loading', async() => {
    const { asFragment } = render(<Table {...props} isLoading={true} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders bordered table correctly', async() => {
    const { asFragment } = render(<Table {...props} isBordered={true} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders selectable rows correctly', async() => {
    const onChange = jest.fn()
    const onSelect = jest.fn()
    const onSelectAll = jest.fn()

    const { asFragment } = render(<Table {...props} rowSelection={rowSelection({ onChange, onSelect, onSelectAll })} />)

    const selectAll = screen.getByLabelText('Select all')
    const checkboxes = screen.getAllByRole('checkbox')

    expect(selectAll).toBeInTheDocument()
    expect(checkboxes).toHaveLength(data.length)

    const [, checkbox] = checkboxes
    expect(checkbox).toBeInTheDocument()

    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledTimes(1)

    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onSelect).toHaveBeenCalledTimes(2)

    fireEvent.click(selectAll)
    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onSelect).toHaveBeenCalledTimes(2)
    expect(onSelectAll).toHaveBeenCalledTimes(1)

    expect(onChange.mock.calls).toEqual([
      // selectedRowKeys, selectedRows, info
      [[data[0][rowKey], data[1][rowKey]], [data[0], data[1]], { type: 'single' }],
      [[data[0][rowKey]], [data[0]], { type: 'single' }],
      [data.map(datum => datum[rowKey]), data, { type: 'all' }],
    ])

    expect(onSelect.mock.calls).toEqual([
      // record, selected, selectedRows, nativeEvent
      [data[1], true, [data[0], data[1]], expect.objectContaining({ ...MouseEvent })],
      [data[1], false, [data[0]], expect.objectContaining({ ...MouseEvent })],
    ])

    expect(onSelectAll).toHaveBeenCalledWith(
      // selected, selectedRows, changedRows
      true, data, [data[1], data[2], data[3]])

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders expandable rows correctly', async() => {
    const onExpand = jest.fn()
    const onExpandedRowsChange = jest.fn()

    const { asFragment } = render(<Table {...props} expandable={expandable({ onExpand, onExpandedRowsChange })} />)

    expect(screen.getByRole('row', { name: 'Expandable row' })).toBeVisible()

    const expandButtons = screen.getAllByRole('button', { name: 'Expand row' })
    const collapseButton = screen.getByRole('button', { name: 'Collapse row' })

    expect(expandButtons).toHaveLength(2)
    expect(collapseButton).toBeVisible()

    const [expandButton] = expandButtons

    fireEvent.click(expandButton)
    expect(onExpand).toHaveBeenCalledTimes(1)
    expect(onExpandedRowsChange).toHaveBeenCalledTimes(1)

    fireEvent.click(collapseButton)
    expect(onExpand).toHaveBeenCalledTimes(2)
    expect(onExpandedRowsChange).toHaveBeenCalledTimes(2)

    expect(onExpand.mock.calls).toEqual([
      // expanded, record
      [true, data[1]],
      [false, data[0]],
    ])

    expect(onExpandedRowsChange.mock.calls).toEqual([
      // expandedKeys
      [[data[0][rowKey], data[1][rowKey]]],
      [[data[1][rowKey]]],
    ])

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders pagination correctly', async() => {
    const onChange = jest.fn()
    const onShowSizeChange = jest.fn()

    const { asFragment } = render(
      <Table {...props} data={hugeData} pagination={pagination({ onChange, onShowSizeChange })} />
    )

    expect(screen.getByRole('listitem', { name: 'Previous Page' })).toBeVisible()
    expect(screen.getByRole('listitem', { name: '1' })).toBeVisible()
    expect(screen.getByRole('listitem', { name: '2' })).toBeVisible()
    expect(screen.getByRole('listitem', { name: '3' })).toBeVisible()
    expect(screen.getByRole('listitem', { name: 'Next 5 Pages' })).toBeVisible()

    const nextPage = screen.getByRole('listitem', { name: 'Next Page' })
    expect(nextPage).toBeVisible()

    fireEvent.click(nextPage)
    expect(onChange).toHaveBeenCalledTimes(1)

    const page = screen.getByRole('listitem', { name: '13' })
    expect(page).toBeVisible()

    fireEvent.click(page)
    expect(onChange).toHaveBeenCalledTimes(2)

    expect(onChange.mock.calls).toEqual([
      // currentPage, pageSize
      [2, 4],
      [13, 4],
    ])

    const pageSizer = screen.getByRole('combobox', { name: 'Page Size' })
    expect(pageSizer).toBeVisible()

    expect(screen.getByText('4 / page')).toBeVisible()

    fireEvent.change(pageSizer, { target: { value: '10' } })
    fireEvent.click(screen.getByRole('option', { name: '10 / page' }))

    expect(onShowSizeChange).toHaveBeenCalledTimes(1)
    expect(onShowSizeChange).toHaveBeenCalledWith(5, 10)

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders footer correctly', async() => {
    const { asFragment } = render(<Table {...props} footer={footer} />)

    expect(screen.getByText('Total rows number: 4')).toBeVisible()

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders columns filters and sorting correctly', async() => {
    const { asFragment } = render(<Table {...props} columns={filteredAndSortedColumns} />)

    const sorters = screen.getAllByLabelText('caret-up')
    const filters = screen.getAllByLabelText('filter')

    expect(sorters).toHaveLength(2)
    expect(filters).toHaveLength(3)

    const [filter] = filters
    fireEvent.click(filter)

    expect(screen.getByLabelText('search')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)

    expect(screen.getByRole('menuitem', { name: 'Value 1' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Value 2' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Submenu right' })).toBeInTheDocument()

    const resetButton = screen.getByRole('button', { name: 'Reset' })
    const okButton = screen.getByRole('button', { name: 'OK' })

    expect(resetButton).toBeDisabled()
    expect(resetButton).toBeInTheDocument()
    expect(okButton).toBeInTheDocument()

    fireEvent.click(screen.getByRole('menuitem', { name: 'Value 1' }))
    fireEvent.click(okButton)

    expect(screen.queryByRole('row', { name: 'Value 2 Value 2 Value 2 Value 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('row', { name: 'Value 3 Value 3 Value 3 Value 3' })).not.toBeInTheDocument()
    expect(screen.queryByRole('row', { name: 'Value 4 Value 4 Value 4 Value 4' })).not.toBeInTheDocument()

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders aligned columns correctly', async() => {
    const { asFragment } = render(<Table {...props} columns={alignedColumns} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders columns with certain width correctly', async() => {
    const { asFragment } = render(<Table {...props} columns={sizedColumns} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders spanned columns correctly', async() => {
    const { asFragment } = render(<Table {...props} columns={spannedColumns} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
})
