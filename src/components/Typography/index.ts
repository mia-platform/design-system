import { ReactNode } from 'react'

import { H1 } from './H1'
import { H2 } from './H2'
import { H3 } from './H3'
import { H4 } from './H4'

export type TypographyProps = {

  /**
   * The children nodes to be rendered within the typography context.
   */
  children?: ReactNode,
}

export const Typography = {
  H1,
  H2,
  H3,
  H4,
}
