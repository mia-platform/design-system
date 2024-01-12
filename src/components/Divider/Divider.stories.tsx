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

import type { Meta, StoryObj } from '@storybook/react'

import { Divider } from '.'
import { SeparateTextComponent } from './Divider.mocks'
import { TextOrientation } from './Divider.types'

const { Left } = TextOrientation

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

const mockedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.'

const singleDividerEntries = [mockedText, mockedText]
const multipleDividersEntries = [...singleDividerEntries, mockedText]

export const SimpleDivider: Story = {
  render: (args) => (
    <SeparateTextComponent
      mockedTextEntries={singleDividerEntries}
    >
      <Divider {...args} />
    </SeparateTextComponent>
  ),
}

export const DividerWithTitle: Story = {
  render: (args) => (
    <SeparateTextComponent
      mockedTextEntries={multipleDividersEntries}
    >
      <Divider
        orientation={Left}
        {...args}
      >
        {'Left title'}
      </Divider>
    </SeparateTextComponent>
  ),
}

export const DividerWithTitleAndMargin: Story = {
  render: (args) => (
    <SeparateTextComponent
      mockedTextEntries={multipleDividersEntries}
    >
      <Divider
        orientation={Left}
        orientationMargin={20}
        {...args}
      >
        {'Left title with custom margin'}
      </Divider>
    </SeparateTextComponent>
  ),
}
