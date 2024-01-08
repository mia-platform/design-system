import { action } from '@storybook/addon-actions'

import { Hierarchy, Shape, Type } from '../Button/Button.types'
import { Button } from '../Button'
import { Icon } from '../Icon'

const { Danger } = Hierarchy
const { Circle } = Shape
const { Outlined } = Type

const actionIcon = <Icon color="#b91200" name="PiTrash" size={16} />
export const actionButton = (
  <Button
    hierarchy={Danger}
    icon={actionIcon}
    shape={Circle}
    type={Outlined}
    onClick={action('click')}
  />
)

export const skeletonParagraph = {
  rows: 6,
  width: ['30%', '80%', '65%', '30%', '70%', '60%'],
}

export const children = 'Card Content'
export const docLink = 'https://mia-platform.eu'
export const extra = <Button>{'Button'}</Button>
export const subtitle = 'Card Subtitle'
export const title = 'Card Title'
