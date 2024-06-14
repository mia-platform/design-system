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

export type DrawerProps = {

    /**
     * The children nodes to be rendered within the Drawer body.
     */
    children?: ReactNode,

    /**
     * Whether to unmount child components on close.
     */
    destroyOnClose?: boolean,

    ref?: React.ForwardedRef<HTMLDivElement>,

    /**
     * Drawer footer.
     */
    footer?: ReactNode,

    id?: string,

    key?: string,

    /**
     * Whether the modal is visible.
     */
    isVisible?: boolean,

    /**
     * Function invoked at the click of the Drwaer close (X) button.
     */
    onClose?: () => void,

    /**
     * Title of the drawer, which briefly conveys information about its contents.
     */
    title: ReactNode,
}
