import { ComponentsTheme, parse } from '../ThemeProvider/Ant'
import Theme from '../../themes/schema'

/**
 * Computes the relative line height of a TextFormat element from its absolute line height and font size.
 *
 * @param {number} lineHeight - Absolute line height of the TextFormat element.
 * @param {number} fontSize - Absolute font size of the TextFormat element.
 * @returns {number | undefined} relative line height (or undefined if one of the absolute values is missing).
 */
const getRelativeLineHeight = (lineHeight?: number, fontSize?: number): number | undefined => {
  if (!lineHeight || !fontSize) { return undefined }

  return lineHeight / fontSize
}

/**
 * Generates a Ant theme configuration for Typography component based on a theme configuration.
 *
 * @link https://ant.design/components/typography#design-token
 *
 * @param {Partial<Theme>} theme - theme configuration.
 * @returns {Partial<ComponentsTheme>} The generated Typography Ant theme configuration.
 */
export default ({ typography }: Partial<Theme>): ComponentsTheme['Typography'] => ({
  fontSizeHeading1: parse(typography?.h1?.fontSize),
  fontSizeHeading2: parse(typography?.h2?.fontSize),
  fontSizeHeading3: parse(typography?.h3?.fontSize),
  fontSizeHeading4: parse(typography?.h4?.fontSize),
  lineHeightHeading1: getRelativeLineHeight(parse(typography?.h1?.lineHeight), parse(typography?.h1?.fontSize)),
  lineHeightHeading2: getRelativeLineHeight(parse(typography?.h2?.lineHeight), parse(typography?.h2?.fontSize)),
  lineHeightHeading3: getRelativeLineHeight(parse(typography?.h3?.lineHeight), parse(typography?.h3?.fontSize)),
  lineHeightHeading4: getRelativeLineHeight(parse(typography?.h4?.lineHeight), parse(typography?.h4?.fontSize)),
})
