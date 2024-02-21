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

import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { useEffect } from 'react'

import { WithOpenButton, asideFixed, asideOpenable, children, childrenFullWidth, childrenLong, docLink, footer, footerCustom, footerLoading, title } from './Modal.mocks'
import { Button } from '../Button'
import { Modal } from '.'
import { Size } from './Modal.types'
import { useModal } from '../../hooks/useModal'

const { Large, FullScreen } = Size
const meta = {
  component: Modal,
  args: {
    ...Modal.defaultProps,
    children,
    docLink,
    footer,
    onCloseClick: action('close'),
    title,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const SmallSize: Story = {
  args: meta.args,
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const LargeSize: Story = {
  args: {
    ...meta.args,
    children: childrenLong,
    size: Large,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const FullScreenSize: Story = {
  args: {
    ...meta.args,
    children: childrenLong,
    size: FullScreen,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const WithNoHeader: Story = {
  args: {
    ...meta.args,
    title: undefined,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const WithNoFooter: Story = {
  args: {
    ...meta.args,
    footer: undefined,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const WithCustomFooter: Story = {
  args: {
    ...meta.args,
    footer: footerCustom,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const NotClosable: Story = {
  args: {
    ...meta.args,
    isClosable: false,
    footer: footerLoading,
  },
  decorators: [(_, { args }) => {
    const { isModalVisible, openModal, closeModal } = useModal()

    useEffect(() => {
      if (isModalVisible) { setTimeout(() => closeModal(), 5000) }
    })

    return (
      <>
        <Button onClick={openModal}>Open Modal</Button>
        <Modal {...args} isVisible={isModalVisible} />
      </>
    )
  }],
}

export const WithBodyFullWidth: Story = {
  args: {
    ...meta.args,
    children: childrenFullWidth,
    isBodyFullWidth: true,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const WithLongContent: Story = {
  args: {
    ...meta.args,
    children: childrenLong,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const WithAsideFixed: Story = {
  args: {
    ...meta.args,
    aside: asideFixed,
    children: childrenLong,
    size: Large,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}

export const WithAsideOpenable: Story = {
  args: {
    ...meta.args,
    aside: asideOpenable,
    children: childrenLong,
    size: Large,
  },
  decorators: [(_, { args }) => <WithOpenButton {...args} />],
}
