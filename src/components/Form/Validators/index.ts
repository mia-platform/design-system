import { FormRule as AntFormRule } from 'antd'

export type FormRule = AntFormRule

export const required = (message?: string): FormRule => {
  return {
    message: message || 'The field is required',
    required: true,
  }
}

export const checkEquals = (fieldName: string, message?: string): FormRule => {
  return ({ getFieldValue }) => ({
    validator: (_, value) => {
      if (!value || getFieldValue(fieldName) === value) {
        return Promise.resolve()
      }
      return Promise.reject(
        new Error(message || `The entered value do not match the value of "${fieldName}"`))
    },
  })
}
