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

import { PiAddressBook, PiCar } from 'react-icons/pi'

import { render, screen } from '../../test-utils'
import { Alert } from '../Alert'
import { Button } from '../Button'
import { Feedback } from './Feedback'
import { Input } from '../Input'
import { Tag } from '../Tag'

describe('Feedback Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders a feedback with icon and title', () => {
    const { asFragment } = render(<Feedback title="Title" type={Feedback.Type.Success} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a feedback with a custom icon', () => {
    const { asFragment } = render(<Feedback icon={PiCar} title="Title" type={Feedback.Type.Special} />)

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a feedback with a loading icon', () => {
    const { asFragment } = render(<Feedback title="Title" type={Feedback.Type.Loading} />)

    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a feedback with a description', () => {
    const { asFragment } = render(<Feedback description="Description" title="Title" type={Feedback.Type.Error} />)

    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a feedback with a badge', () => {
    const { asFragment } = render(
      <Feedback
        badge={{
          description: 'Badge subtitle',
          extra: <Tag>Tag</Tag>,
          icon: PiAddressBook,
          title: 'Badge title',
        }}
        title="Title"
        type={Feedback.Type.Delete}
      />
    )

    expect(screen.getByText('Badge title')).toBeInTheDocument()
    expect(screen.getByText('Tag')).toBeInTheDocument()
    expect(screen.getByText('Badge subtitle')).toBeInTheDocument()
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a feedback with an alert', () => {
    const { asFragment } = render(
      <Feedback
        alert={{
          description: 'Alert description',
          title: 'Alert title',
          type: Alert.Type.Warning,
        }}
        title="Title"
        type={Feedback.Type.EmptyState}
      />
    )

    expect(screen.getByText('Alert title')).toBeInTheDocument()
    expect(screen.getByText('Alert description')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a feedback with children', () => {
    const { asFragment } = render(
      <Feedback title="Title" type={Feedback.Type.Generic}>
        <>
          <Input placeholder="This is an input" />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button>Primary action</Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type={Button.Type.Link}>Secondary action</Button>
          </div>
        </>
      </Feedback>
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Primary action')).toBeInTheDocument()
    expect(screen.getByText('Secondary action')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
