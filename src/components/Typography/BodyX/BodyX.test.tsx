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

import { render, screen } from '@testing-library/react'

import { customCopyable, customEllipsis, loremIpsum } from '../Typography.mocks'
import { Typography } from '..'

const { BodyS, BodyM, BodyL } = Typography

describe('BodyX Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders BodyS correctly', () => {
    const { asFragment } = render(<BodyS>{'Text'}</BodyS>)

    const text = screen.getByRole('paragraph')
    expect(text).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders BodyM correctly', () => {
    const { asFragment } = render(<BodyM>{'Text'}</BodyM>)

    const text = screen.getByRole('paragraph')
    expect(text).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders BodyL correctly', () => {
    const { asFragment } = render(<BodyL>{'Text'}</BodyL>)

    const text = screen.getByRole('paragraph')
    expect(text).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders BodyS Bold correctly', () => {
    const { asFragment } = render(<BodyS isBold>{'Text'}</BodyS>)

    const text = screen.getByRole('paragraph')
    expect(text).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders BodyM Bold correctly', () => {
    const { asFragment } = render(<BodyM isBold>{'Text'}</BodyM>)

    const text = screen.getByRole('paragraph')
    expect(text).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders BodyL Bold correctly', () => {
    const { asFragment } = render(<BodyL isBold>{'Text'}</BodyL>)

    const text = screen.getByRole('paragraph')
    expect(text).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders custom ellipsis correctly', () => {
    const { asFragment } = render(<BodyS ellipsis={customEllipsis}>{loremIpsum}</BodyS>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders copyable correctly', () => {
    const { asFragment } = render(<BodyS copyable>{loremIpsum}</BodyS>)

    const copyButton = screen.getByRole('button', { name: 'Copy' })
    const copyImg = screen.getByRole('img', { name: 'copy' })
    expect(copyButton).toBeVisible()
    expect(copyImg).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders custom copyable correctly', () => {
    const { asFragment } = render(<BodyS copyable={customCopyable}>{loremIpsum}</BodyS>)

    const copyButton = screen.getByRole('button', { name: 'Copy to clipboard!' })
    const copyImg = screen.getByRole('img', { name: 'FiCopy' })
    expect(copyButton).toBeVisible()
    expect(copyImg).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })
})
