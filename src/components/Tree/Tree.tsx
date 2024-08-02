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

import { Tree as AntTree } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { ReactElement } from 'react'

import { TreeProps } from './Tree.props'
import styles from './Tree.module.css'

const { customTree } = styles
export const defaults = {
  showLine: true,
}

/**
 * A Tree line to separate different content
 *
 * @link https://ant.design/components/Tree
 * @returns {Tree} Tree component
 */
export const Tree = ({
  checkable,
  checkStrictly,
  checkedKeys,
  defaultCheckedKeys,
  defaultExpandAll,
  defaultExpandParent,
  defaultExpandedKeys,
  defaultSelectedKeys,
  disabled,
  height,
  onCheck,
  onSelect,
  showIcon,
  showLine,
  treeData,
  virtual,
}: TreeProps): ReactElement => {
  return (
    <AntTree
      checkStrictly={checkStrictly}
      checkable={checkable}
      checkedKeys={checkedKeys}
      className={customTree}
      defaultCheckedKeys={defaultCheckedKeys}
      defaultExpandAll={defaultExpandAll}
      defaultExpandParent={defaultExpandParent}
      defaultExpandedKeys={defaultExpandedKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      disabled={disabled}
      height={height}
      showIcon={showIcon}
      showLine={showLine}
      // We need to explicitly use the CaretDownOutline as icon for the switcher to ensure
      // that it is always used (also when the tree has "showLine" with "true")
      // We use the AntDesign icon because it includes instructions used by the Tree Component for
      // automatically handle the rotation
      switcherIcon={<CaretDownOutlined />}
      treeData={treeData}
      virtual={virtual}
      onCheck={onCheck}
      onSelect={onSelect}
    />
  )
}

