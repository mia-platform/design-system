import * as AntIcons from 'react-icons/ai'
import * as FeatherIcons from 'react-icons/fi'
import * as PhosphorIcons from 'react-icons/pi'
import { ReactElement, useContext } from 'react'
import { IconContext } from 'react-icons'

import MiaPlatform from './assets/MiaPlatform.svg'
import MiaPlatformColored from './assets/MiaPlatformColored.svg'

/**
 * Custom icons for brand images.
 *
 * @remarks This object should only be used for brand image-related custom SVGs.
 */
const customIcons = {
  MiaPlatform,
  MiaPlatformColored,
} as const

/**
 * Supported icon packs.
 *
 * @see {@link https://github.com/feathericons/feather Feather Icons}
 * @see {@link https://github.com/phosphor-icons/core Phosphor Icons}
 * @see {@link https://github.com/ant-design/ant-design-icons Ant Icons}
 */
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
 * @link https://react-icons.github.io/react-icons/
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
      alt={name}
      aria-label={name}
      className={className}
      color={color ?? defaultColor}
      height={size ?? defaultSize}
      role={'img'}
      size={size ?? defaultSize}
      width={size ?? defaultSize}
    />
  )
}

Icon.defaultProps = {
  color: undefined,
  size: 24 as const,
}
