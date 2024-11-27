import { ReactNode } from 'react'

import { IconComponent } from '../Icon/Icon.props.ts'

export type CardSelectionProps<T> = {
  title: ReactNode
  icon?: IconComponent
  subtitle?: ReactNode
  children?: ReactNode
  horizontal?: boolean
  type?: 'radio' | 'checkbox'
  value?: T
  isChecked?: boolean
  isDisabled?: boolean
  onClick?: (checked?: boolean) => void
}
