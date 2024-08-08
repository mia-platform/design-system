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

import { DropdownItem } from '../../props'
import styles from './label.module.css'

const LABEL_DIVIDER = '·'

type LabelProps = DropdownItem

const Label = ({ danger, label, secondaryLabel }: LabelProps): ReactElement => {
  const primaryLabelClassName = danger ? '' : styles.primaryLabel
  const secondaryLabelClassName = danger ? '' : styles.secondaryLabel

  return (
    <div className={styles.labelContainer}>
      <span className={primaryLabelClassName}>{label}</span>
      {
        !secondaryLabel
          ? null
          : <>
            <span className={secondaryLabelClassName}>{LABEL_DIVIDER}</span>
            <span className={secondaryLabelClassName}>{secondaryLabel}</span>
          </>
      }
    </div>
  )
}
export default Label
