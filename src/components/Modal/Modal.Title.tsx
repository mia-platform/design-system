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

import { ReactElement, useCallback, useMemo } from 'react'

import { Shape, Type } from '../Button/Button.types'
import { Button } from '../Button'
import { H4 } from '../Typography/HX/H4'
import { Icon } from '../Icon'
import { TitleProps } from './Modal.props'
import styles from './Modal.module.css'
import { useTheme } from '../../hooks/useTheme'

const { Circle } = Shape
const { Ghost } = Type

/**
 * Title component of Modal, which has within it and manages the modal title and the eventual docLink.
 *
 * @returns {Title} Modal Title component
 */
export const Title = ({
  docLink,
  title,
}: TitleProps): ReactElement => {
  const { palette } = useTheme()

  const docLinkIcon = useMemo(() => (
    <Icon color={palette?.action?.link?.active} name="PiBookOpen" size={16} />
  ), [palette?.action?.link?.active])

  const onClickDocLink = useCallback(() => window.open(docLink, '_blank'), [docLink])

  return (
    <div className={styles.title}>
      {title && <>
        <H4 ellipsis={{ rows: 1, tooltip: title }}>{title}</H4>
        {docLink && <div className={styles.docLink}>
          <Button
            icon={docLinkIcon}
            shape={Circle}
            type={Ghost}
            onClick={onClickDocLink}
          />
        </div>}
      </>}
    </div>
  )
}
