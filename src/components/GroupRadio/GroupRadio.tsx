import { Radio as AntRadio, RadioChangeEvent } from 'antd'
import { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import { GroupRadioProps } from './GroupRadio.props'
import { Radio } from './components/Radio'
import styles from './GroupRadio.module.css'

const { options: optionsClass, groupRadio } = styles

const defaults = {
  disabled: false,
}

export const GroupRadio = ({
  defaultValue,
  disabled = defaults.disabled,
  options,
  onChange,
}: GroupRadioProps): ReactElement => {
  const [value, setValue] = useState<string | number | boolean | undefined>()

  const computeInitialValue = useCallback(() => {
    let initialValue = options.find(option => option.value === defaultValue)?.value
    if (defaultValue === undefined) {
      for (const option of options) {
        if (!option.disabled) {
          initialValue = option.value
          break
        }
      }
    }
    return initialValue
  }, [defaultValue, options])

  useEffect(() => {
    const initialValue = computeInitialValue()
    setValue(initialValue)
    if (onChange) {
      onChange({ value: initialValue })
    }
  }, [computeInitialValue, onChange])

  const radioOptions = useMemo((): ReactNode => {
    return options.map((option) => (
      <div key={option.value.toString()}>
        <Radio
          checked={option.value === value}
          description={option.description}
          disabled={option.disabled}
          label={option.label}
          value={option.value}
        />
      </div>
    ))
  }, [options, value])

  const handleChange = (event: RadioChangeEvent): void => {
    setValue(event.target.value)
    if (onChange) {
      onChange({ value: event.target.value, event })
    }
  }

  return (
    <div className={groupRadio}>
      <AntRadio.Group
        className={groupRadio}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      >
        <div className={optionsClass}>{radioOptions}</div>
      </AntRadio.Group>
    </div>
  )
}
