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

import { Drawer as AntdDrawer } from 'antd'
import { ReactElement } from 'react'

import { DrawerProps } from './Drawer.props'
import { Footer } from './Drawer.Footer'
import { Icon } from '../Icon'
import { Title } from './Drawer.Title'
import styles from './Drawer.module.css'

const DRAWER_WIDTH = 512
const closeIcon = <Icon color="currentColor" name="PiX" size={16} />

export const Drawer = ({
  children,
  destroyOnClose,
  footer,
  id,
  isVisible,
  key,
  onClose,
  title,
}: DrawerProps): ReactElement => {
  return (
    <AntdDrawer
      className={styles.drawer}
      closeIcon={closeIcon}
      destroyOnClose={destroyOnClose}
      footer={footer && <Drawer.Footer footer={footer} />}
      id={id}
      key={key}
      open={isVisible}
      title={<Drawer.Title title={title} />}
      width={DRAWER_WIDTH}
      onClose={onClose}
    >
      {children}
    </AntdDrawer>
  )
}

Drawer.Title = Title
Drawer.Footer = Footer
