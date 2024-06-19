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

import { ReactNode, act, useCallback, useState } from 'react'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../..'
import { useModal } from '.'

const ModalWrapper = ({ modalTitle, modalChildren } : {modalTitle: string, modalChildren: ReactNode}): JSX.Element => {
  const { Modal, openModal, toggleModal } = useModal()
  const [status, setStatus] = useState('idle')

  const changeContent = useCallback(() : void => {
    setStatus('changed')
  }, [])

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Button onClick={toggleModal}>Toggle Modal Visibility</Button>
      <Button onClick={changeContent}>Change Modal Content</Button>
      <Modal title={modalTitle}>
        {status === 'idle' ? modalChildren : 'Something changed!'}
      </Modal>
    </>
  )
}

describe('useModal', () => {
  test('should return isModalVisible, openModal, closeModal and toggleModal properties', async() => {
    const { result } = renderHook(() => useModal())
    const { isModalVisible, openModal, closeModal, toggleModal } = result.current

    expect(isModalVisible).toEqual(false)
    act(() => openModal())
    expect(result.current.isModalVisible).toEqual(true)
    act(() => closeModal())
    expect(result.current.isModalVisible).toEqual(false)
    act(() => toggleModal())
    expect(result.current.isModalVisible).toEqual(true)
    act(() => toggleModal())
    expect(result.current.isModalVisible).toEqual(false)
  })

  test('should open and close Modal', async() => {
    const title = 'Modal Title'
    const children = 'Modal Content'

    render(<ModalWrapper modalChildren={children} modalTitle={title} />)

    userEvent.click(screen.getByRole('button', { name: /open modal/i }))

    expect(await screen.findByRole('h4', { name: title })).toBeInTheDocument()
    expect(screen.getByText(children)).toBeInTheDocument()

    screen.getByRole('button', { name: /close/i }).click()

    await waitFor(() => expect(screen.queryByRole('h4', { name: title })).not.toBeInTheDocument())
    expect(screen.queryByText(children)).toBeNull()

    userEvent.click(screen.getByRole('button', { name: /toggle modal visibility/i }))

    expect(await screen.findByRole('h4', { name: /modal title/i })).toBeInTheDocument()
    expect(screen.getByText(children)).toBeInTheDocument()
  })

  test('should not rerender Modal when children change', async() => {
    const title = 'Modal Title'
    const children = 'Modal Content'

    render(<ModalWrapper modalChildren={children} modalTitle={title} />)

    userEvent.click(screen.getByRole('button', { name: /toggle modal visibility/i }))

    expect(await screen.findByRole('h4', { name: /modal title/i })).toBeInTheDocument()
    expect(screen.getByText(children)).toBeInTheDocument()

    const modal = screen.getByRole('dialog')
    userEvent.click(screen.getByRole('button', { name: /change modal content/i }))
    expect(modal).toBeInTheDocument()
  })
})
