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

import { render, waitFor } from '@testing-library/react'

import { category, divider, group, item } from './Menu.mocks'
import { Menu } from '.'
import { Modes } from './Menu.types'

const { Vertical } = Modes

describe('Menu Component', () => {
  const originalErr = global.console.error.bind(global.console.error)
  const warningToSuppress = 'Warning: [antd: Menu] `inlineCollapsed` should only be used when `mode` is inline.'

  beforeAll(() => {
    global.console.error = (msg) => !msg.toString().includes(warningToSuppress) && originalErr(msg)
  })

  afterAll(() => {
    global.console.error = originalErr
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  const items = [item, group, divider, category]

  test('renders inline menu correctly', async() => {
    const { asFragment } = render(<Menu items={items} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders vertical menu correctly', async() => {
    const { asFragment } = render(<Menu items={items} mode={Vertical} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders collapsed menu correctly', async() => {
    const { asFragment } = render(<Menu isCollapsed={true} items={items} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders skeleton correctly', () => {
    const { asFragment } = render(<Menu isLoading={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders category correctly', async() => {
    const { asFragment } = render(<Menu items={[category]} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders group correctly', async() => {
    const { asFragment } = render(<Menu items={[group]} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders divider correctly', () => {
    const { asFragment } = render(<Menu items={[divider]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders item correctly', async() => {
    const { asFragment } = render(<Menu items={[item]} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
})
