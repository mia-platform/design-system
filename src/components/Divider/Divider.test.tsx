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

import { ReactElement, ReactNode } from 'react'

import { Divider } from '.'
import { Type } from './Divider.types'
import { render } from '../../test-utils'

const { Vertical } = Type

type SplitTextComponentProps = {
  children: ReactNode
}

const SplitTextComponent = ({ children }: SplitTextComponentProps): ReactElement => (
  <>
    <span>{'Text mocked 1'}</span>
    {children}
    <span>{'Text mocked 2'}</span>
  </>
)

// FIXME: These tests has no value, because the divider feature are expressed using the antd class
// and RTL does not test the style rules
describe('Divider Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders horizontal without title correctly', () => {
    const { asFragment } = render(
      <SplitTextComponent>
        <Divider />
      </SplitTextComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders horizontal with title correctly', () => {
    const { asFragment } = render(
      <SplitTextComponent>
        <Divider>{'Some text'}</Divider>
      </SplitTextComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders vertical correctly', () => {
    const { asFragment } = render(
      <SplitTextComponent>
        <Divider type={Vertical} />
      </SplitTextComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
