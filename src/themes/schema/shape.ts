/**
 * Unit value expressing a dimension.
 *
 * @example 2px
 * @example 50%
 * @example 0.5em
 * @example 16
 */
type Size = string | number

/**
 * Scale of dimensions from lower to higher.
 */
type Sizer = {
  xs: Size,
  sm: Size,
  md: Size,
  lg: Size,
  xl: Size
}

/**
 * Set of all properties expressing the shape of elements.
 *
 * @remarks
 * border: properties handling the outer layer of elements.
 *
 * size: properties handling inner dimensions of elements
 * (e.g. size of icons).
 */
type Shape = {
  border: {
    radius: Sizer,
    width: Sizer
  },
  size: Sizer & {
    '2xl': Size,
    '3xl': Size,
    '4xl': Size,
    '5xl': Size,
  }
}

export default Shape
