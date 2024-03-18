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

import { ColumnAlignment, GenericRecord } from './Table.types'
import { Hierarchy, Type } from '../Button/Button.types'
import { Button } from '../Button'
import { TableActionProps } from './Table.props'
import styles from './Table.module.css'

const { action } = styles
const { Danger, Neutral } = Hierarchy
const { Ghost } = Type

export const getAction = <RecordType extends GenericRecord>({
  dataIndex,
  key,
  icon,
  isDanger,
  onClick,
  title,
}: TableActionProps<RecordType>): object => {
  return {
    title,
    dataIndex,
    key: key ?? dataIndex,
    render: (_: unknown, record: RecordType, index: number | undefined) => (
      <div className={action}>
        <Button
          hierarchy={isDanger ? Danger : Neutral}
          icon={icon}
          type={Ghost}
          onClick={() => onClick(record, index)}
        />
      </div>
    ),
    align: ColumnAlignment.Right,
    width: '0',
  }
}
