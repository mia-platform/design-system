import { Form as AntForm, FormItemProps as AntFormItemProps } from 'antd'
import { ReactElement } from 'react'

export const FormItem = ({ name, ...props }: AntFormItemProps): ReactElement => {
  return (
    <AntForm.Item label={name} name={name} {...props} />
  )
}
