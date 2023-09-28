import { ReactElement, useState } from 'react'
import classnames from 'classnames'

import { Option, OptionsAlignments } from './Segmented.types'
import { getOptionValue, isStringOption } from './Segmented.utils'
import styles from './Segmented.module.css'

const { Horizontal, Vertical } = OptionsAlignments
const { segmented, segmentedOption, disabled, selected, vertical } = styles

export type SegmentedProps = {

  /**
   * The option initially selected. Either one of the following:
   *
   * - string: the value of the option
   * - number: the position in the array
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
   *     icon?: ReactNode,
   *
   *     label: string | number,
   *
   *     isDisabled?: boolean,
   *
   *     value: ReactNode
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
   * - string: the value of the selected option
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
  const [selectedValue, setSelectedValue] = useState(defaultValue && (
    typeof defaultValue === 'string'
      ? defaultValue
      : getOptionValue(options[defaultValue])
  ))

  const handleOptionClick = (option: Option): void => {
    if (!isDisabled && (isStringOption(option) || !option?.isDisabled)) {
      setSelectedValue(getOptionValue(option))
      if (onChange) {
        onChange(option)
      }
    }
  }

  return (
    <div
      className={classnames([
        segmented,
        isDisabled && disabled,
        optionsAlignment === Vertical && vertical,
      ])}
    >
      {
        options.map((option) => {
          const stringOption = isStringOption(option)
          const currentValue = (value && (typeof value === 'string'
            ? value
            : getOptionValue(options[value])
          )) ?? selectedValue

          return (
            <div
              className={classnames([
                segmentedOption,
                isDisabled && disabled,
                (getOptionValue(option)) === currentValue && selected,
                (stringOption ? false : option?.isDisabled) && disabled,
                (stringOption ? false : optionsAlignment === Vertical) && vertical,
              ])}
              key={stringOption ? option : option?.label}
              onClick={() => handleOptionClick(option)}
            >
              {
                stringOption
                  ? option
                  : (
                    <>
                      {option.icon}
                      {option.label}
                    </>
                  )
              }
            </div>
          )
        })
      }
    </div>
  )
}

Segmented.defaultProps = {
  isDisabled: false,
  optionsAlignment: Horizontal,
}
