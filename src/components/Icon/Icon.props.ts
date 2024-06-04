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

export type IconComponentProps = {
  'aria-label'?: string,
  className?: string,
  color?: string,
  height?: string | number,
  role?: string,
  size?: string | number,
  width?: string | number,
}

export type IconComponent = React.FunctionComponent<IconComponentProps>

export type IconProps = {

  /**
   * The color of the icon.
   */
    color?: string,

  /**
   * The icon component to render.
   *
   * It should be a React function component accepting standard SVG attributes.
   */
  component: IconComponent,

  /**
   * The size of the icon.
   */
  size?: 16 | 24 | 32 | 48 | 64 | 96,
}
