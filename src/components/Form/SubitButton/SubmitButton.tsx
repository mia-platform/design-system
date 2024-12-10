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

import { ReactElement, ReactNode, useCallback } from 'react'
import { FormInstance } from 'antd'

import { Button } from '../../Button'
import { ButtonProps } from '../../Button/Button.props.ts'
import { FormItem } from '../FormItem/FormItem.tsx'
import { RenderProps } from '../props.ts'

export type SubmitButtonProps = Omit<ButtonProps, 'children'> & {
  children?: ReactNode | ((props: RenderProps) => ReactNode)
}

const defaultSubmitButton = (
  label: ReactNode = 'Submit',
  props: ButtonProps = {}
): ReactNode => {
  return (
    <Button htmlType={Button.HTMLType.Submit} {...props}>
      {label}
    </Button>
  )
}

export const SubmitButton = (
  {
    children,
    ...props
  }: SubmitButtonProps
): ReactElement => {
  const renderSubmitButton = useCallback(({ form }: { form?: FormInstance }) => {
    if (typeof children === 'function') {
      return children({ form })
    }
    if (typeof children === 'boolean') {
      return children && defaultSubmitButton()
    }
    return defaultSubmitButton(children, props)
  }, [children, props])

  return (
    <FormItem isFullWidth justify="end" shouldUpdate>
      {renderSubmitButton}
    </FormItem>
  )
}
