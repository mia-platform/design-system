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

import { ReactElement, useCallback, useMemo } from 'react'
import { Form as AntForm } from 'antd'

import * as Validators from './Validators'
import { FormError, FormProps } from './props.ts'
import { FormItem } from './FormItem/FormItem.tsx'
import { Layout } from './types.ts'
import { SubmitButton } from './SubitButton/SubmitButton.tsx'

const defaults = {
  columns: 2,
  gap: 24,
  layout: Layout.Vertical,
  submitButton: true,
}

export const Form = <Values extends Record<string, unknown>, >({
  children,
  style: styleProp,
  submitButton: submitButtonProp = defaults.submitButton,
  layout = defaults.layout,
  columns = defaults.columns,
  form,
  gap = defaults.gap,
  id,
  initialValues,
  preserve,
  onValuesChange,
  onFinish,
  onFinishFailed,
}: FormProps<Values>): ReactElement => {
  const [form] = AntForm.useForm<Values>()

  const style = useMemo(() => ({
    display: 'grid',
    gridTemplate: `auto / repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    ...styleProp,
  }), [columns, gap, styleProp])

  const handleFinish = useCallback((values: Values) => {
    if (onFinish) {
      onFinish(values, form)
    }
  }, [form, onFinish])

  const handleFinishFailed = useCallback((errorInfo: FormError<Values>) => {
    if (onFinishFailed) {
      onFinishFailed(errorInfo, form)
    }
  }, [form, onFinishFailed])

  const handleValuesChange = useCallback((changedValues: unknown, values: Values) => {
    if (onValuesChange) {
      onValuesChange(changedValues, values, form)
    }
  }, [form, onValuesChange])

  return (
    <AntForm<Values>
      form={form}
      id={id}
      initialValues={initialValues}
      layout={layout}
      preserve={preserve}
      style={style}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      onValuesChange={handleValuesChange}
    >
      {children}
      {
        submitButtonProp && (
          <SubmitButton>
            {submitButtonProp}
          </SubmitButton>
        )
      }
    </AntForm>
  )
}

Form.Layout = Layout
Form.Item = FormItem
Form.SubmitButton = SubmitButton
Form.Validators = Validators
Form.useForm = AntForm.useForm
Form.useFormInstance = AntForm.useFormInstance
