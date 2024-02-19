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

import { act, fireEvent, render, screen } from '../../test-utils'
import { FeedbackMessagePosition } from './useFeedbackMessage.types'
import { useFeedbackMessage } from './useFeedbackMessage'

jest.useFakeTimers()

describe('useFeedbackMessage', () => {
  test('should show FeedbackMessage', async() => {
    const message = 'This is a Feedback Message'
    const Example = (): JSX.Element => {
      const { info } = useFeedbackMessage()

      return (
        <button type="button" onClick={() => { info({ message }) }}>
            Open
        </button>
      )
    }

    render(<Example />)
    fireEvent.click(screen.getByRole('button', { name: /open/i }))

    expect(await screen.findByText(message)).toBeInTheDocument()
  })

  test('should show FeedbackMessage with an extra button', () => {
    const message = 'This is Feedback Message with some extra content'

    const Example = (): JSX.Element => {
      const { success } = useFeedbackMessage()

      return (
        <button
          type="button"
          onClick={() => {
            success({
              message,
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

    expect(getByText(message)).toBeInTheDocument()
    expect(getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('FeedbackMessage disappears after 5 seconds', () => {
    const message = 'This is a Feedback Message that disappear after five seconds'

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
    const message = 'This is a sticky Feedback Message'

    const Example = (): JSX.Element => {
      const { info } = useFeedbackMessage()

      return (
        <button type="button" onClick={() => { info({ message, sticky: true }) }}>
            Open
        </button>
      )
    }

    const { getByRole, getByText } = render(<Example />)
    fireEvent.click(getByRole('button', { name: 'Open' }))

    act(() => { jest.advanceTimersByTime(5000) })

    expect(getByText(message)).toBeInTheDocument()
  })

  test('FeedbackMessage disappears after clicking the button contained within it', () => {
    const key = 'key'
    const message = 'Loading...'

    const Example = (): JSX.Element => {
      const { loading, dismiss } = useFeedbackMessage()
      const onDismiss = (): void => { dismiss(key) }

      const extra = <button type="button" onClick={onDismiss}>Dismiss</button>

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

    act(() => { fireEvent.click(getByRole('button', { name: 'Dismiss' })) })
    expect(queryByText(message)).not.toBeInTheDocument()
  })

  test('there can only be one FeedbackMessage attached to the bottom', () => {
    const message = 'This is a Feedback Message placed to the bottom of the page'
    const updatedMessage = 'This is an updated Feedback Message placed to the bottom of the page'

    const Example = (): JSX.Element => {
      const { info } = useFeedbackMessage()

      return <>
        <button type="button" onClick={() => { info({ message, position: FeedbackMessagePosition.Bottom }) }}>
            Open message
        </button>
        <button type="button" onClick={() => { info({ message: updatedMessage, position: FeedbackMessagePosition.Bottom }) }}>
            Open updated message
        </button>
      </>
    }

    const { getByRole, getByText, queryByText } = render(<Example />)

    fireEvent.click(getByRole('button', { name: 'Open message' }))
    expect(getByText(message)).toBeInTheDocument()
    expect(queryByText(updatedMessage)).not.toBeInTheDocument()

    fireEvent.click(getByRole('button', { name: 'Open updated message' }))
    expect(queryByText(message)).not.toBeInTheDocument()
    expect(getByText(updatedMessage)).toBeInTheDocument()
  })
})
