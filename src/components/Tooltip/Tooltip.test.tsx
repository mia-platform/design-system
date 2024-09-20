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

import { act } from 'react'

import { RenderResult, render, screen, userEvent, waitFor } from '../../test-utils'
import { Tooltip } from './Tooltip'

const defaultProps = {
  title: 'Tooltip text',
  onOpenChange: jest.fn(),
  getPopupContainer: () => document.getElementById('popup-container') || document.body,
}

const renderTooltipWithWrapper = (props = defaultProps) : RenderResult => {
  return render(
    <div id="popup-container">
      <Tooltip {...props}>{'Tooltip trigger'}</Tooltip>
    </div>
  )
}

describe('Tooltip', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders on hover', async() => {
    const { asFragment } = renderTooltipWithWrapper()
    await act(async() => userEvent.hover(screen.getByText(/tooltip trigger/i)))
    await waitFor(() => expect(screen.getByText(/tooltip text/i)).toBeInTheDocument())

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders on click', async() => {
    const props = {
      ...defaultProps,
      trigger: Tooltip.TriggerMode.Click,
    }
    const { asFragment } = renderTooltipWithWrapper(props)

    await act(async() => userEvent.click(screen.getByText(/tooltip trigger/i)))
    await waitFor(() => expect(screen.getByText(/tooltip text/i)).toBeInTheDocument())

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with custom placement', async() => {
    const props = {
      ...defaultProps,
      placement: Tooltip.Placement.RightBottom,
    }
    const { asFragment } = renderTooltipWithWrapper(props)

    await act(async() => userEvent.hover(screen.getByText(/tooltip trigger/i)))
    await waitFor(() => expect(screen.getByText(/tooltip text/i)).toBeInTheDocument())

    expect(asFragment()).toMatchSnapshot()
  })

  it('calls onOpenChange correctly', async() => {
    renderTooltipWithWrapper()
    await act(async() => userEvent.hover(screen.getByText(/tooltip trigger/i)))
    await waitFor(() => expect(defaultProps.onOpenChange).toHaveBeenCalledTimes(1))
    await act(async() => userEvent.unhover(screen.getByText(/tooltip trigger/i)))
    await waitFor(() => expect(defaultProps.onOpenChange).toHaveBeenCalledTimes(2))
  })

  it('does not render with empty title', async() => {
    const props = {
      ...defaultProps,
      title: '',
    }

    renderTooltipWithWrapper(props)
    await act(async() => userEvent.hover(screen.getByText(/tooltip trigger/i)))
    expect(screen.queryByText(/tooltip text/i)).not.toBeInTheDocument()
    expect(defaultProps.onOpenChange).not.toHaveBeenCalled()
  })
})
