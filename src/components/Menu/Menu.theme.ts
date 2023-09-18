import { ComponentsTheme, parse } from '../ThemeProvider/Ant'
import Theme from '../../themes/schema'

/**
 * Generates a Ant theme configuration for Menu component based on a theme configuration.
 *
 * @link https://ant.design/components/menu#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Menu Ant theme configuration.
 */
export default ({ spacing, typography }: Partial<Theme>): ComponentsTheme['Menu'] => ({
  groupTitleFontSize: parse(typography?.caption?.fontSize),
  itemPaddingInline: spacing?.padding?.sm,
})
