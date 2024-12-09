import { FormInstance } from 'antd'

import {
  RuleObject,
  checkEquals,
  max,
  min,
  pattern, required,
  whitespace,
} from '.'

describe('Validators', () => {
  test('required validator', () => {
    const rule = required()
    expect(rule).toEqual({
      message: 'The field is required',
      required: true,
    })

    const customMessage = 'Custom required message'
    const customRule = required(customMessage)
    expect(customRule).toEqual({
      message: customMessage,
      required: true,
    })
  })

  test('whitespace validator', () => {
    const rule = whitespace()
    expect(rule).toEqual({
      message: 'The field should not contain white spaces',
      whitespace: true,
    })

    const customMessage = 'No whitespaces allowed'
    const customRule = whitespace(customMessage)
    expect(customRule).toEqual({
      message: customMessage,
      whitespace: true,
    })
  })

  test('min validator', () => {
    const value = 5
    const rule = min(value)
    expect(rule).toEqual({
      message: `The field must be greater than ${value}`,
      min: value,
    })

    const customMessage = 'Minimum value is 10'
    const customRule = min(10, customMessage)
    expect(customRule).toEqual({
      message: customMessage,
      min: 10,
    })
  })

  test('max validator', () => {
    const value = 100
    const rule = max(value)
    expect(rule).toEqual({
      message: `The field must be greater than ${value}`,
      max: value,
    })

    const customMessage = 'Maximum value is 50'
    const customRule = max(50, customMessage)
    expect(customRule).toEqual({
      message: customMessage,
      max: 50,
    })
  })

  test('pattern validator', () => {
    const regex = /^[a-z]+$/
    const rule = pattern(regex)
    expect(rule).toEqual({
      message: `The must match the pattern ${regex.toString()}`,
      pattern: regex,
    })

    const customMessage = 'Only lowercase letters are allowed'
    const customRule = pattern(regex, customMessage)
    expect(customRule).toEqual({
      message: customMessage,
      pattern: regex,
    })
  })

  test('checkEquals validator', async() => {
    const form = {
      getFieldValue: jest.fn().mockReturnValue('expectedValue'),
    } as unknown as FormInstance
    const rule = checkEquals('fieldName')(form) as {
      validator: (...args: unknown[]) => Promise<Error | undefined>
    }

    await expect(rule.validator(null as unknown as RuleObject, 'expectedValue')).resolves.toBeUndefined()

    await expect(rule.validator!(null as unknown as RuleObject, 'wrongValue')).rejects.toThrow(
      'The entered value do not match the value of "fieldName"'
    )
  })
})