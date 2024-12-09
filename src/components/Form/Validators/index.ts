import {FormInstance, FormRule as AntFormRule} from 'antd'

export type FormRule = AntFormRule

export const required = (message?: string): FormRule => {
  return {
    message: message || 'The field is required',
    required: true,
  }
}

export const whitespace = (message?: string): FormRule => {
  return {
    message: message || 'The field should not contain white spaces',
    whitespace: true,
  }
}

export const min = (value: number, message?: string): FormRule => {
  return {
    message: message || `The field must be greater than ${value}`,
    min: value,
  }
}

export const max = (value: number, message?: string): FormRule => {
  return {
    message: message || `The field must be greater than ${value}`,
    max: value,
  }
}

export const pattern = (value: RegExp, message?: string): FormRule => {
  return {
    message: message || `The must match the pattern ${value.toString()}`,
    pattern: value,
  }
}

export const checkEquals = (fieldName: string, message?: string): (form: FormInstance) => FormRule => {
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
