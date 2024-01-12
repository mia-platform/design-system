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

import { TextOrientation, Type } from './Divider.types'
import { Divider } from '.'

const meta = {
  args: {
    text: 'Customize me!',
  },
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
  },
  component: Divider,
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const DividerExamples: Story = {
  render: (args) => (
    <>
      <span>{'You can customize divider below'}</span>
      <Divider {...args} />
      <span>{'With title on the left'}</span>
      <Divider orientation={TextOrientation.Left} text="Left text" />
      <span>{'With title on the center'}</span>
      <Divider orientation={TextOrientation.Center} text="Text" />
      <span>{'With title on the right'}</span>
      <Divider orientation={TextOrientation.Right} text="Right text" />
      <span>{'Vertical'}</span>
      <Divider orientation={TextOrientation.Right} type={Type.Vertical} />
      <span>{'Divider'}</span>
    </>
  ),
}
