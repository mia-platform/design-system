/**
 * Position on the cartesian axis perpendicular to the screen.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/z-index}
 */
type Index = number

/**
 * Shadow effect around the element's frame.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow}
 *
 * @example 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
 * @example inset 5em 1em white;
 */
type Shadow = string

/**
 * Scale of elevations from lower to higher.
 */
type Elevation = 0 | 100 | 200 | 300 | 400 | 500

/**
 * Scale of indexes for each elevation value.
 */
type Indexes = Record<Elevation, Index>

/**
 * Set of shadows for each elevation value.
 */
type Shadows = Record<Elevation, Shadow>

export type {
  Elevation,
  Shadows,
  Indexes,
}
