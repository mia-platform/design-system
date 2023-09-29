import { ReactElement } from 'react'

import { HX, HXProps } from '../HX'

export const H1 = (props: HXProps): ReactElement => {
  return <HX {...props} level={1} />
}
