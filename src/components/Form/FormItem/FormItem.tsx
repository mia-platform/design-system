import { ReactElement, isValidElement, useMemo } from 'react'
import { Form as AntForm } from 'antd'

import { Checkbox } from '../../Checkbox'
import { FormItemProps } from '../props.ts'
import { Input } from '../../Input'
import { RadioGroup } from '../../RadioGroup'
import { Switch } from '../../Switch'

const defaults = {
  span: 1,
  isFullWidth: false,
}

const getDefaultFormItemProps = ({ type }: ReactElement): Partial<FormItemProps> => {
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
    justify,
    isFullWidth = defaults.isFullWidth,
    label = name,
    rules,
    valuePropName,
    getValueFromEvent,
    shouldUpdate,
  }: FormItemProps
): ReactElement => {
  const form = AntForm.useFormInstance()

  const style = useMemo(() => ({
    margin: 0,
    ...justify && { justifySelf: justify },
    ...span && { gridColumn: `span ${span}` },
    ...isFullWidth && { gridColumn: `-1 / 1` },
    ...styleProp,
  }), [isFullWidth, justify, span, styleProp])

  const defaultFormItemProps = useMemo(() => {
    if (isValidElement(children)) {
      return getDefaultFormItemProps(children)
    }
    return {}
  }, [children])

  const inputElement = useMemo(() => {
    if (isValidElement(children)) {
      return children
    }
    if (typeof children === 'function') {
      if (!name) {
        return () => children({ form })
      }
      const CustomInput = children
      return (
        <CustomInput
          form={form}
          value={form?.getFieldValue(name)}
          onChange={(value) => {
            form?.setFieldValue(name, value)
          }}
        />
      )
    }
    return children
  }, [form, name, children])

  return (
    <AntForm.Item
      {...defaultFormItemProps}
      {...getValueFromEvent && { getValueFromEvent }}
      {...valuePropName && { valuePropName }}
      label={label}
      name={name}
      rules={rules}
      shouldUpdate={shouldUpdate}
      style={style}
    >
      {inputElement}
    </AntForm.Item>
  )
}
