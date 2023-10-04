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

import { customCopyable, customEllipsis, loremIpsum } from '../Typography.mocks'
import { HX } from './HX'
import { Typography } from '..'

const meta = {
  title: 'Components/Typography/HX',
  component: HX,
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
  args: { ...meta.args, level: 1 },
  argTypes: {
    level: { control: 'number', table: { disable: false } },
  },
}

export const All = {
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <>
      <Typography.H1 {...args}>{'H1'}</Typography.H1>
      <Typography.H2 {...args}>{'H2'}</Typography.H2>
      <Typography.H3 {...args}>{'H3'}</Typography.H3>
      <Typography.H4 {...args}>{'H4'}</Typography.H4>
    </>
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

export const WithEllipsis = {
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <>
      <Typography.H1 {...args}>{['H1', loremIpsum].join(' | ')}</Typography.H1>
      <Typography.H2 {...args}>{['H2', loremIpsum].join(' | ')}</Typography.H2>
      <Typography.H3 {...args}>{['H3', loremIpsum].join(' | ')}</Typography.H3>
      <Typography.H4 {...args}>{['H4', loremIpsum].join(' | ')}</Typography.H4>
    </>
  ),
}

export const WithEllipsisCustom = {
  args: { ...meta.args, ellipsis: customEllipsis },
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <>
      <Typography.H1 {...args}>{['H1', loremIpsum].join(' | ')}</Typography.H1>
      <Typography.H2 {...args}>{['H2', loremIpsum].join(' | ')}</Typography.H2>
      <Typography.H3 {...args}>{['H3', loremIpsum].join(' | ')}</Typography.H3>
      <Typography.H4 {...args}>{['H4', loremIpsum].join(' | ')}</Typography.H4>
    </>
  ),
}

export const Copyable = {
  args: { ...meta.args, copyable: true },
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <>
      <Typography.H1 {...args}>{'H1'}</Typography.H1>
      <Typography.H2 {...args}>{'H2'}</Typography.H2>
      <Typography.H3 {...args}>{'H3'}</Typography.H3>
      <Typography.H4 {...args}>{'H4'}</Typography.H4>
    </>
  ),
}

export const CopyableCustom = {
  args: { ...meta.args, copyable: customCopyable },
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <>
      <Typography.H1 {...args}>{'H1'}</Typography.H1>
      <Typography.H2 {...args}>{'H2'}</Typography.H2>
      <Typography.H3 {...args}>{'H3'}</Typography.H3>
      <Typography.H4 {...args}>{'H4'}</Typography.H4>
    </>
  ),
}
