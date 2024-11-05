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

import type { Preview } from "@storybook/react"

import backgrounds from "./addons/backgrounds"
import docs from "./addons/docs"
import themeSwitcher from "./addons/theme"
import withTheme from "./decorators/theme"

import './reset.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      }
    },
    actions: {
      argTypesRegex: "^on[A-Z].*"
    },
    backgrounds,
    docs,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
  },
  globalTypes: {
    theme: themeSwitcher
  },
  decorators: [withTheme]
}

export default preview
