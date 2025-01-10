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

import { Action, RowState } from './Table.types'
import { TableRecordState, WithExternalFiltersAndSorters, alignedColumns, columns, columnsState, customActions, data, dataState, expandable, filteredAndSortedColumns, footer, hugeData, pagination, rowKey, rowSelection, sizedColumns, spannedColumns } from './Table.mocks'
import { fireEvent, render, screen, waitFor, within } from '../../test-utils'
import { Table } from '.'

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

    await waitFor(() => expect(asFragment()).toMatchSnapshot())

    expect(screen.getByRole('table')).toBeVisible()

    expect(screen.getByText('Field 1')).toBeInTheDocument()
    expect(screen.getByText('Field 2')).toBeInTheDocument()
    expect(screen.getByText('Field 3')).toBeInTheDocument()
    expect(screen.getByText('Field 4')).toBeInTheDocument()

    expect(screen.getByRole('row', { name: 'Value 1 Value 1 Value 1 Value 1' })).toBeVisible()
    expect(screen.getByRole('row', { name: 'Value 2 Value 2 Value 2 Value 2' })).toBeVisible()
    expect(screen.getByRole('row', { name: 'Value 3 Value 3 Value 3 Value 3' })).toBeVisible()
    expect(screen.getByRole('row', { name: 'Value 4 Value 4 Value 4 Value 4' })).toBeVisible()

    expect(screen.getAllByRole('cell', { name: 'Value 1' })).toHaveLength(columns.length)
    expect(screen.getAllByRole('cell', { name: 'Value 2' })).toHaveLength(columns.length)
    expect(screen.getAllByRole('cell', { name: 'Value 3' })).toHaveLength(columns.length)
    expect(screen.getAllByRole('cell', { name: 'Value 4' })).toHaveLength(columns.length)
  })

  test('renders small table correctly', async() => {
    const { asFragment } = render(<Table {...props} size={Table.Size.Small} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders large table correctly', async() => {
    const { asFragment } = render(<Table {...props} size={Table.Size.Large} />)
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

    await waitFor(() => expect(asFragment()).toMatchSnapshot())

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
  })

  test('renders expandable rows correctly', async() => {
    const onExpand = jest.fn()
    const onExpandedRowsChange = jest.fn()

    const { asFragment } = render(<Table {...props} expandable={expandable({ onExpand, onExpandedRowsChange })} />)

    await waitFor(() => expect(asFragment()).toMatchSnapshot())

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
  })

  test('renders actions correctly', async() => {
    const onEditRow = jest.fn()
    const onDeleteRow = jest.fn()
    const onDetail = jest.fn()
    const onOverview = jest.fn()

    const { asFragment } = render(
      <Table
        {...props}
        actions={customActions({ detail: onDetail, overview: onOverview })}
        onDeleteRow={onDeleteRow}
        onEditRow={onEditRow}
      />
    )

    await waitFor(() => expect(asFragment()).toMatchSnapshot())

    const editButtons = screen.getAllByRole('button', { name: 'Edit row' })
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete row' })
    const detailButtons = screen.getAllByRole('button', { name: 'PiArrowRight' })
    const overviewButtons = screen.getAllByRole('button', { name: 'PiCircleHalfTilt' })

    expect(editButtons).toHaveLength(props.data.length)
    expect(deleteButtons).toHaveLength(props.data.length)
    expect(detailButtons).toHaveLength(props.data.length)
    expect(overviewButtons).toHaveLength(props.data.length)

    const [editButton] = editButtons
    expect(editButton).toBeVisible()
    fireEvent.click(editButton)
    expect(onEditRow).toHaveBeenCalledTimes(1)
    expect(onEditRow).toHaveBeenCalledWith(props.data[0], 0, expect.any(Object))

    const [, deleteButton] = deleteButtons
    expect(deleteButton).toBeVisible()
    fireEvent.click(deleteButton)
    expect(onDeleteRow).toHaveBeenCalledTimes(1)
    expect(onDeleteRow).toHaveBeenCalledWith(props.data[1], 1, expect.any(Object))

    const [, , detailButton] = detailButtons
    expect(detailButton).toBeVisible()
    fireEvent.click(detailButton)
    expect(onDetail).toHaveBeenCalledTimes(1)
    expect(onDetail).toHaveBeenCalledWith(props.data[2], 2, expect.any(Object))

    const [, , , overviewButton] = overviewButtons
    expect(overviewButton).toBeVisible()
    fireEvent.click(overviewButton)
    expect(onOverview).toHaveBeenCalledTimes(1)
    expect(onOverview).toHaveBeenCalledWith(props.data[3], 3, expect.any(Object))
  })

  test('renders edit and delete action correctly when passing onClick in action', async() => {
    const onEditRow = jest.fn()
    const onDeleteRow = jest.fn()

    render(
      <Table
        {...props}
        actions={[{
          dataIndex: Action.Edit,
          onClick: onEditRow,
        }, {
          dataIndex: Action.Delete,
          onClick: onDeleteRow,
        }]}
      />
    )

    const editButtons = screen.getAllByRole('button', { name: 'Edit row' })
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete row' })

    expect(editButtons).toHaveLength(props.data.length)
    expect(deleteButtons).toHaveLength(props.data.length)

    const [editButton] = editButtons
    expect(editButton).toBeVisible()
    fireEvent.click(editButton)
    expect(onEditRow).toHaveBeenCalledTimes(1)
    expect(onEditRow).toHaveBeenCalledWith(props.data[0], 0, expect.any(Object))

    const [, deleteButton] = deleteButtons
    expect(deleteButton).toBeVisible()
    fireEvent.click(deleteButton)
    expect(onDeleteRow).toHaveBeenCalledTimes(1)
    expect(onDeleteRow).toHaveBeenCalledWith(props.data[1], 1, expect.any(Object))
  })

  test('renders pagination correctly', async() => {
    const onChange = jest.fn()
    const onShowSizeChange = jest.fn()

    const { asFragment } = render(
      <Table {...props} data={hugeData} pagination={pagination({ onChange, onShowSizeChange })} />
    )

    await waitFor(() => expect(asFragment()).toMatchSnapshot())

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
  })

  test('renders footer correctly', async() => {
    const { asFragment } = render(<Table {...props} footer={footer} />)

    await waitFor(() => expect(asFragment()).toMatchSnapshot())

    expect(screen.getByText('Total rows number: 4')).toBeVisible()
  })

  test('renders columns filters and sorters correctly', async() => {
    const { asFragment } = render(<Table {...props} columns={filteredAndSortedColumns} />)

    await waitFor(() => expect(asFragment()).toMatchSnapshot())

    const sorters = screen.getAllByLabelText('caret-up')
    const filters = screen.getAllByLabelText('filter')

    expect(sorters).toHaveLength(2)
    expect(filters).toHaveLength(3)

    const [menuFilter, treeFilter] = filters
    fireEvent.click(menuFilter)

    expect(screen.getByLabelText('search')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)

    expect(screen.getByRole('menuitem', { name: 'Value 1' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Value 2' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Submenu right' })).toBeInTheDocument()

    const menuResetButton = screen.getByRole('button', { name: 'Reset' })
    const menuOkButton = screen.getByRole('button', { name: 'OK' })

    expect(menuResetButton).toBeDisabled()
    expect(menuResetButton).toBeInTheDocument()
    expect(menuOkButton).toBeInTheDocument()

    fireEvent.click(screen.getByRole('menuitem', { name: 'Value 1' }))
    fireEvent.click(menuOkButton)

    expect(screen.queryByRole('row', { name: 'Value 2 Value 2 Value 2 Value 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('row', { name: 'Value 3 Value 3 Value 3 Value 3' })).not.toBeInTheDocument()
    expect(screen.queryByRole('row', { name: 'Value 4 Value 4 Value 4 Value 4' })).not.toBeInTheDocument()

    fireEvent.click(menuFilter)
    fireEvent.click(menuResetButton)
    fireEvent.click(menuOkButton)

    fireEvent.click(treeFilter)

    const tree = screen.getByRole('tree')

    expect(tree).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Select all items' })).toBeInTheDocument()

    expect(within(tree).getByText('Value 1')).toBeInTheDocument()
    expect(within(tree).getByText('Value 2')).toBeInTheDocument()
    expect(within(tree).getByText('Submenu')).toBeInTheDocument()
    expect(within(tree).getByText('Value 3')).toBeInTheDocument()
    expect(within(tree).getByText('Value 4')).toBeInTheDocument()

    const filterResetButton = screen.getByRole('button', { name: 'Reset' })
    const filterOkButton = screen.getByRole('button', { name: 'OK' })

    expect(filterResetButton).toBeInTheDocument()
    expect(filterOkButton).toBeInTheDocument()

    fireEvent.click(within(tree).getByText('Value 4'))
    fireEvent.click(filterOkButton)

    expect(screen.queryByRole('row', { name: 'Value 1 Value 1 Value 1 Value 1' })).not.toBeInTheDocument()
    expect(screen.queryByRole('row', { name: 'Value 2 Value 2 Value 2 Value 2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('row', { name: 'Value 3 Value 3 Value 3 Value 3' })).not.toBeInTheDocument()

    const [sorter] = sorters
    fireEvent.click(sorter)

    expect(screen.getAllByLabelText('caret-down')[0]).toHaveClass('active')
  })

  test('renders external filters and sorters correctly', async() => {
    const { asFragment } = render(<WithExternalFiltersAndSorters {...props} />)

    await waitFor(() => expect(asFragment()).toMatchSnapshot())

    const filterValue2 = screen.getByRole('button', { name: 'Filter Value 2' })
    const sortField2Descending = screen.getByRole('button', { name: 'Sort Field 2 Descending' })
    const clearFilters = screen.getByRole('button', { name: 'Clear filters' })
    const clearSort = screen.getByRole('button', { name: 'Clear sort' })

    expect(sortField2Descending).toBeVisible()
    expect(filterValue2).toBeVisible()
    expect(clearFilters).toBeVisible()
    expect(clearSort).toBeVisible()

    fireEvent.click(filterValue2)

    expect(screen.queryByRole('row', { name: 'Value 1 Value 1 Value 1 Value 1' })).not.toBeInTheDocument()
    expect(screen.queryByRole('row', { name: 'Value 3 Value 3 Value 3 Value 3' })).not.toBeInTheDocument()
    expect(screen.queryByRole('row', { name: 'Value 4 Value 4 Value 4 Value 4' })).not.toBeInTheDocument()

    fireEvent.click(clearFilters)

    expect(screen.getByRole('row', { name: 'Value 1 Value 1 Value 1 Value 1' })).toBeVisible()
    expect(screen.getByRole('row', { name: 'Value 3 Value 3 Value 3 Value 3' })).toBeVisible()
    expect(screen.getByRole('row', { name: 'Value 4 Value 4 Value 4 Value 4' })).toBeVisible()

    fireEvent.click(sortField2Descending)

    expect(screen.getAllByLabelText('caret-down')[1]).toHaveClass('active')

    fireEvent.click(clearSort)

    expect(screen.getAllByLabelText('caret-up')[1]).not.toHaveClass('active')
    expect(screen.getAllByLabelText('caret-down')[1]).not.toHaveClass('active')
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

  test('renders rows with state correctly', async() => {
    const { asFragment } = render(
      <Table
        {...props}
        columns={columnsState}
        data={dataState}
        rowState={(record: TableRecordState) => (record.state?.toLowerCase() as RowState)}
      />
    )

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders fitParentHEight correctly', async() => {
    const { asFragment } = render(<Table hasParentHeight={true} {...props} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
})
