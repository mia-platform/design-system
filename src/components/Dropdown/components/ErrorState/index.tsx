/**
 * Copyright 2024 Mia srl
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
