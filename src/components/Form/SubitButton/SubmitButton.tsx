import { ReactElement, ReactNode, useCallback } from 'react'
import { FormInstance } from 'antd'

import { Button } from '../../Button'
import { ButtonProps } from '../../Button/Button.props.ts'
import { FormItem } from '../FormItem/FormItem.tsx'

export type SubmitButtonProps = Omit<ButtonProps, 'children'> & {
  children?: ReactNode | ((form: FormInstance) => ReactNode)
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
  const renderSubmitButton = useCallback(({ form }: { form: FormInstance }) => {
    if (typeof children === 'function') {
      return children(form)
    }
    if (typeof children === 'boolean') {
      return children && defaultSubmitButton()
    }
    return defaultSubmitButton(children, props)
  }, [children, props])

  return (
    <FormItem isFullWidth justify="end">
      {renderSubmitButton}
    </FormItem>
  )
}
