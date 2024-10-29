import { InputRef } from 'antd'
import { Ref } from 'react'

import { Appearance } from './types.ts'

export type BaseInputProps = {

  /**
   * The placeholder for the input.
   */
  placeholder?: string

  /**
   * The type of the Input.
   */
  appearance?: Appearance

  /**
   * Whether the input is disabled.
   */
  isDisabled?: boolean,

  /**
   * Whether the input has error.
   */
  isError?: boolean

  /**
   * Whether the input is read-only.
   */
  isReadOnly?: boolean

  /**
   * Whether the input is full width. Defaults to true.
   */
  isFullWidth?: boolean

  /**
   * Ref to the antd input.
   */
  inputRef?: Ref<InputRef>

  /**
   * Classes for the input.
   */
  className?: string

}
