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

import { Divider } from '.'
import { SeparateTextComponent } from './Divider.mocks'
import { Type } from './Divider.types'
import { render } from '../../test-utils'

const { Vertical } = Type

describe('Divider Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders horizontal without title correctly', () => {
    const { asFragment } = render(
      <SeparateTextComponent>
        <Divider />
      </SeparateTextComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders horizontal with title correctly', () => {
    const { asFragment } = render(
      <SeparateTextComponent>
        <Divider>{'Some text'}</Divider>
      </SeparateTextComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders vertical correctly', () => {
    const { asFragment } = render(
      <SeparateTextComponent>
        <Divider type={Vertical} />
      </SeparateTextComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders with dashed line', () => {
    const { asFragment } = render(
      <SeparateTextComponent>
        <Divider isDashed />
      </SeparateTextComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders with plain text', () => {
    const { asFragment } = render(
      <SeparateTextComponent>
        <Divider isPlain />
      </SeparateTextComponent>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
