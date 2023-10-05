/**
 * Copyright 2023 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-style}
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
