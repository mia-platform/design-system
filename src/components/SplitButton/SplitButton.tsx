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

import classNames from 'classnames'
import { PiCaretDown } from 'react-icons/pi'
import { ReactElement } from 'react'

import { Button } from '../Button/Button'
import { Dropdown } from '../Dropdown/Dropdown'
import { Icon } from '../Icon'
import { SplitButtonProps } from './props'
import styles from './SplitButton.module.css'

const {
  splitButton,
  mainActionButton,
  dropdownActionButton,
  outlined,
} = styles

const dropdownIcon = <Icon aria-label="Open dropdown" component={PiCaretDown} size={16} />

export const defaults = {
  hierarchy: Button.Hierarchy.Primary,
}

export const SplitButton = ({
  autoFocus,
  children,
  hierarchy = defaults.hierarchy,
  href,
  htmlType,
  isDisabled,
  isLoading,
  items,
  itemLayout,
  onClick,
  onItemClick,
  target,
  title,
  type,
}: SplitButtonProps): ReactElement => {
  return (
    <div className={splitButton}>
      <Button
        className={classNames(
          mainActionButton,
          type === Button.Type.Outlined || hierarchy === Button.Hierarchy.Neutral ? outlined : undefined
        )}
        hierarchy={hierarchy}
        htmlType={htmlType}
        isDisabled={isDisabled}
        isLoading={isLoading}
        key="main-action-button"
        title={title}
        type={type}
        onClick={onClick}
        {...href && { href, rel: 'noopener noreferrer', target }}
      >
        {children}
      </Button>
      <Dropdown
        autoFocus={autoFocus}
        itemLayout={itemLayout}
        items={items}
        placement={Dropdown.Placement.BottomRight}
        onClick={onItemClick}
      >
        <Button
          className={classNames(
            dropdownActionButton,
            type === Button.Type.Outlined || hierarchy === Button.Hierarchy.Neutral ? outlined : undefined
          )}
          hierarchy={hierarchy}
          icon={dropdownIcon}
          isDisabled={isDisabled}
          key="dropdown-trigger-button"
          type={type}
        />
      </Dropdown>
    </div>
  )
}
