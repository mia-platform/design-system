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

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tag } from './Tag'
import { render } from '../../test-utils'

const props = {
  color: '#ff0000',
  closeIcon: true,
  onClose: jest.fn(),
}

describe('Tag', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { asFragment } = render(<Tag {...props}>{'Tag text'}</Tag>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with close icon and calls onClose', async() => {
    render(<Tag {...props}>{'Tag text'}</Tag>)

    const closeButton = screen.getByRole('img', { name: /close/i })
    expect(closeButton).toBeInTheDocument()
    userEvent.click(closeButton)
    await waitFor(() => expect(props.onClose).toHaveBeenCalled())
  })
})
