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

import { render } from '@testing-library/react'

import { Radio } from './index'
import { RadioProps } from './index.props'

const baseProps: RadioProps = {
  label: 'label test',
  value: 'value test',
}

describe('Radio', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with label and value props', () => {
    const { asFragment } = render(<Radio {...baseProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label, value and description props', () => {
    const { asFragment } = render(
      <Radio {...{ ...baseProps, description: 'description test' }} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
