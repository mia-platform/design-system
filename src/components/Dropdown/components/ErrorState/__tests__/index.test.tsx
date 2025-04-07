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

import { ErrorState, ErrorStateProps } from '../'
import { RenderResult, fireEvent, render, screen } from '../../../../../test-utils'

describe('ErrorState Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders with default props', () => {
    const { asFragment } = renderErrorState()

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders with message', () => {
    const message = 'Error occurred'
    const { asFragment } = render(<ErrorState message={message} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders with retry button and calls onRetry when clicked', () => {
    const onRetry = jest.fn()
    render(<ErrorState onRetry={onRetry} />)

    const retryButton = screen.getByRole('button', { name: 'Retry' })
    expect(retryButton).toBeInTheDocument()

    fireEvent.click(retryButton)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  test('renders with message and retry button', () => {
    const message = 'Error occurred'
    const onRetry = jest.fn()
    render(<ErrorState message={message} onRetry={onRetry} />)

    expect(screen.getByText(message)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })
})

function renderErrorState(props: ErrorStateProps = {}): RenderResult {
  return render(<ErrorState {...props} />)
}
