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
import { PiBookOpen } from 'react-icons/pi'

import { Button } from '../Button'
import { H4 } from '../Typography/HX/H4'
import { Icon } from '../Icon'
import { TitleProps } from './Drawer.types'
import { useTheme } from '../../hooks/useTheme'

export const Title = ({ docLink, title }: TitleProps): ReactElement => {
  const { palette } = useTheme()

  const docLinkIcon = useMemo(() => (
    <Icon
      aria-label={'Doc link'}
      color={palette?.action?.primary?.focus}
      component={PiBookOpen}
      size={16}
    />
  ), [palette?.action?.primary?.focus])

  const onClickDocLink = useCallback(() => window.open(docLink, '_blank'), [docLink])

  const ellipsis = useMemo(() => ({ rows: 1, tooltip: title }), [title])
  return <>
    <H4 ellipsis={ellipsis}>{title}</H4>
    {docLink && <div>
      <Button
        icon={docLinkIcon}
        shape={Button.Shape.Circle}
        type={Button.Type.Ghost}
        onClick={onClickDocLink}
      />
    </div>}
  </>
}
