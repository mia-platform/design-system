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

import React from "react"
import type { Decorator } from "@storybook/react"

import themes from '../../src/themes'
import { ThemeProvider } from '../../src/components/ThemeProvider'
import { Themes } from "../../src/utils/theme"

const {lightTheme, darkTheme} = themes

/**
 * A Storybook decorator that applies a theme to the wrapped components.
 * 
 * @param Story - The story component being decorated.
 * @param context - The context object containing contextual information.
 * @returns The decorated Story component with the specified theme.
 */
const withTheme: Decorator = (Story, {globals}) => {
  const { theme: themeKey } = globals

  const theme = themeKey == Themes.dark ?
    darkTheme :
    lightTheme
  
  return (
    <ThemeProvider theme={theme}>
      <Story/>
    </ThemeProvider>
  )
}

export default withTheme
