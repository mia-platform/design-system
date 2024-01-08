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

import { children, docLink, extra, subtitle, title } from './Card.mocks'
import { render, screen } from '../../test-utils'
import { Card } from '.'

describe('Card Component', () => {
  const props = {
    docLink,
    extra,
    subtitle,
    title,
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders card correctly', () => {
    const { asFragment } = render(<Card {...props}>{children}</Card>)
    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByRole('h3', { name: /Card Title/i })).toBeVisible()

    expect(screen.getByRole('button', { name: /PiBookOpen/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /Button/i })).toBeVisible()

    expect(screen.getAllByRole('paragraph')).toHaveLength(1)
    expect(screen.getByText(/Card Subtitle/i)).toBeVisible()

    expect(screen.getByText(/Card Content/i)).toBeVisible()
  })

  test('renders header only', () => {
    const { asFragment } = render(<Card {...props} />)
    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByRole('h3', { name: /Card Title/i })).toBeVisible()

    expect(screen.getByRole('button', { name: /PiBookOpen/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /Button/i })).toBeVisible()

    expect(screen.getAllByRole('paragraph')).toHaveLength(1)
    expect(screen.getByText(/Card Subtitle/i)).toBeVisible()
  })

  test('renders content only', () => {
    const { asFragment } = render(<Card>{children}</Card>)
    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByText(/Card Content/i)).toBeVisible()
  })

  test('renders skeleton correctly', () => {
    const { asFragment } = render(<Card isLoading={true} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
