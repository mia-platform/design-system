import { Typography as AntTypography } from 'antd'
import { ReactElement } from 'react'

import { TypographyProps } from '..'

const { Title: AntTitle } = AntTypography

/**
 * UI component to display H1 headers
 *
 * @link https://ant.design/components/typography
 * @returns {H1} H1 component
 */
export const H1 = ({
  children,
}: TypographyProps): ReactElement => {
  return (
    <AntTitle ellipsis level={1} >
      {children}
    </AntTitle>
  )
}
