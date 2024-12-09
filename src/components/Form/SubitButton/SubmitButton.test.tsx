/**
 * Copyright 2023 Mia srl
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

import { render, screen } from '../../../test-utils.tsx'
import { BodyM } from '../../Typography/BodyX/BodyM'
import { SubmitButton } from './SubmitButton'

const exampleText = 'test'

describe('SubmitButton Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly with default props', () => {
    const { asFragment } = render(<SubmitButton />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with a custom label passed as child', () => {
    const { asFragment } = render(
      <SubmitButton>
        <BodyM>{exampleText}</BodyM>
      </SubmitButton>
    )
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByText(exampleText)).toBeInTheDocument()
  })

  test('renders correctly with a render function passed as child', () => {
    const { asFragment } = render(
      <SubmitButton>
        {() => <BodyM>{exampleText}</BodyM>}
      </SubmitButton>
    )
    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByText(exampleText)).toBeInTheDocument()
  })
})
