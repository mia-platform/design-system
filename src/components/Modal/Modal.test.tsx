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

import { ReactNode } from 'react'

import { asideFixed, asideOpenable, docLink, footer, footerCustom, title } from './Modal.mocks'
import { fireEvent, render, screen, waitFor, within } from '../../test-utils'
import { Modal } from '.'

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
    expect(screen.getByRole('button', { name: /Doc link/i })).toBeVisible()
    expect(screen.getByText(/Modal Content/i)).toBeVisible()
    expect(screen.getByRole('button', { name: 'OK' })).toBeVisible()
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders large modal correctly (with empty footer)', async() => {
    const { baseElement } = render(<Modal {...props} footer={undefined} size={Modal.Size.Large} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    expect(screen.getByRole('h4', { name: title })).toBeVisible()
    expect(screen.getByRole('button', { name: /Doc link/i })).toBeVisible()
    expect(screen.getByText(/Modal Content/i)).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders fullscreen modal correctly (with empty header)', async() => {
    const { baseElement } = render(<Modal {...props} size={Modal.Size.FullScreen} title={undefined} />)

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

  test('calls afterClose on modal hiding', async() => {
    const afterClose = jest.fn()
    const containerWithModalVisible = (isVisible: boolean): ReactNode => (
      <>
        <div data-testid="container-div-test-id" id="container-div" style={{ padding: 24 }} />
        <Modal
          {...props}
          afterClose={afterClose}
          getContainer={() => document.getElementById('container-div') || document.body}
          isVisible={isVisible}
        />
      </>
    )
    const { rerender } = render(containerWithModalVisible(true))
    rerender(containerWithModalVisible(false))

    await waitFor(() => {
      expect(afterClose).toHaveBeenCalled()
    })
  })

  test('renders modal with body full width', async() => {
    const { baseElement } = render(<Modal isBodyFullWidth isVisible />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

    expect(baseElement).toMatchSnapshot()
  })

  test('renders modal with aside fixed', async() => {
    const { baseElement } = render(<Modal {...props} aside={asideFixed} size={Modal.Size.Large} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    const asideTitle = screen.getByRole('paragraph')
    expect(asideTitle).toBeVisible()
    expect(screen.getByText(/Modal Aside Title/i)).toBeVisible()
    expect(screen.getByText(/Modal Aside Content/i)).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders modal with aside openable', async() => {
    const { baseElement } = render(<Modal {...props} aside={asideOpenable} size={Modal.Size.Large} />)

    await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

    expect(baseElement.getElementsByClassName('bodyWithAsideClosed').length).toEqual(1)
    expect(baseElement.getElementsByClassName('bodyWithAsideOpened').length).toEqual(0)

    const openButton = screen.getByRole('img', { name: 'Open aside' })
    expect(openButton).toBeVisible()
    expect(screen.getByText('Open')).toBeVisible()
    expect(screen.queryByText('Close')).toBeNull()

    expect(baseElement).toMatchSnapshot()

    fireEvent.click(openButton)

    expect(baseElement.getElementsByClassName('bodyWithAsideClosed').length).toEqual(0)
    expect(baseElement.getElementsByClassName('bodyWithAsideOpened').length).toEqual(1)

    const closeButton = screen.getByRole('img', { name: 'Close aside' })
    expect(closeButton).toBeVisible()
    expect(screen.queryByText('Open')).toBeNull()
    expect(screen.getByText('Close')).toBeVisible()

    expect(screen.getByRole('paragraph')).toBeVisible()
    expect(screen.getByText(/Modal Aside Title/i)).toBeVisible()
    expect(screen.getByText(/Modal Aside Content/i)).toBeVisible()

    expect(baseElement).toMatchSnapshot()
  })

  test('renders modal inside specified container node', () => {
    render(
      <>
        <div data-testid="container-div-test-id" id="container-div" />
        <Modal {...props} getContainer={() => document.getElementById('container-div') || document.body} />
      </>
    )

    const container = screen.getByTestId('container-div-test-id')
    expect(container).toBeInTheDocument()
    expect(within(container).getByRole('dialog')).toBeInTheDocument()
  })
})
