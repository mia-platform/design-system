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

import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Hierarchies, OptionsAlignments } from './SegmentedControl.types'
import { labeledOptions, stringOptions } from './SegmentedControl.mocks'
import { SegmentedControl } from '.'

const meta = {
  component: SegmentedControl,
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    defaultValue: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    ...SegmentedControl.defaultProps,
    onChange: action('onChange'),
    options: labeledOptions,
  },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const LabeledOptions: Story = {
  args: { ...meta.args },
}

export const StringOptions: Story = {
  args: { ...meta.args, options: stringOptions },
}

export const Primary: Story = {
  args: { ...meta.args, hierarchy: Hierarchies.Primary },
}

export const Vertical: Story = {
  args: { ...meta.args, optionsAlignment: OptionsAlignments.Vertical },
}

export const Disabled: Story = {
  args: { ...meta.args, isDisabled: true },
}

export const DefaultValue: Story = {
  args: { ...meta.args, defaultValue: 'five' },
}

export const MultiLine: Story = {
  args: { ...meta.args },
  decorators: [Story => (
    <div style={{ width: '40%' }}>
      <Story />
    </div>
  )],
}

export const MultiLineVertical: Story = {
  args: { ...meta.args, optionsAlignment: OptionsAlignments.Vertical },
  decorators: [Story => (
    <div style={{ width: '40%' }}>
      <Story />
    </div>
  )],
}
