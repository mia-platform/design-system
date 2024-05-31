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
import styles from './Table.module.css'

const { action } = styles

export const getAction = <RecordType extends GenericRecord>({
  dataIndex,
  key,
  icon,
  isDanger,
  isDisabled,
  onClick,
  title,
}: TableAction<RecordType>): object => {
  return {
    title,
    dataIndex,
    key: key ?? dataIndex,
    render: (_: unknown, record: RecordType, index: number | undefined) => (
      <div className={action}>
        <Button
          hierarchy={isDanger ? Button.Hierarchy.Danger : Button.Hierarchy.Neutral}
          icon={icon}
          isDisabled={typeof isDisabled === 'function' ? isDisabled(record, index) : isDisabled}
          type={Button.Type.Ghost}
          onClick={(event) => onClick?.(record, index, event)}
        />
      </div>
    ),
    align: ColumnAlignment.Right,
    width: '0px',
  }
}
