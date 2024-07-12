import { ReactElement, ReactNode } from 'react'

// Header

export type DrawerTitle = ReactNode

export type TitleProps = {
  docLink?: string,
  title: DrawerTitle,
}

// Footer

export type DrawerFooter = {

  /**
  * Array of buttons to be displayed in the right side of the footer.
  * Note that the rendering order is the opposite of the list order.
   */
  buttons?: ReactElement[]

  /**
  * Extra information to be displayed in the left side of the footer (such as text or a checkbox).
   */
  extra?: ReactNode
}

export type CustomDrawerFooter = ReactElement

export type FooterProps = {
    footer?: DrawerFooter | CustomDrawerFooter,
}
