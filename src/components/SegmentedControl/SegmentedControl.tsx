/**
 * Copyright 2023 Mia srl
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

import { MouseEvent, ReactElement, useCallback, useState } from 'react'
import classnames from 'classnames'

import { Hierarchy, Option, OptionAlignment } from './SegmentedControl.types'
import { getOptionKey, isDisabledOption, isString, isVerticalOption, resolveKey } from './SegmentedControl.utils'
import { SegmentedControlProps } from './SegmentedControl.props'
import styles from './SegmentedControl.module.css'

const { Neutral, Primary } = Hierarchy
const { Horizontal, Vertical } = OptionAlignment
const { segmented, segmentedOption, primary, disabled, selected, vertical } = styles

/**
 * UI component for displaying selectable segmented options
 *
 * @returns {SegmentedControl} SegmentedControl component
 */
export const SegmentedControl = ({
  defaultValue,
  hierarchy,
  isDisabled,
  onChange,
  options,
  optionsAlignment,
  value,
}: SegmentedControlProps): ReactElement => {
  const [selectedValue, setSelectedValue] = useState(resolveKey(options, defaultValue))

  const handleOptionClick = useCallback((option: Option, event: MouseEvent): void => {
    if (!isDisabledOption(option, isDisabled!)) {
      setSelectedValue(getOptionKey(option))
      if (onChange) {
        onChange(option, event)
      }
    }
  }, [isDisabled, onChange])

  return (
    <ul
      className={classnames([
        segmented,
        isDisabled && disabled,
        optionsAlignment === Vertical && vertical,
        hierarchy === Primary && primary,
      ])}
    >
      {options.map((option) => {
        const currentKey = resolveKey(options, value) ?? selectedValue
        const key = getOptionKey(option)

        const selectedOption = key === currentKey
        const primaryOption = hierarchy === Primary
        const verticalOption = isVerticalOption(option, optionsAlignment!)
        const disabledOption = isDisabledOption(option, isDisabled!)

        return (
          <li
            aria-checked={Boolean(selectedOption)}
            aria-disabled={Boolean(disabledOption)}
            aria-label={key}
            className={classnames([
              segmentedOption,
              primaryOption && primary,
              selectedOption && selected,
              verticalOption && vertical,
              disabledOption && disabled,
            ])}
            key={key}
            onClick={event => handleOptionClick(option, event)}
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
      })}
    </ul>
  )
}

SegmentedControl.defaultProps = {
  hierarchy: Neutral,
  isDisabled: false,
  optionsAlignment: Horizontal,
}
