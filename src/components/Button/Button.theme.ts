import { ComponentsTheme, parse } from '../ThemeProvider/Ant'
import Theme from '../../themes/schema'

/**
 * Generates a Ant theme configuration for Button component based on a theme configuration.
 *
 * @link https://ant.design/components/button#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Button Ant theme configuration.
 */
export default ({ typography }: Partial<Theme>): ComponentsTheme['Button'] => ({
  contentFontSizeSM: parse(typography?.action?.fontSize),
  contentFontSize: parse(typography?.action?.fontSize),
  contentFontSizeLG: parse(typography?.action?.fontSize),
})
