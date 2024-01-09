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

import { ReactElement, useCallback, useMemo } from 'react'
import { Skeleton } from 'antd'

import { Shape, Type } from '../Button/Button.types'
import { BodyS } from '../Typography/BodyX/BodyS'
import { Button } from '../Button'
import { CardProps } from './Card.props'
import { H3 } from '../Typography/HX/H3'
import { Icon } from '../Icon'
import styles from './Card.module.css'
import useTheme from '../../hooks/useTheme'

const { Circle } = Shape
const { Ghost } = Type
const { card, header, heading } = styles

/**
 * UI component used to display content related to a single subject
 *
 * @returns {Card} Card component
 */
export const Card = ({
  children,
  docLink,
  extra,
  isLoading,
  subtitle,
  title,
}: CardProps): ReactElement => {
  const { palette } = useTheme()

  const docLinkIcon = useMemo(() => (
    <Icon color={palette?.action?.link?.active} name="PiBookOpen" size={16} />
  ), [palette?.action?.link?.active])

  const onClickDocLink = useCallback(() => window.open(docLink, '_blank'), [docLink])

  return (
    <div className={card}>
      <Skeleton
        active
        loading={isLoading}
        paragraph={Card.skeletonParagraph}
      >
        {(title || subtitle) && <div className={header}>
          <div className={heading}>
            {title && <div className={styles.title}>
              <H3>{title}</H3>
              {docLink && <div className={styles.docLink}>
                <Button
                  icon={docLinkIcon}
                  shape={Circle}
                  type={Ghost}
                  onClick={onClickDocLink}
                />
              </div>}
            </div>}
            {subtitle && <BodyS>{subtitle}</BodyS>}
          </div>
          {extra}
        </div>}
        {children}
      </Skeleton>
    </div>
  )
}

Card.skeletonParagraph = {
  rows: 3,
  width: ['80%', '65%', '70%'],
}

Card.defaultProps = {
  isLoading: false,
}
