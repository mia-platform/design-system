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
/* eslint-disable react/no-multi-comp */
/* eslint-disable max-lines */

import { DatePicker as AntDatePicker, Space } from 'antd'
import { PiArrowRight, PiCircleHalfTilt, PiMagnifyingGlass } from 'react-icons/pi'
import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { get } from 'lodash-es'

import { Action, ColumnAlignment, ColumnFilterMode, ColumnType, ExpandableConfig, Pagination, RowSelection, SortOrder, TableAction } from './Table.types'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Input } from '../Input'
import { Table } from '.'
import { TableProps } from './Table.props'

const { Left, Center, Right } = ColumnAlignment
const { Menu, Tree } = ColumnFilterMode
const { Ascend, Descend } = SortOrder

type FieldName = string | string[]
type Callbacks = Record<string, () => void>

/** Data */

export type TableRecord = {
  dataIndex?: string,
  field1: string,
  field2: string,
  field3: string,
  nested: {
    field4: string
  }
}

export const data: TableRecord[] = [
  { field1: 'Value 1', field2: 'Value 1', field3: 'Value 1', nested: { field4: 'Value 1' } },
  { field1: 'Value 2', field2: 'Value 2', field3: 'Value 2', nested: { field4: 'Value 2' } },
  { field1: 'Value 3', field2: 'Value 3', field3: 'Value 3', nested: { field4: 'Value 3' } },
  { field1: 'Value 4', field2: 'Value 4', field3: 'Value 4', nested: { field4: 'Value 4' } },
]

export const hugeData: TableRecord[] = Array.from({ length: 50 }).map((_, i) => ({
  field1: `Value ${i + 1}`,
  field2: `Value ${i + 1}`,
  field3: `Value ${i + 1}`,
  nested: { field4: `Value ${i + 1}` },
}))

export const rowKey = Object.keys(data[0])[0] as keyof TableRecord

/** Actions */

export const customActions = (callbacks: Callbacks = {}): TableAction<TableRecord>[] => ([
  {
    dataIndex: 'detail',
    icon: (
      <Icon
        aria-label="PiArrowRight"
        color="currentColor"
        component={PiArrowRight}
        size={16}
      />
    ),
    onClick: callbacks.detail,
  },
  {
    dataIndex: 'overview',
    icon: (
      <Icon
        aria-label="PiCircleHalfTilt"
        color="currentColor"
        component={PiCircleHalfTilt}
        size={16}
      />
    ),
    onClick: callbacks.overview,
  },
  {
    dataIndex: Action.Edit, /* Override default edit action */
    isDisabled: (_, index) => Boolean(index === 2),
  },
])

/** Filters */

export const filters = [
  { text: 'Value 1', value: 'Value 1' },
  { text: 'Value 2', value: 'Value 2' },
  { text: 'Submenu',
    value: 'Submenu',
    children: [
      { text: 'Value 3', value: 'Value 3' },
      { text: 'Value 4', value: 'Value 4' },
    ],
  },
]

const menuFilterProps = (fieldName: FieldName): object => ({
  filters,
  filterMode: Menu,
  filterSearch: true,
  filterResetToDefaultFilteredValue: true,
  onFilter: (value: unknown, record: TableRecord) => get(record, fieldName) === value,
})

const treeFilterProps = (fieldName: FieldName): object => ({
  filters,
  filterMode: Tree,
  filterSearch: true,
  filterResetToDefaultFilteredValue: true,
  onFilter: (value: unknown, record: TableRecord) => get(record, fieldName) === value,
})

/** Sorters */

const sortProps = (fieldName: FieldName): object => ({
  defaultSortOrder: Ascend,
  sortDirections: [Ascend, Descend],
  showSorterTooltip: true,
  sorter: (
    fieldA: TableRecord,
    fieldB: TableRecord
  ): number => (
    get(fieldA, fieldName) > get(fieldB, fieldName) ? 1 : -1
  ),
})

/** Columns */

export const columns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Field 1' },
  { dataIndex: 'field2', title: 'Field 2' },
  { dataIndex: 'field3', title: 'Field 3' },
  { dataIndex: ['nested', 'field4'], title: 'Field 4' },
]

export const scrollableColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Field 1 (fixed left)', width: '10%', fixed: Left },
  { dataIndex: 'field2', title: 'Field 2' },
  { dataIndex: 'field3', title: 'Field 3' },
  { dataIndex: ['nested', 'field4'], title: 'Field 4 (fixed right)', width: '10%', fixed: Right },
]

export const filteredAndSortedColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Filtered (Menu)', ...menuFilterProps('field1') },
  { dataIndex: 'field2', title: 'Filtered (Tree)', ...treeFilterProps('field2') },
  { dataIndex: 'field3', title: 'Sorted', ...sortProps('field3') },
  { dataIndex: ['nested', 'field4'], title: 'Filtered and Sorted', ...menuFilterProps(['nested', 'field4']), ...sortProps(['nested', 'field4']) },
]

export const alignedColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Left Alignment', align: Left },
  { dataIndex: 'field2', title: 'Center Alignment', align: Center },
  { dataIndex: ['nested', 'field4'], title: 'Right Alignment', align: Right },
]

export const sizedColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: '20%', width: '20%' },
  { dataIndex: 'field2', title: '30%', width: '30%' },
  { dataIndex: 'field3', title: '40%', width: '40%' },
  { dataIndex: ['nested', 'field4'], title: '10%', width: '10%' },
]

export const spannedColumns: ColumnType<TableRecord>[] = [
  { dataIndex: 'field1', title: 'Field 1', colSpan: 1 },
  { dataIndex: 'field2', title: 'Field 2 - Field 3', colSpan: 2 },
  { dataIndex: 'field3', title: 'Field 3', colSpan: 0 },
  { dataIndex: ['nested', 'field4'], title: 'Field 4', colSpan: 1 },
]

/** Scroll */

export const scroll = {
  x: 1800,
  y: 200,
  scrollToFirstRowOnChange: true,
}

/** Row Selection */

export const rowSelection = (callbacks: Callbacks = {}): RowSelection<TableRecord> => ({
  columnTitle: '',
  defaultSelectedRowKeys: ['Value 1'],
  fixed: Left,
  hideSelectAll: false,
  type: 'checkbox',
  ...callbacks,
})

/** Row Expansion */

export const expandable = (callbacks: Callbacks = {}): ExpandableConfig<TableRecord> => ({
  columnTitle: '',
  defaultExpandAllRows: false,
  defaultExpandedRowKeys: ['Value 1'],
  expandIcon: undefined,
  expandedRowRender: () => 'Expandable row',
  expandRowByClick: true,
  rowExpandable: (record: TableRecord) => record.field1 !== 'Value 3',
  showExpandColumn: true,
  ...callbacks,
})

/** Row State */

export type TableRecordState = TableRecord & { state?: string }

export const dataState: TableRecordState[] = [
  { state: 'Default', field1: 'Value 1', field2: 'Value 1', field3: 'Value 1', nested: { field4: 'Value 1' } },
  { state: 'Info', field1: 'Value 2', field2: 'Value 2', field3: 'Value 2', nested: { field4: 'Value 2' } },
  { state: 'Warning', field1: 'Value 3', field2: 'Value 3', field3: 'Value 3', nested: { field4: 'Value 3' } },
  { state: 'Error', field1: 'Value 4', field2: 'Value 4', field3: 'Value 4', nested: { field4: 'Value 4' } },
  { state: 'Success', field1: 'Value 5', field2: 'Value 5', field3: 'Value 5', nested: { field4: 'Value 5' } },
]

export const columnsState: ColumnType<TableRecordState>[] = [{ dataIndex: 'state', title: 'State' }, ...columns]

/** Pagination */

export const pagination = (callbacks: Callbacks = {}): Pagination => ({
  ...callbacks,

  // Only to fit Storybook size
  defaultPageSize: 4,
  pageSizeOptions: [4, 10, 20],
})

/** Footer */

export const footer = (currentPageData: readonly TableRecord[]): ReactElement => {
  return (
    <span>
      {`Total rows number: ${currentPageData.length}`}
    </span>
  )
}

/** Externally controlled Filters and Sorters */

type FilterState = TableRecord[]
type SortState = {
  sortedColumn?: ColumnType<TableRecord>['dataIndex'],
  sortOrder?: SortOrder
}

export const WithExternalFiltersAndSorters = (props: TableProps<TableRecord>): ReactElement => {
  const [filteredData, setFilteredData] = useState<FilterState>([])
  const [{ sortedColumn, sortOrder }, setSortedInfo] = useState<SortState>({})

  const dataWithValue2 = data.filter(record => Object.values(record).includes('Value 2'))
  const field2Descending = { sortedColumn: 'field2', sortOrder: Descend }

  const filterValue2 = (): void => setFilteredData(dataWithValue2)
  const sortField2Descending = (): void => setSortedInfo(field2Descending)

  const clearFilters = (): void => setFilteredData([])
  const clearSort = (): void => setSortedInfo({})

  return (
    <Space direction="vertical" style={{ width: '100%' }} >
      <Space>
        <Button hierarchy={Button.Hierarchy.Neutral} onClick={filterValue2}>{'Filter Value 2'}</Button>
        <Button hierarchy={Button.Hierarchy.Neutral} onClick={sortField2Descending}>{'Sort Field 2 Descending'}</Button>
        <Button hierarchy={Button.Hierarchy.Neutral} onClick={clearFilters}>{'Clear filters'}</Button>
        <Button hierarchy={Button.Hierarchy.Neutral} onClick={clearSort}>{'Clear sort'}</Button>
      </Space>
      <Table
        {...props}
        columns={props.columns?.map((column: ColumnType<TableRecord>) => ({
          ...column,

          /* Apply sort order */
          sortOrder: sortedColumn === column.dataIndex ? sortOrder : undefined,
          sorter: (fieldA: TableRecord, fieldB: TableRecord) => (fieldA?.field2 > fieldB?.field2 ? 1 : -1),

          /* Apply filters */
          filtered: true,
          filteredValue: filteredData.map(record => get(record, `${column.dataIndex}`!)),
          onFilter: (value: unknown, record: TableRecord) => get(record, `${column.dataIndex}`!) === value,
        }))}
      />
    </Space>
  )
}

/* ********* Code for the Logs Table case ***************** */

/* ******** utils for filter, sort, and pagination ******** */
enum FilterType {
  equals = 'equals',
  contains = 'contains',
  before = 'before',
  after = 'after'
}

type FilterValue = string | number | dayjs.Dayjs

type Filter = {
  filterType: FilterType,
  value: FilterValue[]
}

type FieldsFilter = Map<string, Filter[]>

type GlobalFilter = {
  value: string,
  filterType: FilterType,
  fields: string[]
}

type FilterElement = {
  field: string,
  filterType: FilterType
  value: FilterValue
}

type sortDirection = 'ascend' | 'descend'

class FiltersManager {
  private fieldsFilter: FieldsFilter
  private globalFilter?: GlobalFilter
  private sortConfig?: Record<string, sortDirection>

  constructor() {
    this.fieldsFilter = new Map()
  }

  addFieldFilter(fieldName: string, value: FilterValue | FilterValue[], filterType?: FilterType): void {
    try {
      if (!filterType) {
        // eslint-disable-next-line no-param-reassign
        filterType = FilterType.equals
      }
      let arrayValue: FilterValue[]
      if (Array.isArray(value)) {
        arrayValue = value
        if (value.length === 0) {
          throw new Error('empty array')
        }
      } else {
        arrayValue = [value]
      }
      const val = arrayValue.at(0)

      if (typeof val === 'string') {
        if (filterType !== FilterType.equals && filterType !== FilterType.contains) {
          throw new Error(`filter type ${filterType} not accepted for string value`)
        }
        arrayValue = (arrayValue as string[]).map(val1 => val1.trim()).filter(val2 => Boolean(val2))
        if (arrayValue.length === 0) {
          throw new Error('empty filter')
        }
      }

      if (typeof val === 'number' && filterType !== FilterType.equals) {
        throw new Error(`filter type ${filterType} not accepted for number value`)
      }

      if (dayjs.isDayjs(val) && filterType !== FilterType.before && filterType !== FilterType.after) {
        throw new Error(`filter type ${filterType} not accepted for date value`)
      }

      let filedFilters = this.fieldsFilter.get(fieldName)
      if (!filedFilters) {
        filedFilters = []
      }
      filedFilters.push({
        filterType,
        value: arrayValue,
      })
      this.fieldsFilter.set(fieldName, filedFilters)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  addGlobalFilter(value: string, filterType: FilterType, fields: string[]): void {
    this.globalFilter = {
      value,
      filterType,
      fields,
    }
  }

  private buildAppliedFilter(): FilterElement[][] {
    const filterGroups: FilterElement[][] = []

    if (this.globalFilter) {
      filterGroups.push(this.globalFilter.fields.map(field => ({
        field,
        filterType: this.globalFilter!.filterType,
        value: this.globalFilter!.value,
      })))
    }

    for (const [key, extractedFilters] of this.fieldsFilter) {
      let filterGroup: FilterElement[]
      for (const filter of extractedFilters) {
        if (Array.isArray(filter.value)) {
          filterGroup = filter.value.map(val => ({
            field: key,
            filterType: filter.filterType,
            value: val,
          }))
        } else {
          filterGroup = [{
            field: key,
            filterType: filter.filterType,
            value: filter.value,
          }]
        }
        filterGroups.push(filterGroup)
      }
    }
    return filterGroups
  }

  private filterFn(record: Record<string, unknown>): boolean {
    const filterGroups = this.buildAppliedFilter()
    for (const filterGroup of filterGroups) {
      let blockOk = false
      for (const filterElement of filterGroup) {
        // sono in or, basta che una condizione sia vera e tutto è vero
        const { filterType } = filterElement
        const value = record[filterElement.field]
        const filterValue = filterElement.value
        switch (filterType) {
        case FilterType.equals:
          if (value === filterValue) {
            blockOk = true
          }
          break
        case FilterType.contains:
          if (typeof value === 'string' && value?.trim().toLowerCase()
            .includes((filterValue as string).toLowerCase())) {
            blockOk = true
          }
          break
        case FilterType.after: {
          const dateValue = dayjs(value as string)
          if (dateValue.isValid() && !dateValue.isBefore(filterValue)) {
            blockOk = true
          }
          break
        }
        case FilterType.before: {
          const dateValue = dayjs(value as string)
          if (dateValue.isValid() && !dateValue.isAfter(filterValue)) {
            blockOk = true
          }
          break
        }
        default:
        }
        if (blockOk) {
          break
        }
      }
      if (!blockOk) {
        return false
      }
    }
    return true
  }

  filter(dataToFilter: Record<string, unknown>[]): Record<string, unknown>[] {
    return dataToFilter.filter(record => this.filterFn(record))
  }

  sort(dataToSort: Record<string, unknown>[], sortConfig?: Record<string, sortDirection>): Record<string, unknown>[] {
    if (sortConfig) {
      this.sortConfig = sortConfig
      return dataToSort.slice().sort((recordA, recordB) => this.sortFn(recordA, recordB))
    }
    return dataToSort.slice()
  }

  private sortFn(
    recordA: Record<string, unknown>,
    recordB: Record<string, unknown>,
  ): number {
    if (!this.sortConfig) {
      return 0
    }
    const [[field, direction]] = Object.entries(this.sortConfig)
    if (!field || !direction) {
      return 0
    }
    const valueA = recordA[field]
    const valueB = recordB[field]

    if (!valueA && !valueB) {
      return 0
    }
    if (!valueA) {
      return direction === 'ascend' ? 1 : -1
    }
    if (!valueB) {
      return direction === 'ascend' ? -1 : 1
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'ascend' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }
    return 0
  }
}

/** *****  end utils for filter, sort, and pagination ******** */

/** *****  DatePicker component ******** */
type DisabledTime = {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
}

type DatePickerProps = {
  onChange?: (value: dayjs.Dayjs, dateString: string | string[]) => void
  disabledDate?: (current: dayjs.Dayjs) => boolean
  disabledTime?: (current: dayjs.Dayjs) => DisabledTime
  placeholder?: string
}

const DatePicker = ({
  onChange,
  disabledDate,
  disabledTime,
  placeholder,
}: DatePickerProps): ReactElement => {
  return (
    <AntDatePicker
      disabledDate={disabledDate}
      disabledTime={disabledTime}
      placeholder={placeholder}
      showSecond={false}
      showTime
      onChange={onChange}
    />
  )
}

/** ***** end DatePicker component ******** */

/** ***** Dropdown Filter component ******** */

type FilterConfirmProps = {
  closeDropdown: boolean;
}

type SearchDropdownProps = {
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: () => void;
  close: () => void;
}

const SearchDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}: SearchDropdownProps) : ReactNode => {
  return (
    <div style={{ padding: 8 }}>
      <div style={{ marginBottom: 8 }} >
        <Input
          placeholder={'Search'}
          value={selectedKeys[0] as string}
          onChange={(event) => setSelectedKeys(event?.target.value ? [event.target.value] : [])}
        />
      </div>
      <Space>
        <Button
          onClick={() => {
            confirm({ closeDropdown: true })
          }}
        >
            Search
        </Button>
        <Button
          hierarchy={Button.Hierarchy.Neutral}
          onClick={() => {
            if (clearFilters) {
              clearFilters()
            }
          }}
        >
            Reset
        </Button>
      </Space>
    </div>
  )
}

/** ***** Dropdown Filter component ******** */

/** *****  LogTable component ******** */

enum Fields {
  time = 'time',
  author = 'author',
  role = 'role',
  method = 'method',
}

type LogRecord = {
  logId: string;
  time: string;
  author: string;
  role?: string;
  method: string;
};

const filterFiledType: Partial<Record<keyof LogRecord, FilterType>> = {
  author: FilterType.contains,
}

const logsColumns = [
  {
    dataIndex: Fields.time,
    title: 'Time',
    render: (_value: unknown, record: LogRecord) =>
      dayjs(record.time).format('YYYY-MM-DD HH:mm'),
  },
  {
    dataIndex: Fields.author,
    title: 'Author',
    sorter: true,
    filterDropdown: (props: SearchDropdownProps) => (
      SearchDropdown(props)
    ),
  },
  {
    dataIndex: Fields.role,
    title: 'Role',
    sorter: true,
    filterMode: Table.ColumnFilterMode.Menu,
    filterResetToDefaultFilteredValue: true,
    filterSearch: false,
    filters: [
      {
        text: 'Developer',
        value: 'developer',
      },
      {
        text: 'Maintainer',
        value: 'maintainer',
      },
      {
        text: 'Reporter',
        value: 'reporter',
      },
    ],
  },
  {
    dataIndex: Fields.method,
    title: 'Method',
    filterMode: Table.ColumnFilterMode.Menu,
    filterResetToDefaultFilteredValue: true,
    filterSearch: false,
    filters: [
      {
        text: 'GET',
        value: 'GET',
      },
      {
        text: 'POST',
        value: 'POST',
      },
      {
        text: 'PATCH',
        value: 'PATCH',
      },
      {
        text: 'DELETE',
        value: 'DELETE',
      },
    ],
  },
]

const logsData: LogRecord[] = [
  {
    logId: 'log_id_1',
    time: '2025-01-01T00:00:00.000Z',
    author: 'Author 1',
    role: 'developer',
    method: 'GET',
  },
  {
    logId: 'log_id_2',
    time: '2025-01-02T00:00:00.000Z',
    author: 'Author 1',
    role: 'maintainer',
    method: 'GET',
  },
  {
    logId: 'log_id_3',
    time: '2025-01-03T00:00:00.000Z',
    author: 'Author 2',
    role: 'developer',
    method: 'POST',
  },
  {
    logId: 'log_id_4',
    time: '2025-01-04T00:00:00.000Z',
    author: 'Author 3',
    role: 'maintainer',
    method: 'PATCH',
  },
  {
    logId: 'log_id_5',
    time: '2025-01-05T00:00:00.000Z',
    author: 'Author 2',
    role: 'reporter',
    method: 'DELETE',
  },
  {
    logId: 'log_id_6',
    time: '2025-01-06T00:00:00.000Z',
    author: 'Service account 1',
    method: 'POST',
  },
  {
    logId: 'log_id_7',
    time: '2025-01-07T00:00:00.000Z',
    author: 'Service account 2',
    method: 'GET',
  },
]

export const LogsTable = (): ReactElement => {
  const [dataSource, setDataSource] = useState(logsData)
  const [startDate, setStartDate] = useState<dayjs.Dayjs>()
  const [endDate, setEndDate] = useState<dayjs.Dayjs>()
  const [globalSearch, setGlobalSearch] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<Record<string, unknown[]>>()
  const [appliedSort, setAppliedSort] = useState<Record<string, sortDirection>>()
  const [appliedPagination, setAppliedPagination] = useState<Pagination>({
    current: 1,
    pageSize: 4,
    total: logsData.length,
    defaultPageSize: 4,
    pageSizeOptions: [4, 6],
  })

  const applyFiltersAndSortAndPagination = useCallback(() => {
    const filtersManager = new FiltersManager()

    // eslint-disable-next-line max-len
    // devo sapere questo filtro (globalSearch) quali campi coinvolge. Tendenzialmente tutte le colonne visibili in tabella
    if (globalSearch) {
      const globalFilterFields = [Fields.author, Fields.role]
      filtersManager.addGlobalFilter(globalSearch, FilterType.contains, globalFilterFields)
    }

    if (startDate) {
      filtersManager.addFieldFilter(Fields.time, startDate, FilterType.after)
    }

    if (endDate) {
      filtersManager.addFieldFilter(Fields.time, endDate, FilterType.before)
    }

    if (appliedFilters) {
      for (const [field, filterValues] of Object.entries(appliedFilters)) {
        filtersManager.addFieldFilter(
          field,
          filterValues as FilterValue[],
          filterFiledType[field as keyof LogRecord]
        )
      }
    }

    const filteredData = filtersManager.filter(logsData)
    const sortedData = filtersManager.sort(filteredData, appliedSort) as LogRecord[]
    const recordToSkip = (appliedPagination.current! - 1) * appliedPagination.pageSize!

    setDataSource(sortedData.slice(recordToSkip))

    if (appliedPagination.total !== filteredData.length) {
      setAppliedPagination(prev => ({ ...prev, total: filteredData.length }))
    }
  }, [appliedFilters, appliedSort, endDate, appliedPagination, globalSearch, startDate])

  useEffect(() => {
    applyFiltersAndSortAndPagination()
  }, [applyFiltersAndSortAndPagination])

  const handleChangeGlobalFilter = useCallback((
    _: unknown,
    val: string | Record<string, unknown>
  ): void => {
    let searchVal: string
    if (typeof val === 'object') {
      searchVal = String(val.value)
    } else {
      searchVal = val
    }

    setGlobalSearch(searchVal)
  }, [])

  const handleStartDateChange = useCallback((value: dayjs.Dayjs, _dateString: string | string[]): void => {
    setStartDate(value)
  }, [])

  const handleEndDateChange = useCallback((value: dayjs.Dayjs, _dateString: string | string[]): void => {
    setEndDate(value)
  }, [])

  const disabledStartDate = useCallback((currentStartDate: dayjs.Dayjs): boolean => {
    if (endDate && currentStartDate) {
      return currentStartDate > endDate.endOf('day')
    }
    return false
  }, [endDate])

  const disabledEndDate = useCallback((currentEndDate: dayjs.Dayjs): boolean => {
    if (startDate && currentEndDate) {
      return currentEndDate < startDate.startOf('day')
    }
    return false
  }, [startDate])

  const disabledStartTime = useCallback((currentStartDate: dayjs.Dayjs): DisabledTime => {
    if (!endDate || !currentStartDate.isSame(endDate, 'day')) {
      return {}
    }

    const disabledHours: number[] = []
    for (let i = endDate.hour() + 1; i <= 23; i++) {
      disabledHours.push(i)
    }

    const disabledMinutes: number[] = []
    for (let i = endDate.minute(); i <= 59; i++) {
      disabledMinutes.push(i)
    }

    return {
      disabledHours: () => disabledHours,
      disabledMinutes: (hour: number) => {
        if (hour === endDate.hour()) {
          return disabledMinutes
        }
        return []
      },
    }
  }, [endDate])

  const disabledEndTime = useCallback((currentEndDate: dayjs.Dayjs): DisabledTime => {
    if (!startDate || !currentEndDate.isSame(startDate, 'day')) {
      return {}
    }

    const disabledHours: number[] = []
    for (let i = 0; i < startDate.hour(); i++) {
      disabledHours.push(i)
    }

    const disabledMinutes: number[] = []
    for (let i = 0; i <= startDate.minute(); i++) {
      disabledMinutes.push(i)
    }

    return {
      disabledHours: () => disabledHours,
      disabledMinutes: (hour: number) => {
        if (hour === startDate.hour()) {
          return disabledMinutes
        }
        return []
      },
    }
  }, [startDate])

  const handleTableChange = useCallback((paginationInfo: unknown, filterInfo: unknown, sorting: unknown) => {
    // Remove keys with null values
    const cleanedRecord = Object.fromEntries(
      Object.entries(filterInfo as Record<keyof LogRecord, unknown[]>).filter(([_key, value]) => value !== null)
    )
    setAppliedFilters(cleanedRecord as Record<keyof LogRecord, unknown[]>)
    const sort = sorting as { field: keyof LogRecord; order: sortDirection }
    setAppliedSort({ [sort.field]: sort.order })

    setAppliedPagination(prev => ({
      ...prev,
      current: (paginationInfo as Pagination).current,
      pageSize: (paginationInfo as Pagination).pageSize,
    }))
  }, [])

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <div style={{ width: '300px', marginRight: '30px' }}>
          <Input
            iconRight={() => <Icon component={PiMagnifyingGlass} size={16} />}
            onChange={handleChangeGlobalFilter}
          />
        </div>
        <DatePicker
          disabledDate={disabledStartDate}
          disabledTime={disabledStartTime}
          placeholder="Start date"
          onChange={handleStartDateChange}
        />
        <div>to</div>
        <DatePicker
          disabledDate={disabledEndDate}
          disabledTime={disabledEndTime}
          placeholder="End date"
          onChange={handleEndDateChange}
        />
      </Space>
      <Table
        columns={logsColumns}
        data={dataSource}
        isLoading={false}
        pagination={appliedPagination}
        rowKey={'logId'}
        onChange={handleTableChange}
      />
    </Space>
  )
}

/** *****  end LogTable component ******** */

/* ********* end Code for the Log Table case ***************** */
