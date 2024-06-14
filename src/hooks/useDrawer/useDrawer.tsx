/**
 * Copyright 2024 Mia srl
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

import { useCallback, useState } from 'react'

import { DrawerAPI } from './types'

/**
 * useDrawer hook allows for hiding visibility state .
 *
 * @returns {DrawerAPI} An object which includes the Drawer component, the drawer state (visible or hidden) and methods
 * for opening, closing, and changing the modal state.
 */
export const useDrawer = (): DrawerAPI => {
  const [isVisible, setIsVisible] = useState(false)

  const openDrawer = useCallback(() => setIsVisible(true), [])
  const closeDrawer = useCallback(() => setIsVisible(false), [])
  const toggleDrawer = useCallback(() => setIsVisible(prevState => !prevState), [])

  return {
    isVisible,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  }
}
