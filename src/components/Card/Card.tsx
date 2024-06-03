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

import { BodyS } from '../Typography/BodyX/BodyS'
import { Button } from '../Button'
import { CardProps } from './Card.props'
import { H3 } from '../Typography/HX/H3'
import { Icon } from '../Icon'
import styles from './Card.module.css'
import { useTheme } from '../../hooks/useTheme'

const { card, content, header, heading } = styles

export const defaults = {
  isLoading: false,
}

/**
 * UI component used to display content related to a single subject
 *
 * @returns {Card} Card component
 */
export const Card = ({
  children,
  docLink,
  extra,
  isLoading = defaults.isLoading,
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
              <H3 ellipsis={{ rows: 1, tooltip: title }}>{title}</H3>
              {docLink && <div className={styles.docLink}>
                <Button
                  icon={docLinkIcon}
                  shape={Button.Shape.Circle}
                  type={Button.Type.Ghost}
                  onClick={onClickDocLink}
                />
              </div>}
            </div>}
            {subtitle && <BodyS>{subtitle}</BodyS>}
          </div>
          {extra}
        </div>}
        {children && <div className={content}>
          {children}
        </div>}
      </Skeleton>
    </div>
  )
}

Card.skeletonParagraph = {
  rows: 3,
  width: ['80%', '65%', '70%'],
}
