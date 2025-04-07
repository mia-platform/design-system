import { PiArrowCounterClockwise, PiXSquareFill } from 'react-icons/pi'
import { ReactElement, ReactNode } from 'react'

import { IconPosition, Size } from '../../../Button/Button.types'
import { Button } from '../../../Button'
import { Icon } from '../../../Icon'
import { Typography } from '../../../Typography'
import styles from './errorstate.module.css'

const { BodyS } = Typography

export type ErrorStateProps = {
  message?: ReactNode
  onRetry?: () => void
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps): ReactElement => {
  return (
    <div className={styles.error}>
      <Icon component={PiXSquareFill} size={24} />
      {message ? <BodyS>{message}</BodyS> : null}
      {onRetry ? (
        <Button
          icon={<Icon component={PiArrowCounterClockwise} size={16} />}
          iconPosition={IconPosition.Left}
          size={Size.Small}
          onClick={onRetry}
        >
          {'Retry'}
        </Button>
      ) : null}
    </div>
  )
}
