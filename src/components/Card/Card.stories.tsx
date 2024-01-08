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

import { actionButton, children, docLink, extra, subtitle, title } from './Card.mocks'
import { hugeData, rowKey, scroll, scrollableColumns } from '../Table/Table.mocks'
import { Card } from '.'
import { Table } from '../Table'

const meta = {
  component: Card,
  args: Card.defaultProps,
  argTypes: {
    children: { control: false },
    extra: { control: false },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...meta.args,
    children,
    docLink,
    extra,
    subtitle,
    title,
  },
}

export const Title: Story = {
  args: { title },
}

export const TitleWithDocLink: Story = {
  args: { docLink, title },
}

export const HeaderWithSubtitle: Story = {
  args: { docLink, subtitle, title },
}

export const HeaderWithAction: Story = {
  args: { docLink, extra, title },
}

export const TextContent: Story = {
  args: { children },
}

export const ActionContent: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {children}
        {actionButton}
      </div>
    ),
  },
}

export const TableContent: Story = {
  args: {
    children: (
      <Table
        columns={scrollableColumns}
        data={hugeData}
        rowKey={rowKey}
        scroll={scroll}
      />
    ),
  },
}

export const Loading: Story = {
  args: { isLoading: true },
}
