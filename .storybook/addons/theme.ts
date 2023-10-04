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

import {Themes} from "../../src/utils/theme"

/**
 * The theme switcher configuration for Storybook.
 */
const themeSwitcher = {
  name: "Theme",
  title: "Theme",
  description: "Theme for your components",
  toolbar: {
    icon: "paintbrush",
    items: [
      { value: Themes.light, icon: 'sun', title: "Light Theme" },
      { value: Themes.dark, icon: 'moon', title: "Dark Theme" },
    ],
  },
  defaultValue: Themes.light
}

export default themeSwitcher
