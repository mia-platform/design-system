/**
 * Unit value expressing a distance.
 *
 * @example 2px
 * @example 50%
 * @example 0.5em
 * @example 16
 */
type Space = string | number

/**
 * Scale of distances from lower to higher.
 */
type Spacer = {
  xs: Space,
  sm: Space,
  md: Space,
  lg: Space,
  xl: Space
}

/**
 * Set of all properties expressing distances among elements.
 *
 * @remarks
 * margin: properties handling distances between element borders and other elements.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin}
 *
 * padding: properties handling distances between element content and borders.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding}
 *
 * gap: properties handling dimensions among elements.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gap}
 */
type Spacing = {
  margin: Spacer,
  padding: Spacer,
  gap: Spacer
}

export default Spacing
