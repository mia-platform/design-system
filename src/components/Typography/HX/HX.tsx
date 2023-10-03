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
   * The attribute is further customizable according to the following data model:
   *
   * `object: {`
   *
   *   `text?: string` - The text to copy.
   *
   *   `onCopy?: () => void` - Function called when the text is copied.
   *
   *   `icon?: ReactNode` - Custom copy icon(s).
   *   It is possible to set a single icon that will become the new copyIcon,
   *   or an array of 2 icons that will replace both copyIcon and copiedIcon.
   *
   *   `tooltips?: boolean | ReactNode` - Custom tooltip text(s).
   *   It is possible to set a single string that will become the new copyText,
   *   or an array of 2 strings that will replace both copyText and copiedText.
   *   If the attribute is set to false, no tooltip will be shown.
   *
   *   `format?: 'text/plain' | 'text/html'` - The Mime Type of the text.
   *
   * `}`
   */
  copyable?: boolean | CopyConfig,

  /**
   * Displays ellipsis when text overflows. By default, the text will be truncated if it
   * exceeds the length of 2 rows, showing all informational content in a tooltip.
   * The attribute is further customizable according to the following data model:
   *
   * `object: {`
   *
   *   `rows?: number` - The maximum number of rows the content can occupy before
   *   going into ellipsis or being truncated.
   *
   *   `expandable?: boolean` - Whether the text is expandable.
   *
   *   `suffix?: string` - Suffix of the ellipsis content.
   *
   *   `symbol?: ReactNode` - Custom description of the ellipsis (default is 'Expand').
   *
   *   `onExpand?: MouseEventHandler<HTMLElement>` - Function called when the content is expanded.
   *
   *   `onEllipsis?: () => void` - Function called when the content enters or leaves the ellipsis state.
   *
   *   `tooltip?: ReactNode` - Whether to display a tooltip on ellipsis.
   *   If set to true, a copy icon is shown to the right of the text.
   *   The attribute is further customizable.
   *
   * `}`
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
      ellipsis={(ellipsis === true && { rows: 2, tooltip: { children } }) || ellipsis}
      level={level}
    >
      {children}
    </AntTitle>
  )
}

HX.defaultProps = {
  copyable: false,
  ellipsis: true,
}
