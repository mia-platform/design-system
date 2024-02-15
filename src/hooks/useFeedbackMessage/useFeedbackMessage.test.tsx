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

/* eslint-disable react/no-multi-comp */

import { act, fireEvent, render } from '../../test-utils'
import { useFeedbackMessage } from './useFeedbackMessage'

jest.useFakeTimers()

describe('useFeedbackMessage', () => {
  test('should show FeedbackMessage', () => {
    const Example = (): JSX.Element => {
      const { info } = useFeedbackMessage()

      return (
        <button
          type="button"
          onClick={() => { info({ message: 'This is a FeedbackMessage' }) }}
        >
            Open
        </button>
      )
    }

    const { getByRole, getByText } = render(<Example />)
    fireEvent.click(getByRole('button', { name: 'Open' }))

    expect(getByText('This is a FeedbackMessage')).toBeInTheDocument()
  })

  test('should show FeedbackMessage with an extra button', () => {
    const Example = (): JSX.Element => {
      const { success } = useFeedbackMessage()

      return (
        <button
          type="button"
          onClick={() => {
            success({
              message: 'This is a FeedbackMessage',
              extra: <button type="button">Close</button>,
            })
          }}
        >
            Open
        </button>
      )
    }

    const { getByRole, getByText } = render(<Example />)
    fireEvent.click(getByRole('button', { name: 'Open' }))

    expect(getByText('This is a FeedbackMessage')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('FeedbackMessage disappears after 5 seconds', () => {
    const message = 'This is a FeedbackMessage'

    const Example = (): JSX.Element => {
      const { error } = useFeedbackMessage()

      return (
        <button
          type="button"
          onClick={() => { error({ message, duration: 5 }) }}
        >
            Open
        </button>
      )
    }

    const { getByRole, getByText, queryByText } = render(<Example />)

    fireEvent.click(getByRole('button', { name: 'Open' }))
    expect(getByText(message)).toBeInTheDocument()

    act(() => { jest.advanceTimersByTime(5001) })
    expect(queryByText(message)).not.toBeInTheDocument()
  })

  test('FeedbackMessage is sticky and does not disappear', () => {
    const Example = (): JSX.Element => {
      const { info } = useFeedbackMessage()

      return (
        <button
          type="button"
          onClick={() => {
            info({ message: 'This is a FeedbackMessage', sticky: true })
          }}
        >
            Open
        </button>
      )
    }

    const { getByRole, getByText } = render(<Example />)
    fireEvent.click(getByRole('button', { name: 'Open' }))

    act(() => { jest.advanceTimersByTime(5000) })

    expect(getByText('This is a FeedbackMessage')).toBeInTheDocument()
  })

  test('FeedbackMessage disappear after click on button inside message', () => {
    const key = 'key'
    const message = 'Loading...'

    const Example = (): JSX.Element => {
      const { loading, dismiss } = useFeedbackMessage()
      const onDismiss = (): void => { dismiss(key) }

      const extra = <button type="button" onClick={onDismiss}>Close</button>

      return (
        <button
          type="button"
          onClick={() => { loading({ key, message, extra }) }}
        >
            Open
        </button>
      )
    }

    const { getByRole, getByText, queryByText } = render(<Example />)

    fireEvent.click(getByRole('button', { name: 'Open' }))
    expect(getByText(message)).toBeInTheDocument()

    act(() => { fireEvent.click(getByRole('button', { name: 'Close' })) })
    expect(queryByText(message)).not.toBeInTheDocument()
  })
})
