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
  />
)

export const skeletonParagraph = {
  rows: 6,
  width: ['30%', '80%', '65%', '30%', '70%', '60%'],
}
