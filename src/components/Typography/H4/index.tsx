import { Typography as AntTypography } from 'antd'
import { ReactElement } from 'react'

import { TypographyProps } from '..'

const { Title: AntTitle } = AntTypography

/**
 * UI component to display H4 headers
 *
 * @link https://ant.design/components/typography
 * @returns {H4} H4 component
 */
export const H4 = ({
  children,
}: TypographyProps): ReactElement => {
  return (
    <AntTitle ellipsis level={4} >
      {children}
    </AntTitle>
  )
}
