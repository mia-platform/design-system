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

import { DropdownItem, DropdownProps, DropdownTrigger } from './props'
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
  })
})

function renderDropdown(
  { props }: {props: DropdownProps} = { props: defaultProps }
): RenderResult {
  return render(<Dropdown {...props} />)
}
