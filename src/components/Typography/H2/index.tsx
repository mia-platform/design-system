import { Typography as AntTypography } from 'antd'
import { ReactElement } from 'react'

import { TypographyProps } from '..'

const { Title: AntTitle } = AntTypography

/**
 * UI component to display H2 headers
 *
 * @link https://ant.design/components/typography
 * @returns {H2} H2 component
 */
export const H2 = ({
  children,
}: TypographyProps): ReactElement => {
  return (
    <AntTitle ellipsis level={2} >
      {children}
    </AntTitle>
  )
}
