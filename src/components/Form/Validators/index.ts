import { FormRule as AntRule, FormInstance } from 'antd'
import { ReactElement } from 'react'

export type RuleObject = Extract<AntRule, {message?: string | ReactElement}>
export type RuleFunction = Extract<AntRule, (form: FormInstance) => RuleObject>

/**
 * Creates a validation rule that ensures a field is required.
 *
 * @param {string} [message] - Custom error message to display if the field is empty.
 * @returns {RuleObject} A rule object.
 */
export const required = (message?: string): RuleObject => {
  return {
    message: message || 'The field is required',
    required: true,
  }
}

/**
 * Creates a validation rule that ensures a field does not contain whitespace.
 *
 * @param {string} [message] - Custom error message to display if the field contains whitespace.
 * @returns {RuleObject} A rule object.
 */
export const whitespace = (message?: string): RuleObject => {
  return {
    message: message || 'The field should not contain white spaces',
    whitespace: true,
  }
}

/**
 * Creates a validation rule that ensures a field value is greater than to a minimum value.
 *
 * @param {number} value - The minimum value allowed.
 * @param {string} [message] - Custom error message to display if the value is below the minimum.
 * @returns {RuleObject} A rule object.
 */
export const min = (value: number, message?: string): RuleObject => {
  return {
    message: message || `The field must be greater than ${value}`,
    min: value,
  }
}

/**
 * Creates a validation rule that ensures a field value is less than to a maximum value.
 *
 * @param {number} value - The maximum value allowed.
 * @param {string} [message] - Custom error message to display if the value exceeds the maximum.
 * @returns {RuleObject} A rule object.
 */
export const max = (value: number, message?: string): RuleObject => {
  return {
    message: message || `The field must be greater than ${value}`,
    max: value,
  }
}

/**
 * Creates a validation rule that ensures a field value matches a specified regular expression pattern.
 *
 * @param {RegExp} value - The regular expression to validate against.
 * @param {string} [message] - Custom error message to display if the value does not match the pattern.
 * @returns {RuleObject} A rule object .
 */
export const pattern = (value: RegExp, message?: string): RuleObject => {
  return {
    message: message || `The must match the pattern ${value.toString()}`,
    pattern: value,
  }
}

/**
 * Creates a validation rule that ensures a field value matches the value of another field.
 *
 * @param {string} fieldName - The name of the other field to compare against.
 * @param {string} [message] - Custom error message to display if the values do not match.
 * @returns {RuleObject} A rule function.
 */
export const checkEquals = (fieldName: string, message?: string): RuleFunction => {
  return ({ getFieldValue }) => ({
    validator: (_: RuleObject, value: unknown) => {
      if (!value || getFieldValue(fieldName) === value) {
        return Promise.resolve()
      }
      return Promise.reject(
        new Error(message || `The entered value do not match the value of "${fieldName}"`)
      )
    },
  })
}
