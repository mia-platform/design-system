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

import { addons } from "@storybook/manager-api"

import MiaPlatformTheme from "./theme"

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: "bottom",
    enableShortcuts: true,
    showToolbar: true,
    selectedPanel: undefined,
    initialActive: "sidebar",
    sidebar: {
        showRoots: true,
        collapsedRoots: ["other"],
    },
    toolbar: {
        title: { hidden: false },
        zoom: { hidden: false },
        eject: { hidden: false },
        copy: { hidden: false },
        fullscreen: { hidden: false },
    },
    theme: MiaPlatformTheme
})
