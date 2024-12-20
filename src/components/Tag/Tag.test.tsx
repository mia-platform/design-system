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
import { PiCircleHalfTilt } from 'react-icons/pi'
import userEvent from '@testing-library/user-event'

import { Color, Type } from './types.ts'
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

  it('renders Chip type correctly', () => {
    const { asFragment } = render(<Tag type={Type.Chip} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders WithIcon correctly', () => {
    const { asFragment } = render(<Tag icon={PiCircleHalfTilt} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ColorBlue correctly', () => {
    const { asFragment } = render(<Tag color={Color.Blue} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ColorTeal correctly', () => {
    const { asFragment } = render(<Tag color={Color.Teal} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ColorGreen correctly', () => {
    const { asFragment } = render(<Tag color={Color.Green} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ColorYellow correctly', () => {
    const { asFragment } = render(<Tag color={Color.Yellow} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ColorMagenta correctly', () => {
    const { asFragment } = render(<Tag color={Color.Magenta} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ColorPurple correctly', () => {
    const { asFragment } = render(<Tag color={Color.Purple} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ColorRed correctly', () => {
    const { asFragment } = render(<Tag color={Color.Red} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders CustomColor correctly', () => {
    const { asFragment } = render(<Tag color="brown" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with close icon and calls onClose', async() => {
    render(<Tag {...props}>{'Tag text'}</Tag>)

    const closeButton = screen.getByRole('img', { name: /close/i })
    expect(closeButton).toBeInTheDocument()
    await userEvent.click(closeButton)
    await waitFor(() => expect(props.onClose).toHaveBeenCalled())
  })
})
