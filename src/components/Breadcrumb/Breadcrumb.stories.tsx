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

import { multipleItemsLoadingProps, multipleItemsProps, multipleItemsWithEllipsisProps, multipleItemsWithMenuProps, oneItemIconAndTitleProps, oneItemTitleOnlyProps, twoItemsProps } from './Breadcrumb.mocks'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: multipleItemsProps,
}

export const OneItemTitleOnly: Story = {
  args: oneItemTitleOnlyProps,
}

export const OneItemIconAndTitle: Story = {
  args: oneItemIconAndTitleProps,
}

export const TwoItems: Story = {
  args: twoItemsProps,
}

export const MultipleItemsLoading: Story = {
  args: multipleItemsLoadingProps,
}

export const MultipleItemsWithMenu: Story = {
  args: multipleItemsWithMenuProps,
}

export const MultipleItemsWithEllipsis: Story = {
  args: multipleItemsWithEllipsisProps,
}