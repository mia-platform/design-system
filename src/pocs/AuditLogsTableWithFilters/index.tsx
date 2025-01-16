import { ReactElement, useCallback, useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Space } from 'antd'
import dayjs from 'dayjs'

import { DatePicker, DisabledTime } from './DatePicker'
import { FilterElement, FilterType, FilterValue, FiltersManager, buildFilterFn, buildSortFn, sortDirection } from './utils'
import { SearchDropdown, SearchDropdownProps } from './DropdownSearch'
import { Icon } from '../../components/Icon'
import { Input } from '../../components/Input'
import { Pagination } from '../../components/Table/Table.types'
import { Table } from '../../components/Table'

enum FieldNames {
  time = 'time',
  author = 'author',
  role = 'role',
  method = 'method',
}

export type AuditLogRecord = {
  logId: string;
  time: string;
  author: string;
  role?: string;
  method: string;
};

const filterFiledType: Partial<Record<keyof AuditLogRecord, FilterType>> = {
  author: FilterType.contains,
}

const columns = [
  {
    dataIndex: FieldNames.time,
    title: 'Time',
    render: (_value: unknown, record: AuditLogRecord) =>
      dayjs(record.time).format('YYYY-MM-DD HH:mm'),
  },
  {
    dataIndex: FieldNames.author,
    title: 'Author',
    sorter: true,
    filterDropdown: (props: SearchDropdownProps) => (
      SearchDropdown(props)
    ),
  },
  {
    dataIndex: FieldNames.role,
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
    dataIndex: FieldNames.method,
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

export const data: AuditLogRecord[] = [
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

export const AuditLogTableWithFilters = (): ReactElement => {
  const [dataSource, setDataSource] = useState(data)
  const [startDate, setStartDate] = useState<dayjs.Dayjs>()
  const [endDate, setEndDate] = useState<dayjs.Dayjs>()
  const [globalSearch, setGlobalSearch] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<Record<string, unknown[]>>()
  const [appliedSort, setAppliedSort] = useState<Record<string, sortDirection>>()
  const [appliedPagination, setAppliedPagination] = useState<Pagination>({
    current: 1,
    pageSize: 4,
    total: data.length,
    defaultPageSize: 4,
    pageSizeOptions: [4, 6],
  })

  const applyFiltersAndSortAndPagination = useCallback(() => {
    const filtersManager = new FiltersManager()

    // devo sapere questo filtro quali campi coinvolge
    if (globalSearch) {
      const globalFilterFields = [FieldNames.author, FieldNames.role]
      filtersManager.addGlobalFilter(globalSearch, FilterType.contains, globalFilterFields)
    }

    if (startDate) {
      filtersManager.addFieldFilter(FieldNames.time, startDate, FilterType.after)
    }

    if (endDate) {
      filtersManager.addFieldFilter(FieldNames.time, endDate, FilterType.before)
    }

    if (appliedFilters) {
      for (const [field, filterValues] of Object.entries(appliedFilters)) {
        filtersManager.addFieldFilter(
          field,
          filterValues as FilterValue[],
          filterFiledType[field as keyof AuditLogRecord]
        )
      }
    }

    // console.log('appliedFilters', filterGroups)
    const filterFn = filtersManager.buildFilterFn()

    const filteredData = data.filter(record => filterFn(record))

    // console.log('appliedSort', appliedSort)

    if (appliedSort) {
      const sortFn = buildSortFn(appliedSort)
      filteredData.sort(sortFn)
    }

    const recordToSkip = (appliedPagination.current! - 1) * appliedPagination.pageSize!

    setDataSource(filteredData.slice(recordToSkip))

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

  const handleTableChange = useCallback((pagination: unknown, filters: unknown, sorting: unknown) => {
    console.log('handleTableChange-filters', filters)
    console.log('handleTableChange-sorting', sorting)
    console.log('handleTableChange-pagination', pagination)

    // Remove keys with null values
    const cleanedRecord = Object.fromEntries(
      Object.entries(filters as Record<keyof AuditLogRecord, unknown[]>).filter(([_key, value]) => value !== null)
    )
    setAppliedFilters(cleanedRecord as Record<keyof AuditLogRecord, unknown[]>)
    const sort = sorting as { field: keyof AuditLogRecord; order: sortDirection }
    setAppliedSort({ [sort.field]: sort.order })

    setAppliedPagination(prev => ({
      ...prev,
      current: (pagination as Pagination).current,
      pageSize: (pagination as Pagination).pageSize,
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
        columns={columns}
        data={dataSource}
        isLoading={false}
        pagination={appliedPagination}
        rowKey={'logId'}
        onChange={handleTableChange}
      />
    </Space>
  )
}

