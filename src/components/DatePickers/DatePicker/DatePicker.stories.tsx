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
import dayjs from 'dayjs'

import { DatePicker } from './DatePicker'

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
}

export const WithoutTodayButton: Story = {
  args: { showNow: false },
}

export const WithTime: Story = {
  args: { showTime: true },
}

export const WithoutNowButton: Story = {
  args: { showTime: true, showNow: false },
}

export const CustomPlaceholder: Story = {
  args: { placeholder: 'Custom placeholder' },
}

export const DefaultValue: Story = {
  args: { defaultValue: dayjs() },
}

export const CustomFormat: Story = {
  args: { defaultValue: dayjs(), format: 'YYYY-MM-DD' },
}

export const Disabled: Story = {
  args: { isDisabled: true, defaultValue: dayjs() },
}

export const MinMaxDates: Story = {
  args: { minDate: dayjs().subtract(2, 'day'), maxDate: dayjs().add(2, 'day') },
}

export const ErrorStatus: Story = {
  args: { isErrorStatus: true },
}

