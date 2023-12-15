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

import { Hierarchy, Mode } from './Menu.types'
import { category, divider, group, item } from './Menu.mocks'
import { render, screen, waitFor } from '../../test-utils'
import { Menu } from '.'

const { Primary } = Hierarchy
const { Vertical } = Mode

const items = [item, group, divider, category]

/*
 * Ant natively allows the menu to be collapsed even in `vertical` mode, but advises against doing so
 * (in fact, the reference prop is called `inlineCollapsed`).
 * Since we want to make the menu collapsible in `vertical` mode as well, we decided to hide this warning.
 */
const originalErr = global.console.error.bind(global.console.error)
const warningToSuppress = 'Warning: [antd: Menu] `inlineCollapsed` should only be used when `mode` is inline.'

describe('Menu Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders inline menu correctly', async() => {
    const { asFragment } = render(<Menu items={items} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders vertical menu correctly', async() => {
    global.console.error = (msg) => !msg.toString().includes(warningToSuppress) && originalErr(msg)

    const { asFragment } = render(<Menu items={items} mode={Vertical} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())

    global.console.error = originalErr
  })

  test('renders collapsed menu correctly', async() => {
    const { asFragment } = render(<Menu isCollapsed={true} items={items} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders primary menu correctly', async() => {
    const { asFragment } = render(<Menu hierarchy={Primary} items={items} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders skeleton correctly', async() => {
    const { asFragment } = render(<Menu isLoading={true} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders category correctly', async() => {
    const { asFragment } = render(<Menu items={[category]} />)

    expect(screen.getByText('CATEGORY')).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'PiSun Category Item 1' })).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'PiMoon Category Item 2' })).toBeVisible()

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders group correctly', async() => {
    const { asFragment } = render(<Menu items={[group]} />)

    expect(screen.getByRole('menuitem', { name: 'PiSnowflake Group' })).toBeVisible()

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders divider correctly', () => {
    const { asFragment } = render(<Menu items={[divider]} />)

    expect(screen.getByRole('separator')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders item correctly', async() => {
    const { asFragment } = render(<Menu items={[item]} />)

    expect(screen.getByRole('menuitem', { name: 'PiStar Item' })).toBeVisible()

    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
})
