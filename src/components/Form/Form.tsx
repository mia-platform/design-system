import { Form as AntForm, FormProps as AntFormProps } from 'antd'
import { ReactElement } from 'react'

export const Form = (props: AntFormProps): ReactElement => {
  return (
    <AntForm {...props} />
  )
}
