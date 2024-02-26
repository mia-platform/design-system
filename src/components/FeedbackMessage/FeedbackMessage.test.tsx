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
import { FeedbackMessage } from '.'

describe('FeedbackMessage Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders message', () => {
    const { asFragment } = render(<FeedbackMessage message="Feedback Message" />)

    expect(screen.getByText('Feedback Message')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders message with extra content', () => {
    const onButtonClickMock = jest.fn()
    const { asFragment } = render(
      <FeedbackMessage
        extra={<Button onClick={onButtonClickMock}>Button</Button>}
        message="Feedback Message"
      />
    )

    expect(screen.getByText('Feedback Message')).toBeVisible()
    const button = screen.getByRole('button', { name: 'Button' })
    expect(button).toBeVisible()

    fireEvent.click(button)
    expect(onButtonClickMock).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })
})
