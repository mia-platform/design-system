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

import { docLink, extensionFixed, extensionOpenable, footer, footerCustom, title } from './Modal.mocks'
import { fireEvent, render, screen, waitFor } from '../../test-utils'
import { Modal } from '.'
import { Size } from './Modal.types'

const { Large, FullScreen } = Size

const props = {
  children: 'Modal Content',
  docLink,
  footer,
  isVisible: true,
  title,
}

describe('Modal Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders small modal correctly (with children, docLink, footer and title)', async() => {
    const { baseElement } = render(<Modal {...props} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    expect(screen.getByRole('h4', { name: title })).toBeVisible()
    expect(screen.getByRole('button', { name: /PiBookOpen/i })).toBeVisible()
    expect(screen.getByText(/Modal Content/i)).toBeVisible()
    expect(screen.getByRole('button', { name: 'OK' })).toBeVisible()
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders large modal correctly (with no footer)', async() => {
    const { baseElement } = render(<Modal {...props} footer={undefined} size={Large} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    expect(screen.getByRole('h4', { name: title })).toBeVisible()
    expect(screen.getByRole('button', { name: /PiBookOpen/i })).toBeVisible()
    expect(screen.getByText(/Modal Content/i)).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders fullscreen modal correctly (with no header)', async() => {
    const { baseElement } = render(<Modal {...props} size={FullScreen} title={undefined} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    expect(screen.getByText(/Modal Content/i)).toBeVisible()
    expect(screen.getByRole('button', { name: 'OK' })).toBeVisible()
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('does not render modal in case it is not visible', async() => {
    const { baseElement } = render(<Modal {...props} isVisible={false} />)

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())

    expect(baseElement).toMatchSnapshot()
  })

  test('renders modal with custom footer', async() => {
    const { baseElement } = render(<Modal {...props} footer={footerCustom} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    expect(screen.getByRole('button', { name: /Button 1/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /Button 2/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /Button 3/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /Button 4/i })).toBeVisible()
    expect(screen.getByText('Footer Extra')).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders not closable modal', async() => {
    const { baseElement } = render(<Modal isClosable={false} isVisible />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    expect(screen.queryByRole('button', { name: /Close/i })).not.toBeInTheDocument()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders modal with body full width', async() => {
    const { baseElement } = render(<Modal isBodyFullWidth isVisible />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

    expect(baseElement).toMatchSnapshot()
  })

  test('renders modal with extension fixed', async() => {
    const { baseElement } = render(<Modal {...props} extension={extensionFixed} size={Large} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    const extensionTitle = screen.getByRole('paragraph')
    expect(extensionTitle).toBeVisible()
    expect(screen.getByText(/Modal Extension Title/i)).toBeVisible()
    expect(screen.getByText(/Modal Extension Content/i)).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders modal with extension openable', async() => {
    const { baseElement } = render(<Modal {...props} extension={extensionOpenable} size={Large} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    const extensionTitle = screen.queryByRole('paragraph')
    expect(extensionTitle).not.toBeInTheDocument()
    expect(screen.queryByText(/Modal Extension Title/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Modal Extension Content/i)).not.toBeInTheDocument()

    const openButton = screen.getByRole('img', { name: 'PiCaretRight' })
    expect(openButton).toBeVisible()
    expect(screen.getByText('Open')).toBeVisible()

    fireEvent.click(openButton)

    expect(screen.getByRole('paragraph')).toBeVisible()
    expect(screen.getByText(/Modal Extension Title/i)).toBeVisible()
    expect(screen.getByText(/Modal Extension Content/i)).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })
})
