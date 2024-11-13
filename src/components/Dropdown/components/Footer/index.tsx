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

import { DropdownFooter, FooterAction } from '../../Dropdown.props'
import { Button } from '../../../Button'
import styles from './index.module.css'

export type FooterProps = {
  footer?: DropdownFooter
}

export type UseFooterActionsOptions = {
  footer?: DropdownFooter,
  hook: () => void,
}

export const useFooterWithHookedActions = ({
  footer,
  hook,
}: UseFooterActionsOptions): DropdownFooter|undefined => {
  if (!footer) {
    return
  }

  const hookedActions = footer.actions?.map((action: FooterAction) => {
    return {
      ...action,
      onClick: () => {
        hook()
        action?.onClick()
      },
    }
  })
  return {
    ...footer,
    actions: hookedActions,
  }
}

export const Footer = ({ footer }: FooterProps): ReactElement|null => {
  if (!footer || isEmpty(footer)) {
    return null
  }

  return (
    <div className={styles.footerWrapper} data-testid="dropdown-footer-wrapper">
      {footer.top && <div className={styles.footerLabel}>{footer.top}</div>}
      {
        footer.actions?.map(({ icon, label, onClick }, i) => (
          <Button
            hierarchy={Button.Hierarchy.Primary}
            icon={icon}
            isBlock
            // We have no other information to build a key from.
            // eslint-disable-next-line react/no-array-index-key
            key={`dropdown-footer-button-${i}`}
            type={Button.Type.Outlined}
            onClick={onClick}
          >
            {label}
          </Button>
        ))
      }
      {footer.bottom && <div className={styles.footerLabel}>{footer.bottom}</div>}
    </div>
  )
}
