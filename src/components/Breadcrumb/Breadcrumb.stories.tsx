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
import { cloneDeep, set } from 'lodash-es'
import { useCallback, useMemo, useState } from 'react'
import { action } from '@storybook/addon-actions'

import { collapsedProps, controlledProps, loadingProps, uncontrolledProps, withMenuProps, withoutMenuProps } from './Breadcrumb.mocks'
import { Breadcrumb } from './Breadcrumb'
import { BreadcrumbItemMenu } from './Breadcrumb.types'

const meta = {
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const WithoutMenu: Story = {
  args: withoutMenuProps,
}

export const WithMenu: Story = {
  args: withMenuProps,
}

export const Uncontrolled: Story = {
  args: uncontrolledProps,
  decorators: [
    (_, { args }) => {
      const [activeKey, setActiveKey] = useState<string | undefined>()

      const onSubItemClick = useCallback<Exclude<BreadcrumbItemMenu['onClick'], undefined>>((key, event) => {
        action('click')(key, event)
        setActiveKey(key)
      }, [])

      const items = useMemo(() => {
        let nextItems = cloneDeep(args.items!)

        nextItems = set(nextItems, [0, 'menu', 'activeKey'], activeKey)
        nextItems = set(nextItems, [0, 'menu', 'onClick'], onSubItemClick)

        return nextItems
      }, [activeKey, args, onSubItemClick])

      return <Breadcrumb {...args} items={items} />
    },
  ],
}

export const Controlled: Story = {
  args: controlledProps,
}

export const Loading: Story = {
  args: loadingProps,
}

export const Collapsed: Story = {
  args: collapsedProps,
  decorators: [
    (_, { args }) => {
      return (
        <div style={{ width: 500, border: '1px dashed #029CFD', overflow: 'hidden' }}>
          <Breadcrumb {...args} />
        </div>
      )
    },
  ],
}
