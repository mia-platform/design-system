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

import { Meta, StoryObj } from '@storybook/react'

import { TextArea } from '.'

const meta = {
  component: TextArea,
  args: {
    placeholder: 'Placeholder...',
  },
  argTypes: {
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'Default',
  },
}

export const Borderless: Story = {
  args: {
    appearance: TextArea.Type.Borderless,
    defaultValue: 'Borderless',
  },
}

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultValue: 'Read-only',
  },
}

export const Error: Story = {
  args: {
    isError: true,
    defaultValue: 'Error',
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: 'Disabled',
  },
}

export const WithRows: Story = {
  args: {
    rows: 10,
    defaultValue: 'With specified rows',
  },
}

export const WithAutoSize: Story = {
  args: {
    autoSize: { minRows: 3, maxRows: 5 },
    defaultValue: 'With auto-sizing rows',
  },
}
