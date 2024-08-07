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
import { useMemo, useState } from 'react'

import { DrawerLipsum, DrawerLipsumTitle, drawerLipsumFooter } from './Drawer.mocks'
import { Button } from '../Button'
import { Drawer } from '.'

const defaults = {
  title: <DrawerLipsumTitle />,
}

const meta = {
  component: Drawer,
  args: defaults,
  argTypes: {
    children: { control: false },
    isVisible: { control: false },
  },
  decorators: [
    (Story, context) => {
      const [isVisible, setIsVisible] = useState(false)

      const customContext = useMemo(() => ({
        ...context,
        args: {
          ...context.args,
          isVisible,
          onClose: () => setIsVisible(false),
        },
      }), [context, isVisible])

      return <div>
        <Button
          onClick={() => setIsVisible(true)}
        >
          Open drawer
        </Button>
        <Story {...customContext} />
      </div>
    },
  ],
  render: (_, { args }) => <Drawer {...args}>
    <DrawerLipsum />
  </Drawer>,
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const BasicExample: Story = {}

export const WithDocLink: Story = {
  args: {
    ...meta.args,
    docLink: 'https://www.google.com/',
  },
}

export const WithStandardFooterProps: Story = {
  args: {
    ...meta.args,
    footer: drawerLipsumFooter,
  },
}

export const WithCustomFooter: Story = {
  args: {
    ...meta.args,
    footer: <div>{'Custom footer content'}</div>,
  },
}
