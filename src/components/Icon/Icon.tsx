import * as AntIcons from 'react-icons/ai'
import * as FeatherIcons from 'react-icons/fi'
import * as PhosphorIcons from 'react-icons/pi'
import { ReactElement, useContext } from 'react'
import { IconContext } from 'react-icons'

import MiaPlatform from './assets/MiaPlatform.svg?react'
import MiaPlatformColored from './assets/MiaPlatformColored.svg?react'

const customIcons = {
  MiaPlatform,
  MiaPlatformColored,
} as const

const reactIcons = {
  ...FeatherIcons,
  ...PhosphorIcons,
  ...AntIcons,
} as const

export type IconProps = {

  /**
   * The color of the icon
   */
  color?: string

  /**
   * The name of the icon
   */
  name: keyof typeof customIcons | keyof typeof reactIcons

  /**
   * The size of the icon
   */
  size?: 16 | 24 | 32 | 48 | 64 | 96
}

/**
 * UI component for displaying different icon packs (Ant, Feather, Phosphor) and custom SVGs
 *
 * @returns {Icon} Icon component
 */
export const Icon = ({
  name,
  size,
  color,
}: IconProps): ReactElement => {

  const { color: defaultColor, size: defaultSize, className } = useContext(IconContext)

  const IconComponent = name in customIcons
    ? customIcons[name as keyof typeof customIcons]
    : reactIcons[name as keyof typeof reactIcons]

  return (
    <IconComponent
      className={className}
      color={color ?? defaultColor}
      height={size ?? defaultSize}
      id={name}
      size={size ?? defaultSize}
      width={size ?? defaultSize}
    />
  )
}

Icon.defaultProps = {
  color: undefined,
  size: 24 as const,
}
