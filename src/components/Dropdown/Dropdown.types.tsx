import { type MenuProps as AntdMenuProps } from 'antd'

import { OpenChangeInfoSource } from './Dropdown.props'

export type ArrayElement<ArrayType extends readonly unknown[] | undefined> =
ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type AntdMenuItems = AntdMenuProps['items']
export type AntdMenuItem = ArrayElement<AntdMenuItems>

export type AntdMenuClickEvent = {
   key: string,
   keyPath: string[],
   domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}

export type AntdTriggerSource = 'trigger' | 'menu'
export const antdSourceMap: Record<AntdTriggerSource, OpenChangeInfoSource> = {
  'trigger': OpenChangeInfoSource.Trigger,
  'menu': OpenChangeInfoSource.Menu,
}

export enum Placement {
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
  Top = 'top',
  Bottom = 'bottom',
}

