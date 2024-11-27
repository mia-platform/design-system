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

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { PiStar } from 'react-icons/pi'

import { Alert } from './Alert'
import { Button } from '../Button'

describe('Alert Snapshot Tests', () => {
  it('renders Special correctly', () => {
    const { asFragment } = render(<Alert description="Description" title="Title" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Info correctly', () => {
    const { asFragment } = render(<Alert description="Description" title="Title" type={Alert.Type.Info} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Warning correctly', () => {
    const { asFragment } = render(<Alert description="Description" title="Title" type={Alert.Type.Warning} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Error correctly', () => {
    const { asFragment } = render(<Alert description="Description" title="Title" type={Alert.Type.Error} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Success correctly', () => {
    const { asFragment } = render(<Alert description="Description" title="Title" type={Alert.Type.Success} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders InfoCompressed correctly', () => {
    const { asFragment } = render(
      <Alert
        description="Description"
        isCompressed={true}
        title="Title"
        type={Alert.Type.Info}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders WarningCompressed correctly', () => {
    const { asFragment } = render(
      <Alert
        description="Description"
        isCompressed={true}
        title="Title"
        type={Alert.Type.Warning}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ErrorCompressed correctly', () => {
    const { asFragment } = render(
      <Alert
        description="Description"
        isCompressed={true}
        title="Title"
        type={Alert.Type.Error}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders SuccessCompressed correctly', () => {
    const { asFragment } = render(
      <Alert
        description="Description"
        isCompressed={true}
        title="Title"
        type={Alert.Type.Success}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders SpecialCompressed correctly', () => {
    const { asFragment } = render(
      <Alert description="Description" isCompressed={true} title="Title" />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders WithAction correctly', () => {
    const { asFragment } = render(
      <Alert
        action={<Button>Action</Button>}
        description="Description"
        title="Title"
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders WithCustomIcon correctly', () => {
    const { asFragment } = render(
      <Alert description="Description" icon={PiStar} title="Title" />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders WithCustomContent correctly', () => {
    const { asFragment } = render(
      <Alert isCompressed={true}>
        <ul style={{ margin: '8px 24px' }}>
          <li>Custom content</li>
          <li>Custom content</li>
        </ul>
      </Alert>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onClose if the close button is pressed', async() => {
    const onClose = jest.fn()
    render(
      <Alert
        description="Description"
        title="Title"
        onClose={onClose}
      />
    )

    screen.logTestingPlaygroundURL()
    const closeButton = screen.getByRole('img')
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    }, { timeout: 15000 })
  })
})
