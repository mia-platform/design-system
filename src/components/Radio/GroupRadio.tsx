import { Radio as AntRadio, RadioChangeEvent, Space } from 'antd'
import { ReactElement, ReactNode } from 'react'

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
  const getOptions = (): ReactNode => {
    return options.map((option) => {
      return <div key={option.value.toString()}>
        <Radio
          description={option.description}
          disabled={option.disabled}
          label={option.label}
          value={option.value}
        />
      </div>
    }
    )
  }

  const handleChange = (ev: RadioChangeEvent): void => {
    console.log('handleChange', ev)
  }

  return (
    <div className={groupRadio}>
      <AntRadio.Group
        className={groupRadio}
        disabled={disabled}
        value={defaultValue}
        onChange={handleChange}
      >
        <div className={optionsClass}>{getOptions()}</div>
      </AntRadio.Group>
    </div>
  )
}
