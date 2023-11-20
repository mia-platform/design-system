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

import { render, screen } from 'test-utils'

import { Icon } from '.'

describe('Icon Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders custom icon correctly', () => {
    const { asFragment } = render(<Icon name="MiaPlatform" />)

    expect(screen.getByRole('img', { name: 'MiaPlatform' })).toBeVisible()
    expect(screen.getByLabelText('MiaPlatform')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Ant icon correctly', () => {
    const { asFragment } = render(<Icon name="AiOutlineHome" />)

    expect(screen.getByRole('img', { name: 'AiOutlineHome' })).toBeVisible()
    expect(screen.getByLabelText('AiOutlineHome')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Feather icon correctly', () => {
    const { asFragment } = render(<Icon name="FiHome" />)

    expect(screen.getByRole('img', { name: 'FiHome' })).toBeVisible()
    expect(screen.getByLabelText('FiHome')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Phosphor icon correctly', () => {
    const { asFragment } = render(<Icon name="PiHouse" />)

    expect(screen.getByRole('img', { name: 'PiHouse' })).toBeVisible()
    expect(screen.getByLabelText('PiHouse')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })
})
