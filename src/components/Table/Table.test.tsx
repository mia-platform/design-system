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

import { columns, data, expandable, footer, rowKey, rowSelection } from './Table.mocks'
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

  test('renders footer correctly', async() => {
    const { asFragment } = render(<Table {...props} footer={footer} />)

    expect(screen.getByText('Total rows number: 4')).toBeVisible()

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
})
