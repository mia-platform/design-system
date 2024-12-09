/**
 * Copyright 2024 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
