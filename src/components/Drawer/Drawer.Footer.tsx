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

import React, { ReactElement, ReactNode } from 'react'

export type DrawerFooter = {
  buttons?: ReactElement[]
  extra?: ReactNode
}

export type CustomDrawerFooter = ReactElement

export type FooterProps = {
  footer?: DrawerFooter | CustomDrawerFooter,
}

const styles = {
  footer: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    justifyContent: 'end',
    gap: '8px',
  },
  extra: {
    flex: 1,
  },
  footerButtons: {
    display: 'flex',
    'flex-direction': 'row-reverse',
    gap: '8px',
  },
}

export const Footer = ({ footer }: FooterProps): ReactElement => {
  if (React.isValidElement(footer)) {
    return <footer style={styles.footer}>{footer}</footer>
  }

  const drawerFooter = footer as DrawerFooter
  const { buttons, extra } = drawerFooter
  return <footer style={styles.footer}>
    {(buttons || extra) && <>
      <div style={styles.extra}>{extra}</div>
      <div style={styles.footerButtons}>
        {buttons}
      </div>
    </>}
  </footer>
}
