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

import { fireEvent, render, screen } from '@testing-library/react'

import { Hierarchies, OptionsAlignments } from './SegmentedControl.types'
import { labeledOptions, stringOptions } from './SegmentedControl.mocks'
import { SegmentedControl } from '.'

const { Primary } = Hierarchies
const { Vertical } = OptionsAlignments

describe('Segmented Control Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('labeled options', () => {
    const [, clickedOption, selectedOption, , controlledOption] = labeledOptions

    const onChange = jest.fn()

    const props = {
      defaultValue: selectedOption.key,
      options: labeledOptions,
      onChange,
    }

    test('renders options correctly', () => {
      const { asFragment } = render(<SegmentedControl {...props} />)

      expect(screen.getByRole('list')).toBeVisible()

      labeledOptions.forEach(({ key, isDisabled }) => {
        const option = screen.getByRole('listitem', { name: key })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', isDisabled ? 'true' : 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders primary options correctly', () => {
      const { asFragment } = render(<SegmentedControl {...props} hierarchy={Primary} />)

      expect(screen.getByRole('list')).toBeVisible()

      labeledOptions.forEach(({ key, isDisabled }) => {
        const option = screen.getByRole('listitem', { name: key })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', isDisabled ? 'true' : 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders vertical options correctly', () => {
      const { asFragment } = render(<SegmentedControl {...props} optionsAlignment={Vertical} />)

      expect(screen.getByRole('list')).toBeVisible()

      labeledOptions.forEach(({ key, isDisabled }) => {
        const option = screen.getByRole('listitem', { name: key })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', isDisabled ? 'true' : 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders disabled segmented correctly', () => {
      const { asFragment } = render(<SegmentedControl {...props} isDisabled />)

      expect(screen.getByRole('list')).toBeVisible()

      labeledOptions.forEach(({ key }) => {
        const option = screen.getByRole('listitem', { name: key })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'true')
      })

      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('select numeric default value correctly', () => {
      render(<SegmentedControl {...props} defaultValue={2} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')
    })

    test('select value correctly', () => {
      render(<SegmentedControl {...props} value={controlledOption.key} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: controlledOption.key })).toHaveAttribute('aria-checked', 'true')
    })

    test('select numeric value correctly', () => {
      render(<SegmentedControl {...props} value={4} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: controlledOption.key })).toHaveAttribute('aria-checked', 'true')
    })

    test('calls onChange correctly', () => {
      render(<SegmentedControl {...props} />)

      fireEvent.click(screen.getByRole('listitem', { name: clickedOption.key }))

      expect(onChange).toBeCalledTimes(1)
      expect(onChange).toBeCalledWith(clickedOption, expect.objectContaining({ ...MouseEvent }))
    })
  })

  describe('string options', () => {
    const [, clickedOption, selectedOption, , controlledOption] = stringOptions

    const onChange = jest.fn()

    const props = {
      defaultValue: selectedOption,
      options: stringOptions,
      onChange,
    }

    test('renders options correctly', () => {
      const { asFragment } = render(<SegmentedControl {...props} />)

      expect(screen.getByRole('list')).toBeVisible()

      stringOptions.forEach(name => {
        const option = screen.getByRole('listitem', { name })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders primary options correctly', () => {
      const { asFragment } = render(<SegmentedControl {...props} hierarchy={Primary} />)

      expect(screen.getByRole('list')).toBeVisible()

      stringOptions.forEach(name => {
        const option = screen.getByRole('listitem', { name })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders vertical options correctly', () => {
      const { asFragment } = render(<SegmentedControl {...props} optionsAlignment={Vertical} />)

      expect(screen.getByRole('list')).toBeVisible()

      stringOptions.forEach(name => {
        const option = screen.getByRole('listitem', { name })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders disabled segmented correctly', () => {
      const { asFragment } = render(<SegmentedControl {...props} isDisabled />)

      expect(screen.getByRole('list')).toBeVisible()

      stringOptions.forEach(name => {
        const option = screen.getByRole('listitem', { name })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'true')
      })

      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('select numeric default value correctly', () => {
      render(<SegmentedControl {...props} defaultValue={2} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')
    })

    test('select value correctly', () => {
      render(<SegmentedControl {...props} value={controlledOption} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: controlledOption })).toHaveAttribute('aria-checked', 'true')
    })

    test('select numeric value correctly', () => {
      render(<SegmentedControl {...props} value={4} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: controlledOption })).toHaveAttribute('aria-checked', 'true')
    })

    test('calls onChange correctly', () => {
      render(<SegmentedControl {...props} />)

      fireEvent.click(screen.getByRole('listitem', { name: clickedOption }))

      expect(onChange).toBeCalledTimes(1)
      expect(onChange).toBeCalledWith(clickedOption, expect.objectContaining({ ...MouseEvent }))
    })
  })
})
