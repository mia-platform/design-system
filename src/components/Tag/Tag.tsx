import { Tag as AntTag } from 'antd'
import { ReactElement } from 'react'

import { TagProps } from './Tag.props'

export const defaults = {
  isBordered: true,
}

export const Tag = (
  {
    children,
    color,
    closeIcon,
    onClose,
    isBordered = defaults.isBordered,
  } : TagProps
) : ReactElement => {
  return (
    <AntTag
      bordered={isBordered}
      closeIcon={closeIcon}
      color={color}
      onClose={onClose}
    >
      {children}
    </AntTag>
  )
}
