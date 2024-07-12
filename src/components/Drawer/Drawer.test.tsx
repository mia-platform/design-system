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

import { DrawerLipsum, DrawerLipsumFooterButton, DrawerLipsumTitle } from './Drawer.mocks'
import { render, screen } from '../../test-utils'
import { Drawer } from './Drawer'
import { DrawerProps } from './Drawer.props'

describe('Drawer', () => {
  const props: DrawerProps = {
    children: 'Drawer Content',
    footer: {
      buttons: [<DrawerLipsumFooterButton key="close-drawer" text="Close drawer" />],
      extra: 'extra content',
    },
    isVisible: true,
    title: <DrawerLipsumTitle />,
    onClose: jest.fn(),
  }

  beforeEach(() => jest.resetAllMocks())

  it('renders drawer with doc link', () => {
    const customProps = {
      ...props,
      docLink: 'https://www.google.com/',
    }
    render(<Drawer {...customProps} ><DrawerLipsum /></Drawer>)

    expect(screen.getByText(/drawer lipsum/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /pibookopen/i })).toBeVisible()
  })

  it('renders drawer with provided title and footer', () => {
    const { baseElement } = render(<Drawer {...props} ><DrawerLipsum /></Drawer>)

    expect(screen.getByText(/drawer lipsum/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /close drawer/i })).toBeInTheDocument()
    expect(screen.getByText(/extra content/i)).toBeInTheDocument()
    expect(screen.getByText(/Lorem ipsum dolor sit amet,/i)).toBeInTheDocument()

    expect(baseElement).toMatchSnapshot()
  })

  it('renders drawer with custom footer', () => {
    const customProps = {
      ...props,
      footer: <div>Custom footer content</div>,
    }
    render(<Drawer {...customProps} ><DrawerLipsum /></Drawer>)

    expect(screen.getByText(/drawer lipsum/i)).toBeVisible()
    expect(screen.getByText(/custom footer content/i)).toBeInTheDocument()
    expect(screen.getByText(/Lorem ipsum dolor sit amet,/i)).toBeInTheDocument()
  })

  it('does not render drawer when isVisible is false', () => {
    render(<Drawer {...props} isVisible={false} >{'the-content'}</Drawer>)
    expect(screen.queryByText(/drawer lipsum/i)).toBeNull()
  })

  test('should get drawer by test id', () => {
    render(<Drawer {...props} dataTestId="drawer-test" />)
    expect(screen.getByTestId('drawer-test')).toBeTruthy()
  })
})
