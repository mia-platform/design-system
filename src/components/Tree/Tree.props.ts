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

import { TreeProps as AntTreeProps, TreeDataNode } from 'antd'

export type TreeProps = {

  /**
   * Set to `true` if the nodes must include checkboxes. Default: `false`
   */
  checkable?: boolean,

  /**
   * Specifies the keys of the checked treeNodes
   */
  checkedKeys?: string[] | { checked: string[], halfChecked: string[] },

  /**
   * Check treeNode precisely; parent treeNode and children treeNodes are not associated
   */
  checkStrictly?: boolean,

  /**
   * Specifies the keys of the default checked treeNodes
   */
  defaultCheckedKeys?: string[]

  /**
   * Whether to expand all treeNodes by default. Default: `false`.
   */
  defaultExpandAll?: boolean

  /**
   * Specify the keys of the default expanded treeNodes
   */
  defaultExpandedKeys?: string[]

  /**
   * If auto expand parent treeNodes when init. Default: `true`.
   */
  defaultExpandParent?: boolean

  /**
   * Specifies the keys of the default selected treeNodes
   */
  defaultSelectedKeys?: string[]

  /**
   * If set to `true`, the tree component is fully disabled
   */
  disabled?: boolean

  /**
   * Config virtual scroll height. Will not support horizontal scroll when enable this.
   */
  height?: number

  /**
   * Emit an event if a checkbox has been pressed. Works only if `checkable` is set to `true`.
   */
  onCheck?: AntTreeProps['onCheck'],

  /**
   * Emit an event when a node is selected (its label has been clicked on)
   */
  onSelect?: AntTreeProps['onSelect'],

  /**
   * If set to `true`, the tree will render the icons near to the label of each node.
   *
   * The icon shown must be defined in the node definition itself.
   */
  showIcon?: boolean

  /**
   * Set to `true` to show lines to connect parent nodes and their children
   */
  showLine?: boolean

  /**
   * The list of nodes to be included in the tree component
   */
  treeData: TreeDataNode[]

  /**
   * If set to `true`, virtual scrolling is enabled. Default: `false`.
   */
  virtual?: boolean
}
