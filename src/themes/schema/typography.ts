/**
 * Set of all properties expressing the shape of a text.
 *
 * @remarks
 *
 * fontFamily: style of the characters composing the text.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-family}
 *
 * fontSize: size of the text.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size}
 *
 * fontStyle: whether the text should adopt a cursive style.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-size}
 *
 * fontWeight: set of properties handling the boldness of the font.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight}
 *
 * lineHeight: distance between lines of text.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/line-height}
 *
 * letterSpacing: distance between characters of a text.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing}
 *
 * textDecoration: additional line decorating the text.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration}
 */
type TextFormat = {
  fontFamily: string,
  fontSize: string,
  fontWeight: string,
  fontStyle?: string,
  lineHeight?: string,
  letterspacing?: string,
  textDecoration?: string,
}

/**
 * Set of all text formats composing the theme.
 */
type Typography = {
  h1: TextFormat,
  h2: TextFormat,
  h3: TextFormat,
  h4: TextFormat,
  bodyS: TextFormat,
  bodyM: TextFormat,
  bodyL: TextFormat,
  bodySBold: TextFormat,
  bodyMBold: TextFormat,
  bodyLBold: TextFormat,
  action: TextFormat,
  link: TextFormat,
  caption: TextFormat,
  code: TextFormat,
}

export default Typography
