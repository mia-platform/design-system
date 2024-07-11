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
import { isEmpty } from 'lodash-es'

import { CustomDrawerFooter, DrawerFooter, FooterProps } from './Drawer.types'
import styles from './Drawer.module.css'

function isDrawerFooter(obj: DrawerFooter | CustomDrawerFooter): obj is DrawerFooter {
  return (
    obj
    && ('buttons' in obj || 'extra' in obj)
  )
}

export const Footer = ({ footer }: FooterProps): ReactElement | null => {
  if (!footer || isEmpty(footer)) {
    return null
  }

  if (isDrawerFooter(footer)) {
    const { buttons, extra } = footer
    return <footer className={styles.footer}>
      {(buttons || extra) && <>
        <div className={styles.extra}>{extra}</div>
        <div className={styles.footerButtons}>
          {buttons}
        </div>
      </>}
    </footer>
  }

  return footer
}

