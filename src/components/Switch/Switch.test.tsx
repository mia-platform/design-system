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
import { Size } from './Switch.types'
import { Switch } from './Switch'

describe('Switch', () => {
  describe('renders states correctly', () => {
    it('renders default state', () => {
      render(<Switch />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).not.toBeChecked()
    })

    it('renders checked by default state', () => {
      render(<Switch isInitiallyChecked={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeChecked()
    })

    it('renders checked state', () => {
      render(<Switch isChecked={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeChecked()
    })

    it('renders default disabled state', () => {
      render(<Switch isDisabled={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeDisabled()
    })

    it('renders checked disabled state', () => {
      const { asFragment } = render(<Switch isChecked={true} isDisabled={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeDisabled()
      expect(screen.getByRole('switch')).toBeChecked()
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders default loading state', () => {
      const { asFragment } = render(<Switch isChecked={false} isLoading={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeDisabled()
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders checked loading state', () => {
      const { asFragment } = render(<Switch isChecked={true} isLoading={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeDisabled()
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('renders sizes correctly', () => {
    it('renders large size', () => {
      render(<Switch size={Size.Large} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toHaveClass('mia-platform-switch')
      expect(screen.getByRole('switch')).not.toHaveClass('mia-platform-switch-small')
    })

    it('renders small size', () => {
      render(<Switch size={Size.Small} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toHaveClass('mia-platform-switch')
      expect(screen.getByRole('switch')).toHaveClass('mia-platform-switch-small')
    })
  })

  describe('renders text correctly', () => {
    it('renders simple text', () => {
      render(<Switch text="Switch" />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByText('Switch')).toBeInTheDocument()
    })

    it('renders text and description', () => {
      render(<Switch description="Switch description" text="Switch text" />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByText('Switch text')).toBeInTheDocument()
      expect(screen.getByText('Switch description')).toBeInTheDocument()
    })

    it('ignores description if text is not set', () => {
      render(<Switch description="Switch description" />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.queryByText('Switch description')).not.toBeInTheDocument()
    })
  })

  describe('performs interactions correctly', () => {
    it('calls onClick when the switch is clicked', async() => {
      const onClick = jest.fn()
      render(<Switch onClick={onClick} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).not.toBeChecked()
      await userEvent.click(screen.getByRole('switch'))
      await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1))
    })

    it('calls onChange when the switch state changes', async() => {
      const onChange = jest.fn()
      render(<Switch onChange={onChange} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).not.toBeChecked()
      await userEvent.click(screen.getByRole('switch'))
      await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
    })
  })
})
