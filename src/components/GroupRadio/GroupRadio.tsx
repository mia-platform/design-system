import { Radio as AntRadio, RadioChangeEvent } from 'antd'
import { ReactElement, ReactNode, useMemo, useState } from 'react'

import { GropupRadioProps } from './GroupRadio.props'
import { Radio } from './Radio'
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
}: GropupRadioProps): ReactElement => {
  const [value, setValue] = useState(defaultValue)

  const radioOptions = useMemo((): ReactNode => {
    return options.map((option) => {
      return (
        <div key={option.value.toString()}>
          <Radio
            description={option.description}
            disabled={option.disabled}
            label={option.label}
            value={option.value}
          />
        </div>
      )
    })
  }, [options])

  const handleChange = (ev: RadioChangeEvent): void => {
    console.log('ev.target.value', ev.target.value)
    setValue(ev.target.value)
    if (onChange) {
      onChange(value)
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
