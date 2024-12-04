import { Form as AntForm, FormItemProps as AntFormItemProps, FormInstance } from 'antd'
import { CSSProperties, ReactElement, ReactNode, isValidElement, useMemo } from 'react'

import { Checkbox } from '../Checkbox'
import { Input } from '../Input'
import { RadioGroup } from '../RadioGroup'
import { Switch } from '../Switch'

type RenderProps = {
  form: FormInstance,
  value: unknown;
  onChange: (value: unknown) => void
}
export type FormItemProps = {
  name?: string
  label?: string
  style?: CSSProperties
  span?: number
  isFullWidth?: boolean,
  rules?: AntFormItemProps['rules']
  valuePropName?: AntFormItemProps['valuePropName']
  getValueFromEvent?: AntFormItemProps['getValueFromEvent']
  children: ReactElement | ((props: RenderProps) => ReactNode)
}

const defaults = {
  span: 1,
  isFullWidth: false,
}

const getDefaultFormItemProps
  = ({ type }: ReactElement): Partial<FormItemProps> => {
    switch (type) {
    case Input:
      return {
        getValueFromEvent: (_, value) => value,
      }
    case Checkbox:
      return {
        valuePropName: 'isChecked',
        getValueFromEvent: ({ target }) => target.checked,
      }
    case Switch:
      return {
        valuePropName: 'isChecked',
      }
    case RadioGroup:
      return {
        getValueFromEvent: ({ value }) => value,
      }
    default:
      return {}
    }
  }

export const FormItem = (
  {
    children,
    name,
    style: styleProp,
    span = defaults.span,
    isFullWidth = defaults.isFullWidth,
    label = name,
    rules,
    valuePropName,
    getValueFromEvent,
  }: FormItemProps
): ReactElement => {
  const form = AntForm.useFormInstance()

  const style = useMemo(() => ({
    ...span && { gridColumn: `span ${span}` },
    ...isFullWidth && { gridColumn: `-1 / 1` },
    ...styleProp,
  }), [isFullWidth, span, styleProp])

  const defaultFormItemProps = useMemo(() => {
    if (isValidElement(children)) {
      return getDefaultFormItemProps(children)
    }
    return {}
  }, [children])

  const inputElement = useMemo(() => {
    if (isValidElement(children)) {
      return children
    } else if (typeof children === 'function') {
      const CustomInput = children
      return (
        <CustomInput
          form={form}
          value={form.getFieldValue(name)}
          onChange={(value) => {
            form.setFieldValue(name, value)
          }}
        />
      )
    }
    return undefined
  }, [form, name, children])

  return (
    <AntForm.Item
      {...defaultFormItemProps}
      {...getValueFromEvent && { getValueFromEvent }}
      {...valuePropName && { valuePropName }}
      label={label}
      name={name}
      rules={rules}
      style={style}
    >
      {inputElement}
    </AntForm.Item>
  )
}
