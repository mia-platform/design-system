import { Option, OptionsAlignments } from './Segmented.types'

const { Vertical } = OptionsAlignments

/**
 * Type guard function that checks if an element is of type string.
 *
 * @param {Option | string | number} element - The element to check.
 * @returns {boolean} `true` if the option is a string, `false` otherwise.
 */
export function isString(element: Option | number): element is string {
  return typeof element === 'string'
}

/**
 * Checks if an option is disabled.
 *
 * @param {Option} option - The option to check.
 * @param {boolean} isDisabled - Specifies whether the whole segmented is disabled.
 *
 * @returns {boolean} `true` if the option is disabled, `false` otherwise.
 */
export function isDisabledOption(option: Option, isDisabled: boolean): boolean {
  return isDisabled ?? (
    !isString(option) && option?.isDisabled
  )
}

/**
 * Checks if an option should be aligned vertically.
 *
 * @param {Option} option - The option to check.
 * @param {OptionsAlignments} optionsAlignment - Specifies the alignment of segmented options.
 *
 * @returns {boolean} `true` if the option should be aligned vertically, `false` otherwise.
 */
export function isVerticalOption(option: Option, optionsAlignment: OptionsAlignments): boolean {
  return (
    !isString(option) && optionsAlignment === Vertical
  )
}

/**
 * Retrieves the option key and returns it.
 *
 * @param {Option} option - The option to retrieve the key from.
 * @returns {ReactNode} The option key.
 */
export function getOptionKey(option: Option): string {
  return isString(option)
    ? option
    : option.key
}

/**
 * Retrieves a key from the provided value or options object.
 *
 * @param {Option[]} options - An array containing options for key retrieval.
 * @param {string | number} value - The key to retrieve, or an options position containing the key.
 *
 * - string: retrieves the option with value as key
 * - number: retrieves the option using the value as the position in the options array
 *
 * @returns {string | undefined} The retrieved key, or `undefined` if `key` is falsy.
 */
export function resolveKey(options: Option[], value?: string | number): string | undefined {
  if (!value) { return undefined }
  return (
    isString(value)
      ? value
      : getOptionKey(options[value])
  )
}
