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

import { GenericRecord, RowFormat, RowFormatting } from './Table.types'

/**
 * Gets a function for formatting rows based on a specified key in a generic record.
 *
 * @typeparam RecordType - The type of the generic record.
 * @param {keyof RecordType} rowKey - The key used to identify rows in the record.
 * @param {RowFormatting<RecordType>} rowFormatting - Optional row formatting configuration.
 * @returns {(recordType: RecordType) => RowFormat | undefined} A function that formats rows.
 */

export function getRecordFormatting<RecordType extends GenericRecord>(
  rowKey: keyof RecordType,
  rowFormatting?: RowFormatting<RecordType>,
): (recordType: RecordType) => RowFormat | undefined {
  const { formattedRowKeys } = rowFormatting ?? {}

  /**
   * Formats a row based on the specified key.
   *
   * @param {RecordType} record - The record to format.
   * @returns {RowFormat | undefined} The formatted row, or undefined if not found.
   */
  return (record: RecordType) => formattedRowKeys?.[record[rowKey]]
}
