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

import { Radio as AntRadio } from 'antd'
import { ReactElement } from 'react'

import { BodyS } from '../../../Typography/BodyX/BodyS'
import { RadioProps } from './index.props'
import styles from './index.module.css'

const { radio, radioContent } = styles

export const Radio = <T, >({
  label,
  description,
  idDisabled: disabled,
  value,
}: RadioProps<T>): ReactElement => {
  return (
    <div className={radio}>
      <AntRadio disabled={disabled} value={value}>
        <div className={radioContent}>
          <BodyS>{label}</BodyS>
          {description && (
            <BodyS>{description}</BodyS>
          )}
        </div>
      </AntRadio>
    </div>
  )
}
