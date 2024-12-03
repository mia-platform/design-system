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

import { ReactElement, useMemo } from 'react'
import { Checkbox as AntCheckbox } from 'antd'
import classnames from 'classnames'

import { BodyS } from '../Typography/BodyX/BodyS'
import { CheckboxProps } from './props'
import styles from './checkbox.module.css'

export const defaults = {
  isDisabled: false,
  isInitiallyChecked: false,
  isIndeterminate: false,
}

export const Checkbox = <T = never, >({
  label,
  description,
  isInitiallyChecked = defaults.isInitiallyChecked,
  isIndeterminate = defaults.isIndeterminate,
  isDisabled = defaults.isDisabled,
  onChange,
  onClick,
  isChecked,
  value,
  children = label,
  className: classNameProp,
}: CheckboxProps<T>): ReactElement => {
  const className = useMemo(() => classnames([
    styles.checkbox,
    classNameProp,
  ]), [classNameProp])

  return (
    <AntCheckbox
      className={className}
      defaultChecked={isInitiallyChecked}
      disabled={isDisabled}
      indeterminate={isIndeterminate}
      onChange={onChange}
      onClick={onClick}
      {...(isChecked !== undefined && { checked: isChecked })}
      {...(value !== undefined && { value })}
    >
      <div className={styles.checkboxContent}>
        {children && (
          <BodyS>{children}</BodyS>
        )}
        {description && (
          <BodyS>{description}</BodyS>
        )}
      </div>
    </AntCheckbox>
  )
}
