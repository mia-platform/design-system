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

import { render, screen, userEvent, waitFor } from '../../test-utils'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  describe('renders states correctly', () => {
    it('renders default state', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('renders checked by default state', () => {
      render(<Checkbox isInitiallyChecked={true} />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('renders checked state', () => {
      render(<Checkbox isChecked={true} />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('renders default disabled state', () => {
      render(<Checkbox isDisabled={true} />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('renders checked disabled state', () => {
      const { asFragment } = render(<Checkbox isChecked={true} isDisabled={true} />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeDisabled()
      expect(screen.getByRole('checkbox')).toBeChecked()
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('renders text correctly', () => {
    it('renders simple text', () => {
      render(<Checkbox label="Checkbox" />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByText('Checkbox')).toBeInTheDocument()
    })

    it('renders text and description', () => {
      render(<Checkbox description="Checkbox description" label="Checkbox text" />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByText('Checkbox text')).toBeInTheDocument()
      expect(screen.getByText('Checkbox description')).toBeInTheDocument()
    })

    it('ignores description if text is not set', () => {
      render(<Checkbox description="Checkbox description" />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.queryByText('Checkbox description')).not.toBeInTheDocument()
    })
  })

  describe('performs interactions correctly', () => {
    it('calls onChange when the checkbox state changes', async() => {
      const onChange = jest.fn()
      render(<Checkbox onChange={onChange} />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).not.toBeChecked()
      await userEvent.click(screen.getByRole('checkbox'))
      await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
    })
  })
})
