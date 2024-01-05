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

import { render, screen, waitFor } from '../../test-utils'
import { Button } from '../Button'
import { Card } from '.'

describe('Card Component', () => {
  const props = {
    docLink: 'https://mia-platform.eu',
    extra: <Button>{'Button'}</Button>,
    subtitle: 'Card Subtitle',
    title: 'Card Title',
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders card correctly', () => {
    const { asFragment } = render(<Card {...props}>{'Card Content'}</Card>)
    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByRole('h3', { name: /Card Title/i })).toBeVisible()

    expect(screen.getByRole('button', { name: /PiBookOpen/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /Button/i })).toBeVisible()

    expect(screen.getAllByRole('paragraph')).toHaveLength(1)
    expect(screen.getByText(/Card Subtitle/i)).toBeVisible()

    expect(screen.getByText(/Card Content/i)).toBeVisible()
  })

  test('renders skeleton correctly', async() => {
    const { asFragment } = render(<Card isLoading={true} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
})
