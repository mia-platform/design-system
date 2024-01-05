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

import { Hierarchy, Shape, Type } from '../Button/Button.types'
import { columns, data, rowKey } from '../Table/Table.mocks'
import { Button } from '../Button'
import { Card } from '.'
import { Icon } from '../Icon'
import { Table } from '../Table'

const { Danger } = Hierarchy
const { Circle } = Shape
const { Outlined } = Type

const actionIcon = <Icon color="#b91200" name="PiTrash" size={16} />
const actionButton = (
  <Button
    hierarchy={Danger}
    icon={actionIcon}
    shape={Circle}
    type={Outlined}
  />
)

const meta = {
  component: Card,
  args: {
    ...Card.defaultProps,
    children: 'Card Content',
    docLink: 'https://mia-platform.eu',
    extra: <Button>{'Button'}</Button>,
    subtitle: 'Card Subtitle',
    title: 'Card Title',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...meta.args,
  },
}

export const Title: Story = {
  args: {
    children: undefined,
    docLink: undefined,
    extra: undefined,
    subtitle: undefined,
  },
}

export const TitleWithDocLink: Story = {
  args: {
    children: undefined,
    extra: undefined,
    subtitle: undefined,
  },
}

export const HeaderWithSubtitle: Story = {
  args: {
    children: undefined,
    extra: undefined,
  },
}

export const HeaderWithAction: Story = {
  args: {
    children: undefined,
    subtitle: undefined,
  },
}

export const TextContent: Story = {
  args: {
    extra: undefined,
    subtitle: undefined,
    title: undefined,
  },
}

export const ActionContent: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {'Card Content'}
        {actionButton}
      </div>
    ),
    extra: undefined,
    subtitle: undefined,
    title: undefined,
  },
}

export const TableContent: Story = {
  args: {
    children: <Table columns={columns} data={data} rowKey={rowKey} />,
    extra: undefined,
    subtitle: undefined,
    title: undefined,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
