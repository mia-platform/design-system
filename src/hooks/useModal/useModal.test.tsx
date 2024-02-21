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

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Button, Modal } from '../..'
import { useModal } from '.'

describe('useModal', () => {
  test('should open and close Modal', async() => {
    const title = 'Modal Title'
    const children = 'Modal Content'

    const Example = (): JSX.Element => {
      const { isModalVisible, openModal, closeModal, changeModalStatus } = useModal()
      return (
        <>
          <Button onClick={openModal}>Open Modal</Button>
          <Button onClick={changeModalStatus}>Change Modal Status</Button>
          <Modal
            isVisible={isModalVisible}
            title={title}
            onCloseClick={closeModal}
          >
            {children}
          </Modal>
        </>
      )
    }

    render(<Example />)

    fireEvent.click(screen.getByRole('button', { name: /Open Modal/i }))

    await waitFor(() => expect(screen.getByRole('h4', { name: title })).toBeVisible())
    expect(screen.getByText(children)).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: /Close/i }))

    await waitFor(() => expect(screen.queryByRole('h4', { name: title })).not.toBeInTheDocument())
    expect(screen.queryByText(children)).not.toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: /Change Modal Status/i }))

    await waitFor(() => expect(screen.getByRole('h4', { name: title })).toBeVisible())
    expect(screen.getByText(children)).toBeVisible()
  })
})
