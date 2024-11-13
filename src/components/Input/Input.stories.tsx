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
import { PiCircleHalfTilt } from 'react-icons/pi'

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

export const Default: Story = {
  args: {
    defaultValue: 'Default',
  },
}

export const Borderless: Story = {
  args: {
    appearance: Input.Appearance.Borderless,
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

export const WithLeftIcon: Story = {
  args: {
    iconLeft: PiCircleHalfTilt,
    defaultValue: 'With left icon',
  },
}

export const WithRightIcon: Story = {
  args: {
    iconRight: PiCircleHalfTilt,
    defaultValue: 'With right icon',
  },
}

export const AllowClear: Story = {
  args: {
    defaultValue: 'Allow clear',
    allowClear: true,
  },
}

export const Password: Story = {
  args: {
    type: Input.Type.Password,
    defaultValue: 'Password',
  },
}

export const Hidden: Story = {
  args: {
    type: Input.Type.Hidden,
    defaultValue: 'Hidden',
  },
}

export const AddonBeforeText: Story = {
  args: {
    addonBefore: {
      type: 'text',
      value: '/',
    },
  },
}

export const AddonBeforeSelect: Story = {
  args: {
    addonBefore: {
      type: 'select',
      placeholder: 'placeholder...',
      options: [
        { value: '.com' },
        { value: '.jp' },
        { value: '.cn' },
        { value: '.org' },
      ],
    },
  },
}

export const AddonBeforeCheckbox: Story = {
  args: {
    addonBefore: {
      type: 'checkbox',
      label: 'Inherited',
    },
  },
}

export const AddonAfterText: Story = {
  args: {
    addonAfter: {
      type: 'text',
      value: '/',
    },
  },
}

export const AddonAfterSelect: Story = {
  args: {
    addonAfter: {
      type: 'select',
      placeholder: 'placeholder...',
      options: [
        { value: '.com' },
        { value: '.jp' },
        { value: '.cn' },
        { value: '.org' },
      ],
    },
  },
}

export const AddonAfterCheckbox: Story = {
  args: {
    addonAfter: {
      type: 'checkbox',
      label: 'Inherited',
    },
  },
}

export const AddonTextDisabled: Story = {
  args: {
    isDisabled: true,
    addonBefore: {
      type: 'text',
      value: '/',
    },
  },
}

export const AddonSelectDisabled: Story = {
  args: {
    isDisabled: true,
    addonBefore: {
      type: 'select',
      placeholder: 'placeholder...',
      options: [
        { value: '.com' },
        { value: '.jp' },
        { value: '.cn' },
        { value: '.org' },
      ],
    },
  },
}

export const AddonCheckboxDisabled: Story = {
  args: {
    isDisabled: true,
    addonBefore: {
      type: 'checkbox',
      label: 'Inherited',
    },
  },
}

export const AddonTextError: Story = {
  args: {
    isError: true,
    addonBefore: {
      type: 'text',
      value: '/',
    },
  },
}

export const AddonSelectError: Story = {
  args: {
    isError: true,
    addonBefore: {
      type: 'select',
      placeholder: 'placeholder...',
      options: [
        { value: '.com' },
        { value: '.jp' },
        { value: '.cn' },
        { value: '.org' },
      ],
    },
  },
}

export const AddonCheckboxError: Story = {
  args: {
    isError: true,
    addonBefore: {
      type: 'checkbox',
      label: 'Inherited',
    },
  },
}

