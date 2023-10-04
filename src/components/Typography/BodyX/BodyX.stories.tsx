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
import { BodySizes } from './BodyX.types'
import { BodyX } from './BodyX'
import { Typography } from '..'

const { S } = BodySizes

const meta = {
  title: 'Components/Typography/BodyX',
  component: BodyX,
  args: {
    ...BodyX.defaultProps,
    children: 'Text',
  },
  argTypes: {
    copyable: { control: 'boolean' },
    ellipsis: { control: 'boolean' },
    size: { table: { disable: true } },
  },
} satisfies Meta<typeof BodyX>

export default meta
type Story = StoryObj<typeof meta>

export const BodyXComponent: Story = {
  args: { ...meta.args, size: S },
  argTypes: {
    size: { table: { disable: false } },
  },
}

export const All = {
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <>
      <Typography.BodyS {...args}>{'BodyS'}</Typography.BodyS>
      <Typography.BodyS {...args} isBold>{'BodyS Bold'}</Typography.BodyS>
      <Typography.BodyM {...args}>{'BodyM'}</Typography.BodyM>
      <Typography.BodyM {...args} isBold>{'BodyM Bold'}</Typography.BodyM>
      <Typography.BodyL {...args}>{'BodyL'}</Typography.BodyL>
      <Typography.BodyL {...args} isBold>{'BodyL Bold'}</Typography.BodyL>
    </>
  ),
}

export const BodyS = {
  render: (args: object) => <Typography.BodyS {...args} />,
}

export const BodySBold = {
  render: (args: object) => <Typography.BodyS {...args} isBold />,
}

export const BodyM = {
  render: (args: object) => <Typography.BodyM {...args} />,
}

export const BodyMBold = {
  render: (args: object) => <Typography.BodyM {...args} isBold />,
}

export const BodyL = {
  render: (args: object) => <Typography.BodyL {...args} />,
}

export const BodyLBold = {
  render: (args: object) => <Typography.BodyL {...args} isBold />,
}

export const WithEllipsis = {
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args: object) => (
    <>
      <Typography.BodyS {...args}>{['BodyS', loremIpsum].join(' | ')}</Typography.BodyS>
      <Typography.BodyS {...args} isBold>{['BodyS Bold', loremIpsum].join(' | ')}</Typography.BodyS>
      <Typography.BodyM {...args}>{['BodyM', loremIpsum].join(' | ')}</Typography.BodyM>
      <Typography.BodyM {...args} isBold>{['BodyM Bold', loremIpsum].join(' | ')}</Typography.BodyM>
      <Typography.BodyL {...args}>{['BodyL', loremIpsum].join(' | ')}</Typography.BodyL>
      <Typography.BodyL {...args} isBold>{['BodyL Bold', loremIpsum].join(' | ')}</Typography.BodyL>
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
      <Typography.BodyS {...args}>{['BodyS', loremIpsum].join(' | ')}</Typography.BodyS>
      <Typography.BodyS {...args} isBold>{['BodyS Bold', loremIpsum].join(' | ')}</Typography.BodyS>
      <Typography.BodyM {...args}>{['BodyM', loremIpsum].join(' | ')}</Typography.BodyM>
      <Typography.BodyM {...args} isBold>{['BodyM Bold', loremIpsum].join(' | ')}</Typography.BodyM>
      <Typography.BodyL {...args}>{['BodyL', loremIpsum].join(' | ')}</Typography.BodyL>
      <Typography.BodyL {...args} isBold>{['BodyL Bold', loremIpsum].join(' | ')}</Typography.BodyL>
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
      <Typography.BodyS {...args}>{'BodyS'}</Typography.BodyS>
      <Typography.BodyS {...args} isBold>{'BodyS Bold'}</Typography.BodyS>
      <Typography.BodyM {...args}>{'BodyM'}</Typography.BodyM>
      <Typography.BodyM {...args} isBold>{'BodyM Bold'}</Typography.BodyM>
      <Typography.BodyL {...args}>{'BodyL'}</Typography.BodyL>
      <Typography.BodyL {...args} isBold>{'BodyL Bold'}</Typography.BodyL>
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
      <Typography.BodyS {...args}>{'BodyS'}</Typography.BodyS>
      <Typography.BodyS {...args} isBold>{'BodyS Bold'}</Typography.BodyS>
      <Typography.BodyM {...args}>{'BodyM'}</Typography.BodyM>
      <Typography.BodyM {...args} isBold>{'BodyM Bold'}</Typography.BodyM>
      <Typography.BodyL {...args}>{'BodyL'}</Typography.BodyL>
      <Typography.BodyL {...args} isBold>{'BodyL Bold'}</Typography.BodyL>
    </>
  ),
}
