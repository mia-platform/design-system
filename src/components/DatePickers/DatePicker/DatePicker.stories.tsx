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
import dayjs, { Dayjs } from 'dayjs'

import { DatePicker } from './DatePicker'
import { DisabledTimes } from '../types'

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

export const WithHour: Story = {
  args: { showTime: { showHour: true } },
}

export const WithSeconds: Story = {
  args: { showTime: { showHour: true, showMinute: true, showSecond: true }, format: 'DD/MM/YYYY HH:mm:ss' },
}

export const WithDefaultTime: Story = {
  args: { showTime: { defaultOpenValue: dayjs() } },
}

const hours = Array.from(Array(24).keys())
const minutes = Array.from(Array(60).keys())

const disabledTimeFn = (date: Dayjs): DisabledTimes => ({
  disabledHours: () => {
    if (date.isAfter(dayjs(), 'day')) {
      return hours.slice()
    }
    if (date.isBefore(dayjs(), 'day')) {
      return []
    }
    return hours.filter(hour => hour > dayjs().hour())
  },
  disabledMinutes: (hour) => {
    if (hour === null || hour === undefined) {
      return minutes.slice()
    }
    if (date.isAfter(dayjs(), 'day')) {
      return minutes.slice()
    }
    if (date.isBefore(dayjs(), 'day')) {
      return []
    }
    if (hour < dayjs().hour()) {
      return []
    }
    if (hour > dayjs().hour()) {
      return minutes.slice()
    }
    return minutes.filter(minute => minute > dayjs().minute())
  },
})

export const WithDisabledTime: Story = {
  args: { showTime: {
    disabledTime: disabledTimeFn,
  } },
}

export const WithMaxDateDefaultTimeAndDisabledTime: Story = {
  args: {
    maxDate: dayjs(),
    showTime: {
      defaultOpenValue: dayjs(),
      disabledTime: disabledTimeFn,
    },
  },
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

