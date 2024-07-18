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

import { createContext, useContext } from 'react'

import { act, fireEvent, render, screen, waitFor } from '../../test-utils'
import { useFeedbackMessageWithContext } from './useFeedbackMessageWithContext'

jest.useFakeTimers()

describe('useFeedbackMessageWithContext', () => {
  test('should show FeedbackMessage', async() => {
    const message = 'This is a Feedback Message'
    const Example = (): JSX.Element => {
      const { info, contextHolder } = useFeedbackMessageWithContext()

      return (
        <button type="button" onClick={() => info({ message })}>
          {'Open'}
          {contextHolder}
        </button>
      )
    }

    render(<Example />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    expect(await screen.findByRole('img', { name: 'info-circle' })).toBeVisible()
    expect(screen.getByText(message)).toBeVisible()
  })

  test('should show FeedbackMessage with an extra button', async() => {
    const message = 'This is Feedback Message with some extra content'

    const Example = (): JSX.Element => {
      const { success, contextHolder } = useFeedbackMessageWithContext()

      return (
        <button
          type="button"
          onClick={() => success({
            message,
            extra: <button type="button">Close</button>,
          })}
        >
          {'Open'}
          {contextHolder}
        </button>
      )
    }

    render(<Example />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    expect(await screen.findByRole('img', { name: 'check-circle' })).toBeVisible()
    expect(screen.getByText(message)).toBeVisible()
    expect(screen.getByRole('button', { name: 'Close' })).toBeVisible()
  })

  test('useFeedbackMessageWithContext methods return a Promise', async() => {
    const afterCloseMockFn = jest.fn()

    const Example = (): JSX.Element => {
      const { info, contextHolder } = useFeedbackMessageWithContext()

      const onClick = (): void => {
        info(
          { message: 'This is a feedback message', duration: 0.1 }
        ).then(() => { afterCloseMockFn() })
      }

      return (
        <button type="button" onClick={onClick}>
          {'Open'}
          {contextHolder}
        </button>
      )
    }

    render(<Example />)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    act(() => jest.advanceTimersByTime(101))
    await waitFor(() => { expect(afterCloseMockFn).toHaveBeenCalledTimes(1) })
  })

  test('FeedbackMessage disappears after 5 seconds', async() => {
    const message = 'This is a Feedback Message that disappears after five seconds'

    const Example = (): JSX.Element => {
      const { error, contextHolder } = useFeedbackMessageWithContext()

      return (
        <button
          type="button"
          onClick={() => error({ message, duration: 5 })}
        >
          {'Open'}
          {contextHolder}
        </button>
      )
    }

    render(<Example />)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    expect(await screen.findByRole('img', { name: 'close-circle' })).toBeVisible()
    expect(screen.getByText(message)).toBeVisible()

    act(() => jest.advanceTimersByTime(5001))

    expect(screen.queryByText(message)).not.toBeInTheDocument()
  })

  test('FeedbackMessage is sticky and does not disappear', async() => {
    const message = 'This is a sticky Feedback Message'

    const Example = (): JSX.Element => {
      const { info, contextHolder } = useFeedbackMessageWithContext()

      return (
        <button type="button" onClick={() => info({ message, sticky: true })}>
          {'Open'}
          {contextHolder}
        </button>
      )
    }

    render(<Example />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    act(() => jest.advanceTimersByTime(5000))

    expect(await screen.findByRole('img', { name: 'info-circle' })).toBeVisible()
    expect(screen.getByText(message)).toBeVisible()
  })

  test('FeedbackMessage disappears after clicking the button contained within it', async() => {
    const key = 'key'
    const message = 'Loading...'

    const Example = (): JSX.Element => {
      const { loading, dismiss, contextHolder } = useFeedbackMessageWithContext()
      const onDismiss = (): void => dismiss(key)

      const extra = <button type="button" onClick={onDismiss}>Dismiss</button>

      return (
        <>
          {contextHolder}
          <button
            type="button"
            onClick={() => loading({ key, message, extra })}
          >
            {'Open'}
          </button>
        </>
      )
    }

    render(<Example />)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    expect(await screen.findByRole('img', { name: 'loading' })).toBeVisible()
    expect(screen.getByText(message)).toBeVisible()

    act(() => fireEvent.click(screen.getByRole('button', { name: 'Dismiss' })))

    expect(screen.queryByText(message)).not.toBeInTheDocument()
  })

  test('there can only be one FeedbackMessage attached to the bottom', () => {
    const message = 'This is a Feedback Message placed to the bottom of the page'
    const updatedMessage = 'This is an updated Feedback Message placed to the bottom of the page'

    const Example = (): JSX.Element => {
      const { info, contextHolder } = useFeedbackMessageWithContext()

      return (
        <>
          {contextHolder}
          <button type="button" onClick={() => info({ message, position: useFeedbackMessageWithContext.Position.Bottom })}>
            Open message
          </button>
          <button type="button" onClick={() => info({ message: updatedMessage, position: useFeedbackMessageWithContext.Position.Bottom })}>
            Open updated message
          </button>
        </>
      )
    }

    render(<Example />)

    fireEvent.click(screen.getByRole('button', { name: 'Open message' }))
    expect(screen.getByText(message)).toBeVisible()
    expect(screen.queryByText(updatedMessage)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Open updated message' }))
    expect(screen.queryByText(message)).not.toBeInTheDocument()
    expect(screen.getByText(updatedMessage)).toBeVisible()
  })

  test('propagates the React context using the contextHolder', async() => {
    jest.useRealTimers()
    type MockedContext = {
      message: string
    }

    // message: 'This is a feedback message'
    const MockedReactContext = createContext<MockedContext>({ message: '' })
    const mockedContextValue = { message: 'PROPAGATED MESSAGE' }

    const FeedbackMessageContent = (): JSX.Element => {
      const { message } = useContext(MockedReactContext)
      return <span>{message}</span>
    }

    const Example = (): JSX.Element => {
      const { info, contextHolder } = useFeedbackMessageWithContext()

      const onClick = (): void => {
        info({
          message: (
            <div>
              {'The message in the context is: '}
              <FeedbackMessageContent />
            </div>
          ),
          duration: 0,
        })
      }

      return (
        <>
          {contextHolder}
          <button type="button" onClick={onClick}>Open</button>
        </>
      )
    }

    const ProviderWrapper = ({ children }: {children: JSX.Element}): JSX.Element => {
      return (
        <MockedReactContext.Provider value={mockedContextValue}>
          {children}
        </MockedReactContext.Provider>
      )
    }

    render(<ProviderWrapper><Example /></ProviderWrapper>)

    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByText(/the message in the context is/i)
    expect(screen.getByText(mockedContextValue.message)).toBeInTheDocument()
  })
})
