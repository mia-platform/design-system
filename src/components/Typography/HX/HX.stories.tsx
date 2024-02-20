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

import { customCopyable, customEllipsis, displayAll, fontUrl, loremIpsum } from '../Typography.mocks'
import { HX } from './HX'
import { Typography } from '..'

const h1LongText = ['H1', loremIpsum].join(' | ')
const h2LongText = ['H2', loremIpsum].join(' | ')
const h3LongText = ['H3', loremIpsum].join(' | ')
const h4LongText = ['H4', loremIpsum].join(' | ')

const h1EllipsisWithTooltip = { rows: 2, tooltip: h1LongText }
const h2EllipsisWithTooltip = { rows: 2, tooltip: h2LongText }
const h3EllipsisWithTooltip = { rows: 2, tooltip: h3LongText }
const h4EllipsisWithTooltip = { rows: 2, tooltip: h4LongText }

const meta = {
  title: 'Components/Typography/HX',
  component: HX,
  parameters: {
    design: { type: 'iframe', name: 'Font Definition', url: fontUrl },
  },
  args: {
    ...HX.defaultProps,
    children: 'Text',
  },
  argTypes: {
    copyable: { control: 'boolean' },
    ellipsis: { control: 'boolean' },
    level: { table: { disable: true } },
  },
} satisfies Meta<typeof HX>

export default meta
type Story = StoryObj<typeof meta>

export const HXComponent: Story = {
  args: { ...meta.args, level: 1, role: 'h1' },
  argTypes: {
    level: { control: { type: 'number', min: 1, max: 4 }, table: { disable: false } },
  },
}

export const All = {
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <div style={displayAll}>
      <Typography.H1 {...args}>{'H1'}</Typography.H1>
      <Typography.H2 {...args}>{'H2'}</Typography.H2>
      <Typography.H3 {...args}>{'H3'}</Typography.H3>
      <Typography.H4 {...args}>{'H4'}</Typography.H4>
    </div>
  ),
}

export const H1 = {
  render: (args: object) => <Typography.H1 {...args} />,
}

export const H2 = {
  render: (args: object) => <Typography.H2 {...args} />,
}

export const H3 = {
  render: (args: object) => <Typography.H3 {...args} />,
}

export const H4 = {
  render: (args: object) => <Typography.H4 {...args} />,
}

export const WithEllipsisWithTooltip = {
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <div style={displayAll}>
      <Typography.H1 {...args} ellipsis={h1EllipsisWithTooltip}>{h1LongText}</Typography.H1>
      <Typography.H2 {...args} ellipsis={h2EllipsisWithTooltip}>{h2LongText}</Typography.H2>
      <Typography.H3 {...args} ellipsis={h3EllipsisWithTooltip}>{h3LongText}</Typography.H3>
      <Typography.H4 {...args} ellipsis={h4EllipsisWithTooltip}>{h4LongText}</Typography.H4>
    </div>
  ),
}

export const WithEllipsisCustom = {
  args: { ...meta.args, ellipsis: customEllipsis },
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <div style={displayAll}>
      <Typography.H1 {...args}>{h1LongText}</Typography.H1>
      <Typography.H2 {...args}>{h2LongText}</Typography.H2>
      <Typography.H3 {...args}>{h3LongText}</Typography.H3>
      <Typography.H4 {...args}>{h4LongText}</Typography.H4>
    </div>
  ),
}

export const Copyable = {
  args: { ...meta.args, copyable: true },
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <div style={displayAll}>
      <Typography.H1 {...args}>{'H1'}</Typography.H1>
      <Typography.H2 {...args}>{'H2'}</Typography.H2>
      <Typography.H3 {...args}>{'H3'}</Typography.H3>
      <Typography.H4 {...args}>{'H4'}</Typography.H4>
    </div>
  ),
}

export const CopyableCustom = {
  args: { ...meta.args, copyable: customCopyable },
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <div style={displayAll}>
      <Typography.H1 {...args}>{'H1'}</Typography.H1>
      <Typography.H2 {...args}>{'H2'}</Typography.H2>
      <Typography.H3 {...args}>{'H3'}</Typography.H3>
      <Typography.H4 {...args}>{'H4'}</Typography.H4>
    </div>
  ),
}
