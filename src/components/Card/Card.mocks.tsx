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

import { action } from '@storybook/addon-actions'

import { Button } from '../Button'
import { Icon } from '../Icon'

const actionIcon = (
  <Icon
    color="#b91200"
    name="PiTrash"
    size={16}
  />
)
export const actionButton = (
  <Button
    hierarchy={Button.Hierarchy.Danger}
    icon={actionIcon}
    shape={Button.Shape.Circle}
    type={Button.Type.Outlined}
    onClick={action('click')}
  />
)

export const children = 'Card Content'
export const docLink = 'https://mia-platform.eu'
export const extra = <Button>{'Button'}</Button>
export const subtitle = 'Card Subtitle'
export const title = 'Card Title'
