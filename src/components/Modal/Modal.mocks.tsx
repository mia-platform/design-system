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

import { ReactElement } from 'react'
import { action } from '@storybook/addon-actions'

import { columns, data, rowKey } from '../Table/Table.mocks'
import { Button } from '../Button'
import { Modal } from '.'
import { ModalProps } from './Modal.props'
import { Table } from '../Table'
import { useModal } from '../../hooks/useModal'

export const children = (
  <>
    {'Modal Content'}
    <Table
      columns={columns}
      data={data.slice(0, 2)}
      rowKey={rowKey}
    />
  </>
)

export const childrenFullWidth = (
  <div
    style={{
      backgroundColor: '#1e1e1e',
      color: '#ce9178',
      fontFamily: 'monospace',
      height: '100%',
      padding: 24,
    }}
  >
    Code Block
  </div>
)

export const childrenLong = (
  <>
    <Table
      columns={columns}
      data={data}
      rowKey={rowKey}
    />
    {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel dolor ac sem congue ornare rhoncus quis tortor.
Vivamus hendrerit sed nisl eget gravida. Nunc dolor elit, condimentum non ante vitae, ullamcorper dignissim dolor.
Quisque ornare interdum massa blandit accumsan. Morbi viverra, urna ut consequat maximus, risus eros molestie augue, at posuere lacus nunc id ex.
Aenean et ante augue. Donec vitae pretium tellus, mattis placerat nisl. Phasellus dolor urna, porttitor a tempus at, scelerisque id nisi.
In ac libero quis neque tempor iaculis sit amet non sapien. Aenean quis neque varius, efficitur erat et, faucibus tortor.
Etiam at mi lacinia, gravida diam ac, sodales elit. Maecenas vitae rutrum nisl.
Nunc pellentesque, arcu vitae bibendum rutrum, mi sapien aliquam ipsum, sit amet mollis quam orci quis est.
Curabitur sagittis mauris volutpat lorem elementum, nec porttitor eros commodo. Suspendisse lorem orci, commodo mollis quam eget, facilisis tincidunt mauris.
Ut in feugiat nunc, in eleifend ex.`}
  </>
)

export const asideFixed = {
  children: <div>Modal Aside Content</div>,
  isFixed: true,
  title: 'Modal Aside Title',
}

export const asideOpenable = {
  children: <div>Modal Aside Content</div>,
  labelClose: 'Close',
  labelOpen: 'Open',
  title: 'Modal Aside Title',
}

export const footer = {
  buttons: [
    <Button key={'ok'} onClick={action('ok')}>{'OK'}</Button>,
    <Button
      hierarchy={Button.Hierarchy.Neutral}
      key={'cancel'}
      type={Button.Type.Outlined}
      onClick={action('cancel')}
    >
      {'Cancel'}
    </Button>,
  ],
}

export const footerCustom = {
  buttons: [
    <Button key={'1'} onClick={action('button 1')}>
      Button 1
    </Button>,
    <Button
      hierarchy={Button.Hierarchy.Neutral}
      key={'2'}
      type={Button.Type.Outlined}
      onClick={action('button 2')}
    >
      Button 2
    </Button>,
    <Button
      hierarchy={Button.Hierarchy.Neutral}
      key={'3'}
      type={Button.Type.Outlined}
      onClick={action('button 3')}
    >
      Button 3
    </Button>,
    <Button
      hierarchy={Button.Hierarchy.Neutral}
      key={'4'}
      type={Button.Type.Outlined}
      onClick={action('button 4')}
    >
      Button 4
    </Button>,
  ],
  extra: 'Footer Extra',
}

export const footerLoading = {
  buttons: [
    <Button isLoading key={'ok'}>{'OK'}</Button>,
    <Button
      hierarchy={Button.Hierarchy.Neutral}
      isDisabled
      key={'cancel'}
      type={Button.Type.Outlined}
    >
      {'Cancel'}
    </Button>,
  ],
}

export const docLink = 'https://mia-platform.eu'
export const title = 'Modal Title'

export const WithOpenButton = (props: ModalProps): ReactElement => {
  const { isModalVisible, openModal, closeModal } = useModal()
  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        {...props}
        isVisible={isModalVisible}
        onCloseClick={closeModal}
      />
    </>
  )
}
