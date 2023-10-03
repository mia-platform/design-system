import { ReactNode } from 'react'

export enum Hierarchies {
  Primary = 'primary',
  Neutral = 'neutral',
}

export enum OptionsAlignments {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type Option = string | {

  /**
   * The icon of the option
   */
  icon?: ReactNode,

  /**
   * Whether the option is clickable
   */
  isDisabled?: boolean,

  /**
   * The selectable text of the option
   */
  label: ReactNode,

  /**
   * The value associated with the option
   */
  key: string,
}
