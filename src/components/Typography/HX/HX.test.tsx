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

import { render, screen } from 'test-utils'

import { customCopyable, customEllipsis, loremIpsum } from '../Typography.mocks'
import { Typography } from '..'

const { H1, H2, H3, H4 } = Typography

describe('HX Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders H1 correctly', () => {
    const { asFragment } = render(<H1>{'Text'}</H1>)

    const heading = screen.getByRole('h1', { name: 'Text' })
    expect(heading).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H2 correctly', () => {
    const { asFragment } = render(<H2>{'Text'}</H2>)

    const heading = screen.getByRole('h2', { name: 'Text' })
    expect(heading).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H3 correctly', () => {
    const { asFragment } = render(<H3>{'Text'}</H3>)

    const heading = screen.getByRole('h3', { name: 'Text' })
    expect(heading).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H4 correctly', () => {
    const { asFragment } = render(<H4>{'Text'}</H4>)

    const heading = screen.getByRole('h4', { name: 'Text' })
    expect(heading).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders custom ellipsis correctly', () => {
    const { asFragment } = render(<H1 ellipsis={customEllipsis}>{loremIpsum}</H1>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders copyable correctly', () => {
    const { asFragment } = render(<H1 copyable>{loremIpsum}</H1>)

    const copyButton = screen.getByRole('button', { name: 'Copy' })
    const copyImg = screen.getByRole('img', { name: 'copy' })
    expect(copyButton).toBeVisible()
    expect(copyImg).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders custom copyable correctly', () => {
    const { asFragment } = render(<H1 copyable={customCopyable}>{loremIpsum}</H1>)

    const copyButton = screen.getByRole('button', { name: 'Copy to clipboard!' })
    const copyImg = screen.getByRole('img', { name: 'FiCopy' })
    expect(copyButton).toBeVisible()
    expect(copyImg).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })
})
