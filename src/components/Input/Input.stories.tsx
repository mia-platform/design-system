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
import { FiSearch } from 'react-icons/fi'

import { Input } from '.'

const meta = {
  component: Input,
  args: {
    placeholder: 'Placeholder...',
  },
  argTypes: {
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Borderless: Story = {
  args: {
    type: Input.Type.Borderless,
  },
}

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
  },
}

export const Error: Story = {
  args: {
    isError: true,
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const WithLeftIcon: Story = {
  args: {
    iconLeft: FiSearch,
  },
}

export const WithRightIcon: Story = {
  args: {
    iconRight: FiSearch,
  },
}

export const AllowClear: Story = {
  args: {
    defaultValue: 'text',
    allowClear: true,
  },
}

export const TextArea: Story = {
  args: {
    htmlType: Input.HTMLType.Textarea,
  },
}

export const Search: Story = {
  args: {
    htmlType: Input.HTMLType.Search,
  },
}

export const Password: Story = {
  args: {
    htmlType: Input.HTMLType.Number,
  },
}

export const Hidden: Story = {
  args: {
    htmlType: Input.HTMLType.Hidden,
  },
}
