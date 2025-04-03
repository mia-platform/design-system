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
import { FaDiamond } from 'react-icons/fa6'
import { Flex } from 'antd'
import { ReactNode } from 'react'

import { Icon } from '../Icon'
import { Select } from '.'
import { Typography } from '../Typography'

const meta = {
  component: Select,
  args: {
    placeholder: 'Placeholder...',
  },
  argTypes: {
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  ...Array(5).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
  description: 'A description',
}))

export const Default: Story = {
  args: {
    options,
    defaultValue: 'Default',
  },
}

export const Borderless: Story = {
  args: {
    options,
    appearance: Select.Appearance.Borderless,
    defaultValue: 'Borderless',
  },
}

export const ReadOnly: Story = {
  args: {
    options,
    isReadOnly: true,
    defaultValue: 'Read-only',
  },
}

export const Error: Story = {
  args: {
    options,
    isError: true,
    defaultValue: 'Error',
  },
}

export const Disabled: Story = {
  args: {
    options,
    isDisabled: true,
    defaultValue: 'Disabled',
  },
}

export const AllowClear: Story = {
  args: {
    options,
    allowClear: true,
    defaultValue: 'Allow clear',
  },
}

export const CustomLabels: Story = {
  args: {
    options: options.map(({ value }) => ({
      value,
      label: (
        <Flex align="center" gap={8}>
          <Icon component={FaDiamond} size={16} />
          <Typography.BodyM isBold>{value}</Typography.BodyM>
        </Flex>
      ),
    })),
    defaultValue: 'Custom labels',
  },
}

export const Multiple: Story = {
  args: {
    options,
    isMultiple: true,
    defaultValue: 'Multiple',
  },
}

export const MultipleWithMaxTagCount: Story = {
  args: {
    options,
    isMultiple: true,
    defaultValue: [options[0].value, options[1].value, options[2].value, options[3].value],
    maxTagCount: 2,
    maxTagPlaceholder: (omittedValues) => {
      return <span>{`${omittedValues.length}+...`}</span>
    },
  },
}

export const MultipleDefaultValue: Story = {
  args: {
    defaultValue: [options[0].value, options[1].value],
    options,
    isMultiple: true,
  },
}

export const MultipleDisabled: Story = {
  args: {
    defaultValue: [options[0].value, options[1].value],
    options,
    isMultiple: true,
    isDisabled: true,
  },
}

export const CustomOptionRenderInDropdown: Story = {
  args: {
    defaultValue: options[0].value,
    options,
    optionRender: (option: {value?: ReactNode, description?: string}) => {
      return (
        <Flex align="center" gap={8}>
          <Icon component={FaDiamond} size={16} />
          <Typography.BodyM isBold>{option.value}</Typography.BodyM>
        </Flex>
      )
    },
  },
}
