import { ReactElement, useCallback, useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Space } from 'antd'
import dayjs from 'dayjs'

import { DatePicker, DisabledTime } from './DatePicker'
import { FilterElement, FilterType, FilterValue, FiltersManager } from './utils'
import { Button } from '../../components/Button'
import { Icon } from '../../components/Icon'
import { Input } from '../../components/Input'
import { Table } from '../../components/Table'

enum FieldNames {
  time = 'time',
  author = 'author',
  role = 'role',
  method = 'method',
}

export type TableRecord = {
  logId: string;
  time: string;
  author: string;
  role?: string;
  method: string;
};

const filterFiledType: Partial<Record<keyof TableRecord, FilterType>> = {
  author: FilterType.contains,
}

type FilterConfirmProps = {
  closeDropdown: boolean;
}

const columns = [
  {
    dataIndex: FieldNames.time,
    title: 'Time',
    render: (_value: unknown, record: TableRecord) =>
      dayjs(record.time).format('YYYY-MM-DD HH:mm'),
  },
  {
    dataIndex: FieldNames.author,
    title: 'Author',
    sorter: true,
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: {
      setSelectedKeys: (selectedKeys: React.Key[]) => void;
      selectedKeys: React.Key[];
      confirm: (param?: FilterConfirmProps) => void;
      clearFilters?: () => void;
      close: () => void;
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={'Search'}
          value={selectedKeys[0] as string}
          onChange={(event) =>
            setSelectedKeys(event?.target.value ? [event.target.value] : [])}
          // onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
        />
        <Space>
          <Button
            // onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
          <Button
            type={Button.Type.Link}
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
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

export const data: TableRecord[] = [
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

export const buildFilterFn = (filterGroups: FilterElement[][]): (record: TableRecord) => boolean => {
  return (record: TableRecord) => {
    for (const filterGroup of filterGroups) {
      let blockOk = false
      for (const filterElement of filterGroup) {
        // sono in or, basta che una condizione sia vera e tutto è vero
        const { filterType } = filterElement
        const value = record[filterElement.field as keyof TableRecord]
        const filterValue = filterElement.value
        switch (filterType) {
        case FilterType.equals:
          if (value === filterValue) {
            blockOk = true
          }
          break
        case FilterType.contains:
          if (value?.trim().toLowerCase()
            .includes((filterValue as string).toLowerCase())) {
            blockOk = true
          }
          break
        case FilterType.after:
          if (!(dayjs(value).isBefore(filterValue))) {
            blockOk = true
          }
          break
        case FilterType.before:
          if (!(dayjs(value).isAfter(filterValue))) {
            blockOk = true
          }
          break
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
}

type sortDirection = 'ascend' | 'descend'

export const buildSortFn = (sort: Record<string, sortDirection>): ((
  valueA: TableRecord,
  recordB: TableRecord
) => number) => {
  const [[field, direction]] = Object.entries(sort)
  return (recordA: TableRecord, recordB: TableRecord) => {
    if (!field || !direction) {
      return 0
    }
    const valueA = recordA[field as keyof TableRecord]
    const valueB = recordB[field as keyof TableRecord]

    if (!valueA && !valueB) {
      return 0
    }
    if (!valueA) {
      return direction === 'ascend' ? 1 : -1
    }
    if (!valueB) {
      return direction === 'ascend' ? -1 : 1
    }

    return direction === 'ascend' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
  }
}

type Pagination = {
  current: number,
  pageSize: number,
  total: number,
  defaultPageSize: number,
  pageSizeOptions: number[],
}

export const AuditLogTableWithFilters = (): ReactElement => {
  const [dataSource, setDataSource] = useState(data)
  const [startDate, setStartDate] = useState<dayjs.Dayjs>()
  const [endDate, setEndDate] = useState<dayjs.Dayjs>()
  const [searchText, setSearchText] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<Record<string, unknown[]>>()
  const [appliedSort, setAppliedSort] = useState<Record<string, sortDirection>>()

  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 4,
    total: data.length,
    defaultPageSize: 4,
    pageSizeOptions: [4, 6],
  })

  const applyFilterAndPagination = useCallback(() => {
    const filtersManager = new FiltersManager()

    if (searchText) { // devo sapere questo filtro quali campi coinvolge
      const globalFilterFields = [FieldNames.author, FieldNames.role]
      filtersManager.addGlobalFilter(searchText, FilterType.contains, globalFilterFields)
    }

    if (startDate) {
      filtersManager.addFieldFilter(FieldNames.time, startDate, FilterType.after)
    }

    if (endDate) {
      filtersManager.addFieldFilter(FieldNames.time, endDate, FilterType.before)
    }

    if (appliedFilters) {
      for (const [field, filterValues] of Object.entries(appliedFilters)) {
        filtersManager.addFieldFilter(field, filterValues as FilterValue[], filterFiledType[field as keyof TableRecord])
      }
    }

    const exractedFilters = filtersManager.getFilters()
    const extractedGlobalFilter = exractedFilters.globalFilters

    const filterGroups: FilterElement[][] = []

    if (extractedGlobalFilter) {
      filterGroups.push(extractedGlobalFilter.fields.map(field => ({
        field,
        filterType: extractedGlobalFilter.filterType,
        value: extractedGlobalFilter.value,
      })))
    }

    for (const [key, filters] of exractedFilters.fieldsFilters) {
      let filterGroup: FilterElement[]
      for (const filter of filters) {
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

    const filterFn = buildFilterFn(filterGroups)

    const filteredData = data.filter(record => filterFn(record))

    console.log('appliedSort', appliedSort)

    if (appliedSort) {
      const sortFn = buildSortFn(appliedSort)

      console.log('filteredData', filteredData)
      console.log('insideappliedSort')
      filteredData.sort(sortFn)
      console.log('filteredData-sort', filteredData)
    }

    const recordToSkip = (pagination.current - 1) * pagination.pageSize

    setDataSource(filteredData.slice(recordToSkip))

    if (pagination.total !== filteredData.length) {
      setPagination(prev => ({ ...prev, total: filteredData.length }))
    }
  }, [appliedFilters, appliedSort, endDate, pagination, searchText, startDate])

  useEffect(() => {
    applyFilterAndPagination()
  }, [applyFilterAndPagination])

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

    setSearchText(searchVal)
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
      Object.entries(filters as Record<keyof TableRecord, unknown[]>).filter(([_key, value]) => value !== null)
    )
    setAppliedFilters(cleanedRecord as Record<keyof TableRecord, unknown[]>)
    const sort = sorting as { field: keyof TableRecord; order: sortDirection }
    setAppliedSort({ [sort.field]: sort.order })

    setPagination(prev => ({
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
        pagination={pagination}
        rowKey={'logId'}
        onChange={handleTableChange}
      />
    </Space>
  )
}

