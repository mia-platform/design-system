import { ReactElement, ReactNode } from 'react'
import { Typography as AntTypography } from 'antd'

import { CopyConfig, EllipsisConfig } from '../Typography.types'

const { Title: AntTitle } = AntTypography

export type HXProps = {

  /**
   * The children nodes to be rendered within the typography context.
   */
  children?: ReactNode,

  /**
   * Whether the text is copyable. If set to true, a copy icon is shown to the right of the text.
   * The attribute is further customizable.
   */
  copyable?: boolean | CopyConfig,

  /**
   * Displays ellipsis when text overflows. By default, the text will be truncated if it
   * exceeds the length of 2 rows, showing all informational content in a tooltip.
   * The attribute is further customizable.
   */
  ellipsis?: boolean | EllipsisConfig,
}

type HXLevel = {

  /**
   * The H tag to be rendered. Match with H1, H2, H3, H4.
   */
  level: 1 | 2 | 3 | 4,
}

/**
 * UI component for displaying headers (H1, H2, H3, H4).
 *
 * @link https://ant.design/components/typography#typographytitle
 * @returns {HX} HX component
 */
export const HX = ({
  children,
  copyable,
  ellipsis,
  level,
}: HXProps & HXLevel): ReactElement => {
  return (
    <AntTitle
      copyable={copyable}
      ellipsis={ellipsis ?? { rows: 2, tooltip: { children } }}
      level={level}
    >
      {children}
    </AntTitle>
  )
}

HX.defaultProps = {
  copyable: false,
}
