/* eslint-disable max-nested-callbacks */
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

import { DropdownItem, DropdownProps, DropdownTrigger, OpenChangeInfoSource } from './props'
import { RenderResult, render, screen, userEvent, waitFor } from '../../test-utils'
import { Button } from '../Button'
import { Dropdown } from './Dropdown'

const items: DropdownItem[] = [
  { id: '1', label: 'Label 1' },
  { id: '2', label: 'Label 2', secondaryLabel: 'Additional Info 2' },
  { id: '3', label: 'Danger Label', secondaryLabel: 'Additional Info 2', danger: true },
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
      userEvent.click(button)
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
      userEvent.click(button)

      await screen.findByRole('menuitem', { name: 'Label 1' })

      expect(screen.getAllByRole('menuitem')).toHaveLength(3)

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
      userEvent.click(button)

      const item = await screen.findByRole('menuitem', { name: 'Label 1' })
      userEvent.click(item)

      await waitFor(() => expect(onClick).toHaveBeenCalled())
      expect(onClick).toHaveBeenCalledTimes(1)
      const [[invocation]] = onClick.mock.calls
      expect(invocation.id).toEqual('1')
      expect(invocation.selectedPath).toEqual(['1'])
      expect(invocation.item).toEqual(items[0])
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
        userEvent.click(button)

        const item = await screen.findByRole('menuitem', { name: 'Label 1' })
        userEvent.click(item)

        // eslint-disable-next-line max-nested-callbacks
        await waitFor(() => expect(onClick).toHaveBeenCalled())
        expect(onClick).toHaveBeenCalledTimes(1)
        const [[invocation]] = onClick.mock.calls
        expect(invocation.id).toEqual('1')
        expect(invocation.selectedPath).toEqual(['1'])
        expect(invocation.item).toEqual(items[0])

        onClick.mockClear()

        userEvent.click(button)
        const item2 = await screen.findByRole('menuitem', { name: /^Label 2/i })
        userEvent.hover(item2)

        const sub1 = await screen.findByRole('menuitem', { name: 'Label 2-1' }, { timeout: 10000 })
        expect(sub1).toBeInTheDocument()

        userEvent.click(sub1)
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
        userEvent.click(button)

        await screen.findByRole('menuitem', { name: 'Label 1' })
        userEvent.hover(screen.getByRole('menuitem', { name: /^Label 2/i }))
        await screen.findByRole('menuitem', { name: 'Label 2-1' }, { timeout: 10000 })
        userEvent.hover(screen.getByRole('menuitem', { name: 'Label 2-2 right' }))

        const sub1 = await screen.findByRole('menuitem', { name: 'Label 2-2-1' }, { timeout: 10000 })
        expect(sub1).toBeInTheDocument()

        userEvent.click(sub1)
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
      userEvent.click(button)

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
      userEvent.click(button)

      await screen.findByRole('menuitem', { name: 'Label 1' })
      userEvent.click(screen.getByRole('menuitem', { name: 'Label 1' }))

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
        userEvent.click(button)
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
        userEvent.click(button)
        const first = await screen.findByRole('menuitem', { name: 'Label 1' })
        expect(first).toMatchSnapshot('at first render Label 1 is selected')

        const second = screen.getByRole('menuitem', { name: /Label 2/ })
        userEvent.click(second)

        await waitFor(() => expect(onClick).toHaveBeenCalled())

        userEvent.click(button)
        const firstUpdated = await screen.findByRole('menuitem', { name: 'Label 1' })
        const secondUpdated = screen.getByRole('menuitem', { name: /Label 2/ })
        expect(firstUpdated).toMatchSnapshot('after click render Label 1 is not selected')
        expect(secondUpdated).toMatchSnapshot('after click render Label 2 is selected')
      })
    })
  })
})

function renderDropdown(
  { props }: { props: DropdownProps } = { props: defaultProps }
): RenderResult {
  return render(<Dropdown {...props} />)
}
