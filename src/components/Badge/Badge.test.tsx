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

import { PiCircleHalfTilt } from 'react-icons/pi'

import { render, screen } from '../../test-utils'
import { Badge } from './Badge'
import { Button } from '../Button'

describe('Badge Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders a badge with icon and title', () => {
    const { asFragment } = render(<Badge icon={PiCircleHalfTilt} title="Title" />)

    expect(screen.getByText('Title')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a badge with description', () => {
    const { asFragment } = render(
      <Badge
        description="Description"
        icon={PiCircleHalfTilt}
        title="Title"
      />
    )

    expect(screen.getByRole('paragraph')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a badge with an extra', () => {
    const { asFragment } = render(
      <Badge
        description="Description"
        extra={<Button>Button</Button>}
        icon={PiCircleHalfTilt}
        title="Title"
      />
    )

    expect(screen.getByText('Button')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
