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

import { ReactElement, useMemo } from 'react'
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
const { card, header, icon, titles, titleStyle } = styles

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

  return (
    <div className={card}>
      <Skeleton
        active
        loading={isLoading}
        paragraph={{ rows: 6, width: ['30%', '80%', '65%', '30%', '70%', '60%'] }}
      >
        {(title || subtitle) && <div className={header}>
          <div className={titles}>
            {title && <div className={titleStyle}>
              <H3>{title}</H3>
              {docLink && <div className={icon}>
                <Button
                  icon={docLinkIcon}
                  shape={Circle}
                  type={Ghost}
                  onClick={() => window.open(docLink, '_blank')}
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

Card.defaultProps = {
  isLoading: false,
}
