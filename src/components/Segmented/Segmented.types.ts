import { ReactNode } from 'react'

export type Option = string | {
  icon?: ReactNode,
  label: string | number,
  isDisabled?: boolean,
  value: ReactNode,
}

export enum OptionsAlignments {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
