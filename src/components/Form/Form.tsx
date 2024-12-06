import { ReactElement, useMemo } from 'react'
import { Form as AntForm } from 'antd'

import * as Validators from './Validators'
import { FormProps } from './props.ts'
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
  gap = defaults.gap,
  id,
  initialValues,
  preserve,
  onValuesChange,
  onFinish,
  onFinishFailed,
}: FormProps<Values>): ReactElement => {
  const style = useMemo(() => ({
    display: 'grid',
    gridTemplate: `auto / repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    ...styleProp,
  }), [columns, gap, styleProp])

  return (
    <AntForm<Values>
      id={id}
      initialValues={initialValues}
      layout={layout}
      preserve={preserve}
      style={style}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
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
Form.SubmitButton = SubmitButton
Form.Validators = Validators
