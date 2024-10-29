import { Radio as AntRadio } from 'antd'
import { ReactElement } from 'react'

import { RadioProps } from './Radio.props'
import styles from './Radio.module.css'
import { BodyS } from '../Typography/BodyX/BodyS'

const { radio, radioContent, radioLabel, radioDescription } = styles

export const Radio = ({
  label,
  description,
  checked,
  disabled,
  value,
}: RadioProps): ReactElement => {
  return (
    <div className={radio}>
      <AntRadio checked={checked} disabled={disabled} value={value}>
        <div className={radioContent}>
          <div className={radioLabel}>
            <BodyS>{label}</BodyS>
          </div>
          {description && (
            <div className={radioDescription}>
              <BodyS>{description}</BodyS>
            </div>
          )}
        </div>
      </AntRadio>
    </div>
  )
}
