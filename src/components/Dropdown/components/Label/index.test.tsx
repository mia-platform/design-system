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

import { DropdownItem, ItemLayout } from '../../props'
import Label, { LabelProps } from '.'
import { RenderResult, render } from '../../../../test-utils'

describe('Label', () => {
  type TestCase = {
    name: string,
    item: DropdownItem,
  }

  describe('horizontal layout', () => {
    const testCases: TestCase[] = [
      {
        name: 'label only',
        item: { id: '1', label: 'Some Label' },
      },
      {
        name: 'label only and danger',
        item: { id: '1', label: 'Some Label', danger: true },
      },
      {
        name: 'with secondaryLabel',
        item: { id: '1', label: 'Some Label', secondaryLabel: 'Secondary Label' },
      },
      {
        name: 'with danger and secondaryLabel',
        item: { id: '1', label: 'Some Label', secondaryLabel: 'Secondary Label', danger: true },
      },
    ]

    it.each(testCases)('render $name', ({ item }) => {
      const { baseElement } = renderLabel({ item, layout: ItemLayout.Horizontal })
      expect(baseElement).toMatchSnapshot()
    })
  })

  describe('vertical layout', () => {
    const testCases: TestCase[] = [
      {
        name: 'label only',
        item: { id: '1', label: 'Some Label' },
      },
      {
        name: 'label only and danger',
        item: { id: '1', label: 'Some Label', danger: true },
      },
      {
        name: 'with secondaryLabel',
        item: { id: '1', label: 'Some Label', secondaryLabel: 'Secondary Label' },
      },
      {
        name: 'with danger and secondaryLabel',
        item: { id: '1', label: 'Some Label', secondaryLabel: 'Secondary Label', danger: true },
      },
    ]

    it.each(testCases)('render $name', ({ item }) => {
      const { baseElement } = renderLabel({ item, layout: ItemLayout.Vertical })
      expect(baseElement).toMatchSnapshot()
    })
  })
})

function renderLabel(props: LabelProps): RenderResult {
  return render(<Label {...props} />)
}
