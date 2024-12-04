import { Form as AntForm, FormProps as AntFormProps, FormInstance } from 'antd'
import { PropsWithChildren, ReactElement, ReactNode, useMemo } from 'react'

import { Button } from '../Button'

type FormProps<Values> =
  PropsWithChildren<AntFormProps<Values>>
  & {
  columns?: number
  gap?: number
  submitButton?: boolean | string | ((form: FormInstance) => ReactNode)
}

const defaultSubmitButton = (label: ReactNode = 'Submit'): ReactNode => {
  return (
    <Button htmlType={Button.HTMLType.Submit}>
      {label}
    </Button>
  )
}

const renderSubmitButton = (
  form: FormInstance,
  submitButtonProp: boolean | string | ((form: FormInstance) => ReactNode)
): ReactNode => {
  switch (typeof submitButtonProp) {
  case 'boolean':
    return submitButtonProp && defaultSubmitButton()
  case 'string':
    return defaultSubmitButton(submitButtonProp)
  case 'function':
    return submitButtonProp(form)
  default:
  }
}

export const Form = <Values, >({
  children,
  style: styleProp,
  submitButton: submitButtonProp = true,
  columns = 2,
  gap = 24,
  ...props
}: FormProps<Values>): ReactElement => {
  const [form] = AntForm.useForm()

  const style = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    columnGap: `${gap}px`,
    ...styleProp,
  }), [columns, gap, styleProp])

  return (
    <AntForm<Values> form={form} style={style} {...props}>
      {children}
      {
        submitButtonProp && (
          <div style={{ margin: `${gap}px 0`, gridColumn: `-1 / 1`, justifySelf: 'end' }}>
            {renderSubmitButton(form, submitButtonProp)}
          </div>
        )
      }
    </AntForm>
  )
}
