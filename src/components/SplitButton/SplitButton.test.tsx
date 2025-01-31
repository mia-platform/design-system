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

import { RenderResult, render as renderComponent, screen, userEvent } from '../../test-utils'
import { Button } from '../Button'
import { SplitButton } from './SplitButton'
import { SplitButtonItem } from './types'
import { SplitButtonProps } from './props'

const items: SplitButtonItem[] = [
  { id: '1', label: 'Label 1' },
  { id: '2', label: 'Label 2' },
]
const defaultProps: SplitButtonProps = {
  items,
  children: <span>{'test-trigger-button'}</span>,
  onClick: jest.fn(),
  onItemClick: jest.fn(),
}

describe('SplitButton Component', () => {
  beforeEach(jest.clearAllMocks)

  describe('ui variants', () => {
    it('renders primary filled', () => {
      const { baseElement } = render({ props: { ...defaultProps, hierarchy: Button.Hierarchy.Primary } })
      expect(baseElement).toMatchSnapshot()
    })

    it('renders primary outlined', () => {
      const { baseElement } = render({ props: {
        ...defaultProps,
        hierarchy: Button.Hierarchy.Primary,
        type: Button.Type.Outlined,
      } })
      expect(baseElement).toMatchSnapshot()
    })

    it('renders neutral (outlined)', () => {
      const { baseElement } = render({ props: {
        ...defaultProps,
        hierarchy: Button.Hierarchy.Neutral,
      } })
      expect(baseElement).toMatchSnapshot()
    })

    it('renders danger (filled)', () => {
      const { baseElement } = render({ props: {
        ...defaultProps,
        hierarchy: Button.Hierarchy.Danger,
      } })
      expect(baseElement).toMatchSnapshot()
    })

    it('renders danger (outlined)', () => {
      const { baseElement } = render({ props: {
        ...defaultProps,
        hierarchy: Button.Hierarchy.Danger,
        type: Button.Type.Outlined,
      } })
      expect(baseElement).toMatchSnapshot()
    })
  })

  describe('href button', () => {
    it('correctly sets rel attributes', () => {
      render({ props: { ...defaultProps, href: 'some-url.com' } })

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link.getAttribute('rel')).toEqual('noopener noreferrer')
    })
  })

  describe('main button', () => {
    it('renders child node', () => {
      render()
      expect(screen.getByText('test-trigger-button')).toBeInTheDocument()
    })

    it('invokes onClick', async() => {
      const onClick = jest.fn()
      render({ props: { ...defaultProps, onClick } })
      const mainButton = screen.getByRole('button', { name: 'test-trigger-button' })
      expect(mainButton).toBeInTheDocument()

      await userEvent.click(mainButton)
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('dropdown button', () => {
    it('renders secondary button', () => {
      render()
      expect(screen.getAllByRole('button')).toHaveLength(2)
      expect(screen.getByRole('button', { name: /open dropdown/i })).toBeInTheDocument()
    })

    it('opens dropdown menu on secondary button click', async() => {
      const onClick = jest.fn()
      const onItemClick = jest.fn()
      render({ props: { ...defaultProps, onClick, onItemClick } })

      const dropdownButton = screen.getByRole('button', { name: /open dropdown/i })
      expect(dropdownButton).toBeInTheDocument()

      await userEvent.click(dropdownButton)
      const firstMenuItem = await screen.findByRole('menuitem', { name: 'Label 1' })

      expect(screen.getAllByRole('menuitem')).toHaveLength(2)

      await userEvent.click(firstMenuItem)

      expect(onClick).not.toHaveBeenCalled()
      expect(onItemClick).toHaveBeenCalled()
      expect(onItemClick).toHaveBeenCalledTimes(1)
      expect(onItemClick).toHaveBeenCalledWith({
        id: '1',
        item: { id: '1', label: 'Label 1' },
        selectedPath: ['1'],
        domEvent: expect.anything(),
      })
    })

    it('calls onOpenChange when dropdown is triggered', async() => {
      const onOpenChange = jest.fn()
      render({ props: { ...defaultProps, onOpenChange } })

      const dropdownButton = screen.getByRole('button', { name: /open dropdown/i })
      expect(dropdownButton).toBeInTheDocument()

      await userEvent.click(dropdownButton)
      const firstMenuItem = await screen.findByRole('menuitem', { name: 'Label 1' })

      expect(screen.getAllByRole('menuitem')).toHaveLength(2)

      await userEvent.click(firstMenuItem)

      expect(onOpenChange).toHaveBeenCalledTimes(2)
      expect(onOpenChange).toHaveBeenNthCalledWith(1, true, { source: 'trigger' })
      expect(onOpenChange).toHaveBeenNthCalledWith(2, false, { source: 'menu' })
    })
  })
})

function render(
  { props }: { props: SplitButtonProps } = { props: defaultProps }
): RenderResult {
  return renderComponent(<SplitButton {...props} />)
}
