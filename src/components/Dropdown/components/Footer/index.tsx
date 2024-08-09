import { ReactElement } from 'react'

import { DropdownFooter } from '../../props'

export type FooterProps = {
  footer?: DropdownFooter
}

export const Footer = ({ footer }: FooterProps): ReactElement|null => {
  if (!footer) {
    return null
  }

  return footer
}
