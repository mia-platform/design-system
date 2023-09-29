import { ReactElement, useState } from 'react'
import classnames from 'classnames'

import { Option, OptionsAlignments } from './Segmented.types'
import { getOptionKey, isDisabledOption, isString, isVerticalOption, resolveKey } from './Segmented.utils'
import styles from './Segmented.module.css'

const { Horizontal, Vertical } = OptionsAlignments
const { segmented, segmentedOption, disabled, selected, vertical } = styles

export type SegmentedProps = {

  /**
   * The option initially selected. Either one of the following:
   *
   * - string: the key of the initially selected option
   * - number: the position in the array of the initially selected option
   */
  defaultValue?: string | number

  /**
   * Determines whether the segmented control is disabled.
   */
  isDisabled?: boolean

  /**
   * A callback function that is invoked when the selected option changes.
   * @param {Option} option - The newly selected option.
   */
  onChange?: (option: Option) => void

 /**
   * An array of segmented options to be displayed. Either one of the following:
   *
   * - string
   * - object: {
   *
   *     icon?: ReactNode, The icon of the option
   *
   *     label: ReactNode, The selectable text of the option
   *
   *     isDisabled?: boolean, Whether the option is clickable
   *
   *     key: string, The value associated with the option
   *
   *   }
   */
  options: Option[]

  /**
   * The alignment of the options within the segmented control. Either one of the following:
   *
   * - horizontal: icons and labels of every option are aligned horizontally
   * - vertical: icons and labels of every option are aligned vertically
   */
  optionsAlignment?: OptionsAlignments

 /**
   * The current selected value. Either one of the following:
   *
   * - string: the key of the selected option
   * - number: the position of the selected option in the array
   */
  value?: string | number
}

/**
 * UI component for displaying selectable segmented options
 *
 * @returns {Segmented} Segmented component
 */
export const Segmented = ({
  defaultValue,
  isDisabled,
  onChange,
  options,
  optionsAlignment,
  value,
}: SegmentedProps): ReactElement => {
  const [selectedValue, setSelectedValue] = useState(resolveKey(options, defaultValue))

  const handleOptionClick = (option: Option): void => {
    if (!isDisabledOption(option, isDisabled)) {
      setSelectedValue(getOptionKey(option))
      if (onChange) {
        onChange(option)
      }
    }
  }

  return (
    <ul
      className={classnames([
        segmented,
        isDisabled && disabled,
        optionsAlignment === Vertical && vertical,
      ])}
    >
      {
        options.map((option) => {
          const currentKey = resolveKey(options, value) ?? selectedValue
          const key = getOptionKey(option)

          return (
            <li
              className={classnames([
                segmentedOption,
                key === currentKey && selected,
                isVerticalOption(option, optionsAlignment) && vertical,
                isDisabledOption(option, isDisabled) && disabled,
              ])}
              key={key}
              onClick={() => handleOptionClick(option)}
            >
              {
                isString(option)
                  ? option
                  : (
                    <>
                      {option.icon}
                      {option.label}
                    </>
                  )
              }
            </li>
          )
        })
      }
    </ul>
  )
}

Segmented.defaultProps = {
  isDisabled: false,
  optionsAlignment: Horizontal,
}
