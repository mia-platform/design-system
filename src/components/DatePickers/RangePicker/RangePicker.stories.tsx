/**
 * Copyright 2025 Mia srl
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
import dayjs from 'dayjs'

import { RangePicker } from './RangePicker'

const meta = {
  component: RangePicker,
} satisfies Meta<typeof RangePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NotAllowEmptyField: Story = {
  args: { allowEmpty: false },
}

export const WithTodayButton: Story = {
  args: { showNow: true },
}

export const WithTime: Story = {
  args: { showTime: true },
}

export const WithNowButton: Story = {
  args: { showTime: true, showNow: true },
}

export const CustomPlaceholder: Story = {
  args: { placeholder: ['Custom start', 'Custom end'] },
}

export const DefaultValue: Story = {
  args: { defaultValue: [dayjs().subtract(7, 'days'), dayjs().add(7, 'day')] },
}

export const CustomFormat: Story = {
  args: { defaultValue: [dayjs(), dayjs().add(7, 'day')], format: 'YYYY-MM-DD' },
}

export const Disabled: Story = {
  args: { isDisabled: true, defaultValue: [dayjs(), dayjs().add(7, 'day')] },
}

export const PartiallyDisabled: Story = {
  args: { isDisabled: [false, true], defaultValue: [dayjs(), dayjs().add(7, 'day')] },
}

export const MinMaxDates: Story = {
  args: { minDate: dayjs().subtract(2, 'day'), maxDate: dayjs().add(2, 'day') },
}

export const ErrorStatus: Story = {
  args: { isErrorStatus: true },
}
