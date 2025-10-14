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

/* eslint-disable max-lines */

import { DropdownItem, DropdownProps, DropdownTrigger, OpenChangeInfoSource } from './props'
import { RenderResult, act, fireEvent, render, screen, userEvent, waitFor } from '../../test-utils'
import { Button } from '../Button'
import { Dropdown } from './Dropdown'

const items: DropdownItem[] = [
  { id: '1', label: 'Label 1' },
  { id: '2', label: 'Label 2', secondaryLabel: 'Additional Info 2' },
  { id: '3', label: 'Danger Label', secondaryLabel: 'Additional Info 2', danger: true },
  { id: '4', label: 'Disabled Label', disabled: true },
]
const defaultProps: DropdownProps = {
  items,
  children: <Button>{'test-trigger-button'}</Button>,
  onClick: jest.fn(),
}

describe('Dropdown Component', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('triggers', () => {
    it('opens dropdown on click', async() => {
      renderDropdown()
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)
      await screen.findByRole('menuitem', { name: 'Label 1' })
    })

    it('opens dropdown on hover', async() => {
      renderDropdown({ props: { ...defaultProps, triggers: [DropdownTrigger.Hover] } })
      const button = screen.getByText('test-trigger-button')
      userEvent.hover(button)
      await screen.findByRole('menuitem', { name: 'Label 1' })
    })
  })

  describe('label layouts', () => {
    it('render labels', async() => {
      renderDropdown({ props: { ...defaultProps, items } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      await screen.findByRole('menuitem', { name: 'Label 1' })

      expect(screen.getAllByRole('menuitem')).toHaveLength(4)

      const [first, second, third] = screen.getAllByRole('menuitem')
      expect(first).toMatchSnapshot()
      expect(second).toMatchSnapshot()
      expect(third).toMatchSnapshot()
    })
  })

  describe('onClick', () => {
    it('invokes onClick with correct id', async() => {
      const onClick = jest.fn()
      const props = {
        ...defaultProps,
        onClick,
      }
      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const item = await screen.findByRole('menuitem', { name: 'Label 1' })
      await userEvent.click(item)

      await waitFor(() => expect(onClick).toHaveBeenCalled())
      expect(onClick).toHaveBeenCalledTimes(1)
      const [[invocation]] = onClick.mock.calls
      expect(invocation.id).toEqual('1')
      expect(invocation.selectedPath).toEqual(['1'])
      expect(invocation.item).toEqual(items[0])
    })

    it('does not invoke onClick if item is disabled', async() => {
      const onClick = jest.fn()
      const props = {
        ...defaultProps,
        onClick,
      }
      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const item = await screen.findByRole('menuitem', { name: 'Disabled Label' })
      expect(item).toHaveAttribute('aria-disabled', 'true')
      await userEvent.click(item)

      await waitFor(() => expect(onClick).not.toHaveBeenCalled())
    })

    describe('nesting', () => {
      it('invokes onClick with correct first-level nested id', async() => {
        const onClick = jest.fn()
        const caseItems = [
          { id: '1', label: 'Label 1' },
          {
            id: '2',
            label: 'Label 2',
            children: [{
              id: '2-1',
              label: 'Label 2-1',
            }, {
              id: '2-2',
              label: 'Label 2-2',
              children: [{
                id: '2-2-1',
                label: 'Label 2-2-1',
              }],
            }],
          },
        ]
        const props = {
          ...defaultProps,
          items: caseItems,
          onClick,
        }
        renderDropdown({ props })
        const button = screen.getByText('test-trigger-button')
        await userEvent.click(button)

        const item = await screen.findByRole('menuitem', { name: 'Label 1' })
        await userEvent.click(item)

        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())
        expect(onClick).toHaveBeenCalledTimes(1)
        const [[invocation]] = onClick.mock.calls
        expect(invocation.id).toEqual('1')
        expect(invocation.selectedPath).toEqual(['1'])
        expect(invocation.item).toEqual(items[0])

        onClick.mockClear()

        await userEvent.click(button)
        const item2 = await screen.findByRole('menuitem', { name: /^Label 2/i })
        userEvent.hover(item2)

        const sub1 = await screen.findByRole('menuitem', { name: 'Label 2-1' }, { timeout: 10000 })
        expect(sub1).toBeInTheDocument()

        await userEvent.click(sub1)
        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())
        expect(onClick).toHaveBeenCalledTimes(1)
        const [[invocation2]] = onClick.mock.calls
        expect(invocation2.id).toEqual('2-1')
        expect(invocation2.selectedPath).toEqual(['2', '2-1'])
        expect(invocation2.item).toEqual(caseItems[1].children![0])
      })

      it('invokes onClick with correct second-level nested id', async() => {
        const onClick = jest.fn()
        const caseItems = [
          { id: '1', label: 'Label 1' },
          {
            id: '2',
            label: 'Label 2',
            children: [{
              id: '2-1',
              label: 'Label 2-1',
            }, {
              id: '2-2',
              label: 'Label 2-2',
              children: [{
                id: '2-2-1',
                label: 'Label 2-2-1',
              }],
            }],
          },
        ]
        const props = {
          ...defaultProps,
          items: caseItems,
          onClick,
        }
        renderDropdown({ props })
        const button = screen.getByText('test-trigger-button')
        await userEvent.click(button)

        await screen.findByRole('menuitem', { name: 'Label 1' })
        userEvent.hover(screen.getByRole('menuitem', { name: /^Label 2/i }))
        await screen.findByRole('menuitem', { name: 'Label 2-1' }, { timeout: 10000 })
        userEvent.hover(screen.getByRole('menuitem', { name: 'Label 2-2 right' }))

        const sub1 = await screen.findByRole('menuitem', { name: 'Label 2-2-1' }, { timeout: 10000 })
        expect(sub1).toBeInTheDocument()

        await userEvent.click(sub1)
        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())
        expect(onClick).toHaveBeenCalledTimes(1)
        const [[invocation]] = onClick.mock.calls
        expect(invocation.id).toEqual('2-2-1')
        expect(invocation.selectedPath).toEqual(['2', '2-2', '2-2-1'])
        expect(invocation.item).toEqual(caseItems[1].children![1].children![0])
      }, 20000)
    })
  })

  describe('onOpenChange', () => {
    it('invokes onOpenChange with trigger source when opening', async() => {
      const onOpenChange = jest.fn()
      const props = {
        ...defaultProps,
        onOpenChange,
      }

      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
      expect(onOpenChange).toHaveBeenCalledWith(true, { source: OpenChangeInfoSource.Trigger })
    })

    it('invokes onOpenChange with menu source when closing clicking on a menu item', async() => {
      const onOpenChange = jest.fn()
      const props = {
        ...defaultProps,
        onOpenChange,
      }

      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      await screen.findByRole('menuitem', { name: 'Label 1' })
      await userEvent.click(screen.getByRole('menuitem', { name: 'Label 1' }))

      await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(2))
      expect(onOpenChange).toHaveBeenNthCalledWith(2, false, { source: OpenChangeInfoSource.Menu })
    })
  })

  describe('highlights selectedItems', () => {
    describe('single mode', () => {
      it('renders proper highlight', async() => {
        const props: DropdownProps = {
          ...defaultProps,
          initialSelectedItems: ['1'],
        }

        renderDropdown({ props })
        const button = screen.getByText('test-trigger-button')
        await userEvent.click(button)
        const el = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(el).toMatchSnapshot()
      })

      it('updates highlight', async() => {
        const onClick = jest.fn()
        const props: DropdownProps = {
          ...defaultProps,
          onClick,
          initialSelectedItems: ['1'],
        }

        renderDropdown({ props })
        const button = screen.getByText('test-trigger-button')
        await userEvent.click(button)
        const first = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(first).toMatchSnapshot('at first render Label 1 is selected')

        const second = screen.getByRole('menuitem', { name: /Label 2/ })
        await userEvent.click(second)

        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())

        await userEvent.click(button)
        const firstUpdated = await screen.findByRole('menuitem', { name: 'Label 1' })
        const secondUpdated = screen.getByRole('menuitem', { name: /Label 2/ })
        expect(firstUpdated).toMatchSnapshot('after click render Label 1 is not selected')
        expect(secondUpdated).toMatchSnapshot('after click render Label 2 is selected')
      })

      it('does not highlight elements if persistSelection is set to false', async() => {
        const onClick = jest.fn()
        const props: DropdownProps = {
          ...defaultProps,
          onClick,
          persistSelection: false,
        }

        renderDropdown({ props })
        const button = screen.getByText('test-trigger-button')
        await userEvent.click(button)
        const el = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(el).toMatchSnapshot('at first render Label 1 is not selected')

        await userEvent.click(el)

        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())

        await userEvent.click(button)
        const firstUpdated = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(firstUpdated).toMatchSnapshot('after click render Label 1 is still not selected')
      })

      it('render and ignores "initialSelectedItems" prop if "persistSelection" is false', async() => {
        const onClick = jest.fn()
        const props: DropdownProps = {
          ...defaultProps,
          initialSelectedItems: ['1'],
          onClick,
          persistSelection: false,
        }

        renderDropdown({ props })
        const button = screen.getByText('test-trigger-button')
        await userEvent.click(button)
        const el = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(el).toMatchSnapshot('at first render Label 1 is not selected')
      })
    })

    describe('multiple mode', () => {
      it('renders proper highlight', async() => {
        const onClick = jest.fn()
        const props: DropdownProps = {
          ...defaultProps,
          onClick,
          initialSelectedItems: ['1'],
          multiple: true,
        }

        renderDropdown({ props })
        const button = screen.getByText('test-trigger-button')
        await userEvent.click(button)
        const el = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(el).toMatchSnapshot('first render with pre-selected label 1')

        // click second label => selected items: label 1 + label 2
        const second = screen.getByRole('menuitem', { name: /Label 2/ })
        await userEvent.click(second)
        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())

        await userEvent.click(button)
        const firstUpdated = await screen.findByRole('menuitem', { name: 'Label 1' })
        const secondUpdated = screen.getByRole('menuitem', { name: /Label 2/ })
        expect(firstUpdated).toMatchSnapshot('after click render Label 1 is selected')
        expect(secondUpdated).toMatchSnapshot('after click render Label 2 is selected')

        // click first label => selected items: label 2
        await userEvent.click(firstUpdated)

        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())

        await userEvent.click(button)
        const firstUpdatedDeSelected = await screen.findByRole('menuitem', { name: 'Label 1' })
        const secondUpdatedStillSelected = await screen.findByRole('menuitem', { name: /Label 2/ })
        expect(firstUpdatedDeSelected).toMatchSnapshot('after second click render Label 1 is deselected')
        expect(secondUpdatedStillSelected).toMatchSnapshot('after second click render Label 2 is selected')
      }, 10000)

      it('is ignored if "persistSelection" is set to false', async() => {
        const onClick = jest.fn()
        const props: DropdownProps = {
          ...defaultProps,
          multiple: true,
          onClick,
          persistSelection: false,
        }

        renderDropdown({ props })
        const button = screen.getByText('test-trigger-button')
        await userEvent.click(button)
        const el = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(el).toMatchSnapshot('at first render Label 1 is not selected')

        await userEvent.click(el)

        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())

        await userEvent.click(button)
        const firstUpdated = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(firstUpdated).toMatchSnapshot('after click render Label 1 is still not selected')
      })
    })
  })

  describe('with header', () => {
    it('renders top header', async() => {
      const props: DropdownProps = {
        ...defaultProps,
        header: {
          top: <div data-testid="header-top-id">{'some custom header top description'}</div>,
        },
      }
      renderDropdown({ props })

      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const header = await screen.findByTestId('header-top-id')
      expect(header).toBeInTheDocument()
    })

    it('renders bottom header', async() => {
      const props: DropdownProps = {
        ...defaultProps,
        header: {
          bottom: <div data-testid="header-bottom-id">{'some custom header bottom description'}</div>,
        },
      }
      renderDropdown({ props })

      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const header = await screen.findByTestId('header-bottom-id')
      expect(header).toBeInTheDocument()
    })

    it('renders top and bottom header and search input', async() => {
      const props: DropdownProps = {
        ...defaultProps,
        isSearchable: true,
        header: {
          top: <div data-testid="header-top-id">{'some custom header top description'}</div>,
          bottom: <div data-testid="header-bottom-id">{'some custom header bottom description'}</div>,
        },
      }
      renderDropdown({ props })

      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      expect(searchInput).toBeInTheDocument()
      const headerTop = await screen.findByTestId('header-top-id')
      expect(headerTop).toBeInTheDocument()
      const headerBottom = await screen.findByTestId('header-bottom-id')
      expect(headerBottom).toBeInTheDocument()
    })

    it('clears search when dropdown is closed and reopened', async() => {
      const customItems = [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
        { id: 'orange', label: 'Orange' },
      ]
      renderDropdown({ props: { ...defaultProps, items: customItems, isSearchable: true } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'app')

      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()

      // Close dropdown by clicking on the button again
      await userEvent.click(button)
      await waitFor(() => expect(screen.queryByRole('textbox')).not.toBeInTheDocument())

      // Reopen dropdown
      await userEvent.click(button)
      const newSearchInput = screen.getByRole('textbox')

      expect(newSearchInput).toHaveValue('')
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()
      expect(screen.getByText('Orange')).toBeInTheDocument()
    })

    it('clears search when dropdown is reopened after item is selected and', async() => {
      const onClick = jest.fn()
      const customItems = [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
        { id: 'orange', label: 'Orange' },
      ]
      renderDropdown({
        props: {
          ...defaultProps,
          items: customItems,
          isSearchable: true,
          onClick,
        },
      })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'app')

      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()

      const appleItem = screen.getByRole('menuitem', { name: 'Apple' })
      await userEvent.click(appleItem)
      await waitFor(() => expect(onClick).toHaveBeenCalled())

      // Dropdown should close after selection
      await waitFor(() => expect(screen.queryByRole('textbox')).not.toBeInTheDocument())

      // Reopen dropdown
      await userEvent.click(button)
      const newSearchInput = screen.getByRole('textbox')

      expect(newSearchInput).toHaveValue('')
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()
      expect(screen.getByText('Orange')).toBeInTheDocument()
    })
  })

  describe('with footer', () => {
    it('renders footer', async() => {
      const props: DropdownProps = {
        ...defaultProps,
        footer: {
          top: <div data-testid="footer-top-id">{'some custom footer top description'}</div>,
        },
      }
      renderDropdown({ props })

      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const footer = await screen.findByTestId('footer-top-id')
      expect(footer).toBeInTheDocument()
    })

    it('closes dropdown on footer action click', async() => {
      const props: DropdownProps = {
        ...defaultProps,
        footer: {
          actions: [
            { label: 'my-label', onClick: jest.fn() },
          ],
        },
      }
      renderDropdown({ props })

      const button = screen.getByText('test-trigger-button')
      await await userEvent.click(button)

      const footerActionButton = await screen.findByRole('button', { name: 'my-label' })
      expect(footerActionButton).toBeInTheDocument()

      expect(screen.getByRole('menu')).toBeInTheDocument()
      await await userEvent.click(footerActionButton)
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    })
  })

  describe('dropdown body states', () => {
    test('the error state is shown if hasError is true and onRetry is triggered correctly', async() => {
      const onRetry = jest.fn()
      const customItems = [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
      ]
      renderDropdown({ props: { ...defaultProps, items: customItems, hasError: true, onRetry } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      expect(screen.getByText('An error occurred')).toBeInTheDocument()
      const retryButton = screen.getByRole('button', { name: /retry/i })

      expect(retryButton).toBeInTheDocument()
      userEvent.click(retryButton)
      await waitFor(() => expect(onRetry).toHaveBeenCalledTimes(1))
    })

    test('the loading state is shown if isLoading', async() => {
      const customItems = [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
      ]
      renderDropdown({ props: { ...defaultProps, items: customItems, isLoading: true } })
      expect(screen.queryByText('Apple')).not.toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })

    test('the empty state state is shown if there are no items matching the research', async() => {
      const customItems:DropdownItem[] = []
      renderDropdown({ props: { ...defaultProps, items: customItems, isSearchable: true, onSearch: undefined } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      expect(screen.getByRole('img', { name: 'no data' })).toBeInTheDocument()
    })
  })

  describe('with search', () => {
    test('shows search input when isSearchable is true', async() => {
      renderDropdown({ props: { ...defaultProps, isSearchable: true } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      expect(searchInput).toBeInTheDocument()
    })

    test('uses the correct placeholder text for the search input', async() => {
      const customPlaceholder = 'Find an item...'
      renderDropdown({ props: { ...defaultProps, isSearchable: true, searchPlaceholder: customPlaceholder } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByPlaceholderText(customPlaceholder)
      expect(searchInput).toBeInTheDocument()
    })

    test('filters items correctly when no onSearch prop is provided', async() => {
      const customItems = [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
        { id: 'orange', label: 'Orange' },
        { id: 'cherry', label: 'Cherry' },
      ]
      renderDropdown({ props: { ...defaultProps, items: customItems, isSearchable: true, onSearch: undefined } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'A')

      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()
      expect(screen.queryByText('Cherry')).not.toBeInTheDocument()
      expect(screen.getByText('Orange')).toBeInTheDocument()

      await userEvent.type(searchInput, 'n')

      expect(screen.getByText('Banana')).toBeInTheDocument()
      expect(screen.queryByText('Apple')).not.toBeInTheDocument()
      expect(screen.queryByText('Cherry')).not.toBeInTheDocument()
      expect(screen.queryByText('Orange')).toBeInTheDocument()
    })

    test('does not perform filtering when onSearch prop is provided', async() => {
      const onSearch = jest.fn()
      const customItems = [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
        { id: 'orange', label: 'Orange' },
      ]
      renderDropdown({ props: { ...defaultProps, items: customItems, isSearchable: true, onSearch } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'non-existent')

      await waitFor(() => expect(onSearch).toHaveBeenCalledTimes(12))

      // All original items should still be visible because filtering is external
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()
      expect(screen.getByText('Orange')).toBeInTheDocument()
    })

    test('does not filter items with React node labels', async() => {
      const customItems = [
        { id: 'apple', label: <span>{'Apple'}</span> },
        { id: 'banana', label: <span>{'Banana'}</span> },
      ]
      renderDropdown({ props: { ...defaultProps, items: customItems, isSearchable: true, onSearch: undefined } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'a')

      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()
    })

    test('triggers onSearch on input change', async() => {
      const onSearch = jest.fn()
      renderDropdown({ props: { ...defaultProps, isSearchable: true, onSearch } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'a')
      await userEvent.type(searchInput, 'b')

      await waitFor(() => expect(onSearch).toHaveBeenCalledTimes(2))
      expect(onSearch).toHaveBeenLastCalledWith('ab')
    })

    test('resets search on clear button click', async() => {
      const customItems = [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
        { id: 'orange', label: 'Orange' },
        { id: 'cherry', label: 'Cherry' },
      ]
      renderDropdown({ props: { ...defaultProps, items: customItems, isSearchable: true, onSearch: undefined } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'A')

      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()
      expect(screen.queryByText('Cherry')).not.toBeInTheDocument()
      expect(screen.getByText('Orange')).toBeInTheDocument()

      await userEvent.click(screen.getByRole('img', { name: 'close-circle' }))
      expect(screen.getByText('Apple')).toBeInTheDocument()
      expect(screen.getByText('Banana')).toBeInTheDocument()
      expect(screen.getByText('Cherry')).toBeInTheDocument()
      expect(screen.getByText('Orange')).toBeInTheDocument()
    })

    test('triggers onSearch correctly on clear button click', async() => {
      const onSearch = jest.fn()
      renderDropdown({ props: { ...defaultProps, isSearchable: true, onSearch } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'a')

      await waitFor(() => expect(onSearch).toHaveBeenCalledTimes(1))
      expect(onSearch).toHaveBeenCalledWith('a')

      userEvent.click(screen.getByRole('img', { name: 'close-circle' }))
      await waitFor(() => expect(onSearch).toHaveBeenCalledTimes(2))
      expect(onSearch).toHaveBeenLastCalledWith('')
    })

    test('shows the empty state if there are no items matching the research', async() => {
      const customItems = [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
      ]
      renderDropdown({ props: { ...defaultProps, items: customItems, isSearchable: true, onSearch: undefined } })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const searchInput = screen.getByRole('textbox')
      await userEvent.type(searchInput, 'non-existent')

      expect(screen.queryByText('Apple')).not.toBeInTheDocument()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()
      screen.logTestingPlaygroundURL()

      expect(screen.getByRole('img', { name: 'no data' })).toBeInTheDocument()
    })
  })

  describe('infinite scrolling', () => {
    const infiniteScrollItems: DropdownItem[] = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i + 1}`,
      label: `Item ${i + 1}`,
    }))

    const defaultInfiniteScrollProps: DropdownProps = {
      ...defaultProps,
      items: infiniteScrollItems,
      isInfiniteScrollEnabled: true,
      menuItemsMaxHeight: 200,
    }

    afterEach(() => {
      delete (HTMLElement.prototype as unknown as { scrollTop?: number }).scrollTop
      delete (HTMLElement.prototype as unknown as { scrollHeight?: number }).scrollHeight
      delete (HTMLElement.prototype as unknown as { clientHeight?: number }).clientHeight
    })

    const mockScrollProperties = (
      element: HTMLElement,
      scrollTop: number,
      scrollHeight = 400,
      clientHeight = 200
    ): void => {
      Object.defineProperty(element, 'scrollTop', {
        value: scrollTop,
        configurable: true,
        writable: true,
      })
      Object.defineProperty(element, 'scrollHeight', {
        value: scrollHeight,
        configurable: true,
      })
      Object.defineProperty(element, 'clientHeight', {
        value: clientHeight,
        configurable: true,
      })
    }

    test('shows existing items when isLoadingMoreItems is true', async() => {
      const props = {
        ...defaultInfiniteScrollProps,
        isLoadingMoreItems: true,
      }

      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      // Verify existing items are visible during loading
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 5')).toBeInTheDocument()
      expect(screen.getByText('Item 10')).toBeInTheDocument()

      // Verify all menu items are accessible
      const menuItems = screen.getAllByRole('menuitem')
      expect(menuItems).toHaveLength(10)
    })

    test('calls onLoadMoreItems when scrolling near bottom', async() => {
      const onLoadMoreItems = jest.fn()
      const props = {
        ...defaultInfiniteScrollProps,
        onLoadMoreItems,
        scrollThreshold: 32,
      }

      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const scrollContainer = screen.getByRole('menu').parentElement!

      mockScrollProperties(scrollContainer, 360, 400, 200)

      act(() => {
        fireEvent.scroll(scrollContainer)
      })

      await waitFor(() => expect(onLoadMoreItems).toHaveBeenCalledTimes(1))
    })

    test('does not call onLoadMoreItems when scrolling up', async() => {
      const onLoadMoreItems = jest.fn()
      const props = {
        ...defaultInfiniteScrollProps,
        onLoadMoreItems,
      }

      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const scrollContainer = screen.getByRole('menu').parentElement!

      act(() => {
        mockScrollProperties(scrollContainer, 100)
        fireEvent.scroll(scrollContainer)
      })

      act(() => {
        mockScrollProperties(scrollContainer, 50)
        fireEvent.scroll(scrollContainer)
      })

      expect(onLoadMoreItems).not.toHaveBeenCalled()
    })

    test('does not call onLoadMoreItems multiple times for same scroll position', async() => {
      const onLoadMoreItems = jest.fn()
      const props = {
        ...defaultInfiniteScrollProps,
        onLoadMoreItems,
        scrollThreshold: 32,
      }

      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const scrollContainer = screen.getByRole('menu').parentElement!

      act(() => {
        mockScrollProperties(scrollContainer, 360)
        fireEvent.scroll(scrollContainer)
      })

      act(() => {
        mockScrollProperties(scrollContainer, 365)
        fireEvent.scroll(scrollContainer)
      })

      await waitFor(() => expect(onLoadMoreItems).toHaveBeenCalledTimes(1))
    })

    test('respects custom scroll threshold', async() => {
      const onLoadMoreItems = jest.fn()
      const customThreshold = 50
      const props = {
        ...defaultInfiniteScrollProps,
        onLoadMoreItems,
        scrollThreshold: customThreshold,
      }

      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const scrollContainer = screen.getByRole('menu').parentElement!

      act(() => {
        mockScrollProperties(scrollContainer, 350, 400, 200)
        fireEvent.scroll(scrollContainer)
      })

      await waitFor(() => expect(onLoadMoreItems).toHaveBeenCalledTimes(1))
    })

    test('does not trigger onLoadMoreItems when infinite scrolling is disabled', async() => {
      const onLoadMoreItems = jest.fn()
      const props = {
        ...defaultProps,
        items: infiniteScrollItems,
        isInfiniteScrollEnabled: false,
        onLoadMoreItems,
      }

      renderDropdown({ props })
      const button = screen.getByText('test-trigger-button')
      await userEvent.click(button)

      const scrollContainer = screen.getByRole('menu').parentElement!

      act(() => {
        mockScrollProperties(scrollContainer, 360)
        fireEvent.scroll(scrollContainer)
      })

      expect(onLoadMoreItems).not.toHaveBeenCalled()
    })
  })
})

function renderDropdown(
  { props }: { props: DropdownProps } = { props: defaultProps }
): RenderResult {
  return render(<Dropdown {...props} />)
}
