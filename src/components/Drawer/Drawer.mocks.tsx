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

// This is a file containing mock components and helpers
/* eslint-disable react/no-multi-comp */
/* istanbul ignore file */

import { ReactElement } from 'react'

import { Button } from '../Button'
import { Drawer } from './Drawer'
import { DrawerProps } from './Drawer.props'
import { useDrawer } from '../../hooks/useDrawer'

export const DrawerLipsum = (): ReactElement => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <span>
        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a semper diam, nec congue lectus. Mauris pellentesque convallis augue eu ornare. Sed pulvinar velit ut congue vulputate. Etiam elementum lacus vitae felis vulputate ultricies. Vivamus eu erat orci. Proin a accumsan nunc, eget rutrum arcu. Donec efficitur justo vel porta placerat. Nunc euismod at nisi vel interdum. Morbi id pellentesque quam. Donec eleifend nisi feugiat est rutrum dapibus quis at urna. Ut vehicula hendrerit neque, vel ultrices diam dignissim id. Aliquam erat volutpat. Sed porta iaculis dolor, ac egestas mi accumsan quis. Nam justo ex, facilisis in nunc id, suscipit aliquam arcu.`}
      </span>
      <span>
        {'Nullam tempor nisi nulla, ac lacinia dolor porta in. Nam non velit enim. Nullam a orci id diam pretium sollicitudin. Nunc vitae mauris pretium, finibus orci non, varius diam. Donec sollicitudin, libero non blandit pellentesque, dolor neque elementum ante, in molestie massa ipsum sed odio. Morbi vestibulum pretium tempor. Suspendisse placerat faucibus velit, ac condimentum eros placerat sit amet. Etiam non finibus ipsum, vitae sagittis lorem. Curabitur convallis nisl sapien, quis placerat metus tempus ac. Maecenas molestie neque lorem, non ornare risus egestas ut.'}
      </span>
    </div>
  )
}

export const DrawerLipumTitle = (): ReactElement => {
  return <span>{'Drawer Lipsum'}</span>
}

export const DrawerLipsumFooter = ({ closeDrawer }: {closeDrawer: () => void}): ReactElement => {
  return (
    <div>
      <Button onClick={closeDrawer}>
        {'Close'}
      </Button>
    </div>
  )
}

export const WithOpenButton = (props: DrawerProps): ReactElement => {
  const { isVisible, openDrawer, closeDrawer } = useDrawer()
  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer
        {...props}
        footer={<DrawerLipsumFooter closeDrawer={closeDrawer} />}
        isVisible={isVisible}
        onClose={closeDrawer}
      >
        <DrawerLipsum />
      </Drawer>
    </>
  )
}
