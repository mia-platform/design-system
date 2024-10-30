import { Radio as AntRadio } from 'antd'
import { ReactElement } from 'react'

import { BodyS } from '../../../Typography/BodyX/BodyS'
import { RadioProps } from './index.props'
import styles from './index.module.css'

const { radio, radioContent, radioLabel, radioDescription } = styles

export const Radio = ({
  label,
  description,
  disabled,
  value,
}: RadioProps): ReactElement => {
  return (
    <div className={radio}>
      <AntRadio disabled={disabled} value={value}>
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
