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

import { multipleItemsLoadingProps, multipleItemsProps, multipleItemsWithEllipsisProps, multipleItemsWithMenuProps, oneItemIconAndTitleProps, oneItemTitleOnlyProps, twoItemsProps } from './Breadcrumb.mocks'
import { Breadcrumb } from './Breadcrumb'
import { render } from '../../test-utils'

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders a breadcrumb with one item - title only', () => {
    const { asFragment } = render(<Breadcrumb {...oneItemTitleOnlyProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a breadcrumb with one item - icon and title', () => {
    const { asFragment } = render(<Breadcrumb {...oneItemIconAndTitleProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a breadcrumb with two items', () => {
    const { asFragment } = render(<Breadcrumb {...twoItemsProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a breadcrumb with multiple items - loading', () => {
    const { asFragment } = render(<Breadcrumb {...multipleItemsLoadingProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a breadcrumb with multiple items - without menu (Default)', () => {
    const { asFragment } = render(<Breadcrumb {...multipleItemsProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a breadcrumb with multiple items - with menu', () => {
    const { asFragment } = render(<Breadcrumb {...multipleItemsWithMenuProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders a breadcrumb with multiple items - ellipsed', () => {
    const { asFragment } = render(
      <div style={{ maxWidth: '500px' }}>
        <Breadcrumb {...multipleItemsWithEllipsisProps} />
      </div>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
