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

import { ColumnAlignment, GenericRecord, TableAction } from './Table.types'
import { Button } from '../Button'
import { Hierarchy } from '../Button/Button.types'
import styles from './Table.module.css'

const { action } = styles

export const getAction = <RecordType extends GenericRecord>({
  dataIndex,
  key,
  icon,
  isDanger,
  isDisabled,
  isFilled,
  isPrimary,
  label,
  onClick,
  title,
}: TableAction<RecordType>): object => {
  const hierarchy = computHierarchy(isPrimary, isDanger)

  const buttonType = isFilled ? Button.Type.Filled : Button.Type.Ghost

  return {
    title,
    dataIndex,
    key: key ?? dataIndex,
    render: (_: unknown, record: RecordType, index: number | undefined) => (
      <div className={action}>
        <Button
          hierarchy={hierarchy}
          icon={icon}
          isDisabled={typeof isDisabled === 'function' ? isDisabled(record, index) : isDisabled}
          type={buttonType}
          onClick={(event) => onClick?.(record, index, event)}
        >
          {label}
        </Button>
      </div>
    ),
    align: ColumnAlignment.Right,
    width: '0px',
  }
}

function computHierarchy(isPrimary?: boolean, isDanger?: boolean): Hierarchy {
  if (isPrimary) { return Button.Hierarchy.Primary }
  if (isDanger) { return Button.Hierarchy.Danger }
  return Button.Hierarchy.Neutral
}
