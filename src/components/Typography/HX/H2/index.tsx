import { ReactElement } from 'react'

import { HX, HXProps } from '../HX'

export const H2 = (props: HXProps): ReactElement => {
  return <HX {...props} level={2} />
}
