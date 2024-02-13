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

import { fireEvent, render, screen } from '../../test-utils'
import { Button } from '../Button'
import { Message } from '.'

describe('Message Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders message', () => {
    const { asFragment } = render(<Message message="Feedback message" />)

    expect(screen.getByText('Feedback message')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders message with extra content', () => {
    const onButtonClickMock = jest.fn()
    const { asFragment } = render(
      <Message
        extra=<Button onClick={onButtonClickMock}>Button</Button>
        message="Feedback message"
      />
    )

    expect(screen.getByText('Feedback message')).toBeVisible()
    const button = screen.getByRole('button', { name: 'Button' })
    expect(button).toBeVisible()

    fireEvent.click(button)
    expect(onButtonClickMock).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })
})
