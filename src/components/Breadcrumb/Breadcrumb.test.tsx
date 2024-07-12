/**
 * Copyright 2024 Mia srl
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

import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '../../test-utils'
import { Breadcrumb } from '.'
import { BreadcrumbProps } from './Breadcrumb.props'
import { breadcrumbIcon } from './Breadcrumb.mocks'

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders a breadcrumb with empty items', () => {
    const { asFragment } = render(<Breadcrumb items={[]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a breadcrumb with different button types', () => {
    const props: BreadcrumbProps = {
      items: [
        { },
        { label: 'Text' },
        { label: 'Very long text that should be ellipsed at some point' },
        { icon: breadcrumbIcon },
        { label: 'Text', icon: breadcrumbIcon },
        { menu: { items: [] } },
        { label: 'Text', menu: { items: [] } },
        { icon: breadcrumbIcon, label: 'Text', menu: { items: [] } },
        { onClick: jest.fn, icon: breadcrumbIcon, label: 'Text', menu: { items: [] } },
      ],
    }

    const { asFragment } = render(<Breadcrumb {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a breadcrumb in loading state', () => {
    const props: BreadcrumbProps = {
      isLoading: true,
      items: [
        { label: 'Text' },
        { label: 'Text' },
        { label: 'Text' },
      ],
    }

    const { asFragment } = render(<Breadcrumb {...props} />)

    expect(asFragment()).toMatchSnapshot()

    // Fire a resize to trigger hidden items computation
    fireEvent(window, new Event('resize'))
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders item menu correctly', async() => {
    const buttonClickMock = jest.fn()
    const menuItemClickMock = jest.fn()
    const onDropdownVisibleChangeMock = jest.fn()

    const props: BreadcrumbProps = {
      items: [
        {
          key: 'root',
          onClick: buttonClickMock,
          label: 'Text',
          icon: breadcrumbIcon,
          menu: {
            onClick: menuItemClickMock,
            onDropdownVisibleChange: onDropdownVisibleChangeMock,
            search: true,
            items: [
              { key: 'item-1', label: 'Item 1' },
              { key: 'item-2', label: 'Item 2', icon: breadcrumbIcon },
            ],
          },
        },
        {
          menu: {
            activeKey: 'sub-item',
            items: [{ key: 'sub-item', label: 'Sub item', icon: breadcrumbIcon }],
          },
        },
      ],
      getPopupContainer: (containerNode) => containerNode,
    }

    const { asFragment } = render(<Breadcrumb {...props} />)
    expect(asFragment()).toMatchSnapshot()

    const [button] = screen.getAllByText('Text')
    fireEvent.click(button)
    expect(buttonClickMock).toHaveBeenCalledTimes(1)

    const [dropdownTrigger1, dropdownTrigger2] = screen.getAllByLabelText('caret-full-down')

    fireEvent.click(dropdownTrigger1)
    expect(buttonClickMock).toHaveBeenCalledTimes(1)
    expect(onDropdownVisibleChangeMock).toHaveBeenCalledTimes(1)
    expect(onDropdownVisibleChangeMock).toHaveBeenCalledWith(true)

    expect(asFragment()).toMatchSnapshot()

    fireEvent.click(screen.getByText('Item 1'))
    expect(menuItemClickMock).toHaveBeenCalledTimes(1)
    expect(menuItemClickMock).toHaveBeenCalledWith('item-1', expect.any(Object))

    fireEvent.click(dropdownTrigger1)
    fireEvent.click(screen.getByText('Item 2'))
    expect(menuItemClickMock).toHaveBeenNthCalledWith(2, 'item-2', expect.any(Object))

    fireEvent.click(dropdownTrigger1)
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'foo' } })
    await waitFor(() => expect(screen.getByText('No items')).toBeInTheDocument())

    fireEvent.click(dropdownTrigger1)
    expect(screen.queryByText('No items')).not.toBeInTheDocument()

    fireEvent.click(dropdownTrigger1)
    expect(screen.queryByText('No items')).not.toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: '1' } })
    await waitFor(() => expect(screen.getByText('Item 1')).toBeInTheDocument())
    await waitForElementToBeRemoved(() => screen.queryByText('Item 2'))

    fireEvent.click(dropdownTrigger2)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders controlled item menu correctly', () => {
    const onSearchMock = jest.fn()
    const menuItemClickMock = jest.fn()
    const onDropdownVisibleChangeMock = jest.fn()

    const props: BreadcrumbProps = {
      items: [
        {
          key: 'root',
          label: 'Text',
          icon: breadcrumbIcon,
          menu: {
            isOpen: true,
            onClick: menuItemClickMock,
            onDropdownVisibleChange: onDropdownVisibleChangeMock,
            search: {
              onChange: onSearchMock,
            },
            items: [
              { key: 'item-1', label: 'Item 1' },
              { key: 'item-2', label: 'Item 2', icon: breadcrumbIcon },
            ],
          },
        },
      ],
    }

    const { asFragment } = render(<Breadcrumb {...props} />)
    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()

    const [button] = screen.getAllByText('Text')
    fireEvent.click(button)
    expect(onDropdownVisibleChangeMock).toHaveBeenNthCalledWith(1, false)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'foo' } })
    expect(onSearchMock).toHaveBeenNthCalledWith(1, expect.any(Object))
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  test('renders a breadcrumb with collapsed items', () => {
    const onClickMock = jest.fn()
    const onDropdownVisibleChangeMock = jest.fn()

    const props: BreadcrumbProps = {
      items: [
        { label: 'Text 1' },
        { label: 'Text 2' },
        { label: 'Text 3', onClick: jest.fn },
        { label: 'Text 4', icon: breadcrumbIcon },
        { label: 'Text 5', menu: { items: [{ label: 'Item 1' }] } },
        {
          menu: {
            activeKey: '1',
            items: [{ key: '1', label: 'Item 1', icon: breadcrumbIcon }],
          },
        },
        { label: 'Text 7', onClick: onClickMock },
        {
          label: 'Text 8',
          menu: {
            onDropdownVisibleChange: onDropdownVisibleChangeMock,
            items: [{ label: 'Item 2' }],
          },
        },
      ],
    }

    const { asFragment } = render(<Breadcrumb {...props} />)

    // Fire a resize to trigger hidden items computation
    fireEvent(window, new Event('resize'))

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getAllByText('Text 2')).toHaveLength(1)

    const collapseButton = screen.getByLabelText('PiDotsThree')
    fireEvent.click(collapseButton)

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getAllByText('Text 2')).toHaveLength(2)

    fireEvent.click(screen.getAllByText('Text 7')[1])
    expect(onClickMock).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getAllByText('Text 7')[0])
    expect(onClickMock).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getAllByText('Text 8')[0])
    expect(onDropdownVisibleChangeMock).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getAllByText('Text 8')[1])
    expect(onDropdownVisibleChangeMock).toHaveBeenCalledTimes(1)
  })

  test('should get breadcrumb by test id', () => {
    render(<Breadcrumb dataTestId="breadcrumb-test" items={[]} />)
    expect(screen.getByTestId('breadcrumb-test')).toBeTruthy()
  })
})
