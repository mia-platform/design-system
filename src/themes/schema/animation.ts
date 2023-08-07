/**
 * Time interval in which the animation occurs,
 * expressed in seconds or in milliseconds.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration}
 *
 * @example 2s
 * @example 200ms
 */
type Duration = {
  shortest: number,
  shorter: number,
  short: number,
  standard: number,
  complex: number
}

/**
 * Acceleration curve describing the speed of the animation.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function}
 *
 * @remarks
 * in: affects the initial part of the animation.
 *
 * out: affects the final part of the animation.
 *
 * inOut: affects the entire animation.
 *
 * @example linear
 * @example cubic-bezier(.29, 1.01, 1, -0.68);
 */
type Ease = {
  inOut: string,
  in: string,
  out: string
}

/**
 * Set of all properties handling animations.
 */
type Transition = {
  ease: Ease,
  duration: Duration
}

export default Transition
