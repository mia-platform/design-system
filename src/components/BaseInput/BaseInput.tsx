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

import { ComponentType, ReactElement, ReactNode, useMemo } from 'react'
import { InputProps as AntInputProps } from 'antd'
import classnames from 'classnames'

import { Appearance } from './types.ts'
import { BaseInputProps } from './props.ts'
import styles from './baseInput.module.css'

export const defaults = {
  type: Appearance.Outlined,
  isFullWidth: true,
}

type CommonAntInputProps =
  {
    disabled?: boolean
    className?: string
    placeholder?: ReactNode | string
    status?: AntInputProps['status']
    variant?: AntInputProps['variant']
  }

export const BaseInput = <
  ComponentProps extends CommonAntInputProps = CommonAntInputProps,
>({
    component: Component,
    className: classNameProp,
    appearance,
    isDisabled,
    isReadOnly,
    isFullWidth,
    isError,
    inputRef,
    placeholder,
    ...other
  }: BaseInputProps
  & Omit<ComponentProps, keyof CommonAntInputProps>
  & { component: ComponentType<ComponentProps> }
  )
  : ReactElement => {
  const className = useMemo(() => classnames([
    styles.input,
    isFullWidth && styles.fullWidth,
    isReadOnly && styles.readonly,
    classNameProp,
  ]), [classNameProp, isFullWidth, isReadOnly])

  return (
    <Component
      className={className}
      disabled={isDisabled}
      placeholder={placeholder}
      ref={inputRef}
      status={isError ? 'error' : undefined}
      variant={appearance}
      {...other as unknown as ComponentProps}
    />
  )
}

BaseInput.Appearance = Appearance
