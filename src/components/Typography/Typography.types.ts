import { TooltipProps } from 'antd'

/**
 * @link https://ant.design/components/typography#copyable
 */
export type CopyConfig = {

  /**
   * The text to copy.
   */
  text?: string;

  /**
   * Function called when the text is copied.
   */
  onCopy?: (event?: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Custom copy icon(s): [copyIcon, copiedIcon].
   */
  icon?: React.ReactNode;

  /**
   * Custom tooltip text(s): [copyText, copiedText]. If the attribute is set to false, no tooltip will be shown.
   */
  tooltips?: boolean | React.ReactNode;

  /**
   * The Mime Type of the text.
   */
  format?: 'text/plain' | 'text/html';
}

/**
 * @link https://ant.design/components/typography#ellipsis
 */
export type EllipsisConfig = {

  /**
   * The maximum number of rows the content can occupy before going into ellipsis or being truncated.
   */
  rows?: number;

  /**
   * Whether the text is expandable.
   */
  expandable?: boolean;

  /**
   * Suffix of the ellipsis content.
   */
  suffix?: string;

  /**
   * Custom description of the ellipsis (default is 'Expand').
   */
  symbol?: React.ReactNode;

  /**
   * Function called when the content is expanded.
   */
  onExpand?: React.MouseEventHandler<HTMLElement>;

  /**
   * Function called when the content enters or leaves the ellipsis state.
   */
  onEllipsis?: (ellipsis: boolean) => void;

  /**
   * Whether to display a tooltip on ellipsis. If set to true, a copy icon is shown to the right of the text.
   * The attribute is further customizable.
   *
   * @link https://ant.design/components/tooltip#common-api
   */
  tooltip?: React.ReactNode | TooltipProps;
}
