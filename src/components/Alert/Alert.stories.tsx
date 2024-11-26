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
import { PiStar } from 'react-icons/pi'

import { Alert } from './Alert'
import { Button } from '../Button'

const meta = {
  component: Alert,
  args: {
    title: 'Title',
    description: 'Description',
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Special: Story = {
  args: {},
}

export const Info: Story = {
  args: {
    type: Alert.Type.Info,
  },
}

export const Warning: Story = {
  args: {
    type: Alert.Type.Warning,
  },
}

export const Error: Story = {
  args: {
    type: Alert.Type.Error,
  },
}

export const Success: Story = {
  args: {
    type: Alert.Type.Success,
  },
}

export const InfoCompressed: Story = {
  args: {
    isCompressed: true,
    type: Alert.Type.Info,
  },
}

export const WarningCompressed: Story = {
  args: {
    isCompressed: true,
    type: Alert.Type.Warning,
  },
}

export const ErrorCompressed: Story = {
  args: {
    isCompressed: true,
    type: Alert.Type.Error,
  },
}

export const SuccessCompressed: Story = {
  args: {
    isCompressed: true,
    type: Alert.Type.Success,
  },
}

export const SpecialCompressed: Story = {
  args: {
    isCompressed: true,
  },
}

export const WithAction: Story = {
  args: {
    action: <Button>Action</Button>,
  },
}

export const WithCustomIcon: Story = {
  args: {
    icon: PiStar,
  },
}

export const WithCustomContent: Story = {
  args: {
    isCompressed: true,
    children: (
      <ul style={{ margin: '8px 24px' }}>
        <li>Custom content</li>
        <li>Custom content</li>
      </ul>
    ),
  },
}
