import { ReactElement, ReactNode, useCallback } from 'react'
import { FormInstance } from 'antd'

import { Button } from '../Button'
import { FormItem } from './FormItem.tsx'

export type SubmitButtonProps = {
  children?: ReactNode | ((form: FormInstance) => ReactNode)
}

const defaultSubmitButton = (label: ReactNode = 'Submit'): ReactNode => {
  return (
    <Button htmlType={Button.HTMLType.Submit}>
      {label}
    </Button>
  )
}

export const SubmitButton = (
  {
    children,
  }: SubmitButtonProps
): ReactElement => {
  const renderSubmitButton = useCallback(({ form }: { form: FormInstance }) => {
    if (typeof children === 'function') {
      return children(form)
    }
    if (typeof children === 'boolean') {
      return children && defaultSubmitButton()
    }
    return defaultSubmitButton(children)
  }, [children])

  return (
    <FormItem isFullWidth justify="end">
      {renderSubmitButton}
    </FormItem>
  )
}
