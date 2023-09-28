import { ReactNode } from 'react'

import { Option } from './Segmented.types'

/**
 * Type guard function that checks if an option is a string.
 *
 * @param {Option} option - The option to check.
 * @returns {boolean} `true` if the option is a string, `false` otherwise.
 */
export function isStringOption(option: Option): option is string {
  return typeof option === 'string'
}

/**
 * Retrieves the option value and returns it.
 *
 * @param {Option} option - The option to retrieve the value from.
 * @returns {ReactNode} The option value.
 */
export function getOptionValue(option: Option): ReactNode {
  return isStringOption(option)
    ? option
    : option.value
}
