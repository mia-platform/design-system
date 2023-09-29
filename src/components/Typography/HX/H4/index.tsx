import { ReactElement } from 'react'

import { HX, HXProps } from '../HX'

export const H4 = (props: HXProps): ReactElement => {
  return <HX {...props} level={4} />
}
