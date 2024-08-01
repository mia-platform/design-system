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
import { ReactElement } from 'react'

import { TreeProps } from './Tree.props'

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
  onCheck,
  onSelect,
  showIcon,
  showLine,
  treeData,
}: TreeProps): ReactElement => {
  // TODO: We can show the caret only if showLine is false. Find a solution about this.
  return (
    <AntTree
      checkable={checkable}
      showIcon={showIcon}
      showLine={showLine}
      treeData={treeData}
      onCheck={onCheck}
      onSelect={onSelect}
    />
  )
}

