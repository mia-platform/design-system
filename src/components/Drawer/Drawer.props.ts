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

import { ReactNode } from 'react'

import { CustomDrawerFooter, DrawerFooter, DrawerTitle } from './Drawer.types'

export type DrawerProps = {

    /**
     * The children nodes to be rendered within the Drawer body.
     */
    children?: ReactNode,

    /**
     * Controls whether to unmount child components on close.
     */
    destroyOnClose?: boolean,

    /**
     * The reference url for documentation of the drawer contents.
     * If present, a button is shown next to the title that, when clicked, opens the url in a new tab.
     */
    docLink?: string,

    /**
     * Drawer footer.
     */
    footer?: DrawerFooter | CustomDrawerFooter,

    /**
     * drawer id for DOM node.
     */
    id?: string,

    /**
     * Controls whether the modal is visible.
     */
    isVisible?: boolean,

    /**
     * React drawer key
     */
    key?: string,

    /**
     * Function invoked at the click of the Drawer close (X) button.
     */
    onClose?: () => void,

    /**
     * Title of the drawer, which briefly conveys information about its contents.
     */
    title: DrawerTitle,
}
