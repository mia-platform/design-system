import { Typography as AntTypography } from 'antd'
import { ReactElement } from 'react'

import { TypographyProps } from '..'

const { Title: AntTitle } = AntTypography

/**
 * UI component to display H3 headers
 *
 * @link https://ant.design/components/typography
 * @returns {H3} H3 component
 */
export const H3 = ({
  children,
}: TypographyProps): ReactElement => {
  return (
    <AntTitle ellipsis level={3} >
      {children}
    </AntTitle>
  )
}
