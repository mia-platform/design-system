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

import { render, screen } from '../../test-utils'
import { Divider } from '.'
import { Orientation } from './Divider.types'

describe('Divider Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders divider', () => {
    const { asFragment } = render(<Divider />)

    expect(screen.getByRole('separator')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders divider with text correctly', () => {
    const { asFragment } = render(<Divider text="Some text" />)

    expect(screen.getByRole('separator')).toBeVisible()
    expect(screen.getByText('Some text')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders vertical divider correctly', () => {
    const { asFragment } = render(<Divider orientation={Orientation.Vertical} />)

    expect(screen.getByRole('separator')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })
})
