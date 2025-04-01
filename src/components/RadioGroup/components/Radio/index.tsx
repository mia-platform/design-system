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
import classNames from 'classnames'

import { BodyS } from '../../../Typography/BodyX/BodyS'
import { Hierarchy } from '../../../Typography/BodyX/BodyX.types'
import { RadioProps } from '../../props'
import styles from './index.module.css'

const { radio, radioContent } = styles

export const Radio = <T, >({
  label,
  description,
  isDisabled,
  isChecked,
  value,
  children = label,
  className: classNameProp,
  onClick,
  onChange,
}: RadioProps<T>): ReactElement => {
  const className = classNames([
    radio,
    classNameProp,
  ])

  return (
    <AntRadio
      checked={isChecked}
      className={className}
      disabled={isDisabled}
      value={value}
      onChange={onChange}
      onClick={onClick}
    >
      <div className={radioContent}>
        {children && (
          <BodyS>{children}</BodyS>
        )}
        {description && (
          <BodyS hierarchy={Hierarchy.Subtle}>{description}</BodyS>
        )}
      </div>
    </AntRadio>
  )
}
