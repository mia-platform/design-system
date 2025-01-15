import { ReactElement, useCallback, useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Space } from 'antd'
import dayjs from 'dayjs'

import { DatePicker, DisabledTime } from './DatePicker'
import { FilterBlock, FilterElement, FilterType, FilterValue, FiltersManager } from './utils'
import { Icon } from '../../components/Icon'
import { Input } from '../../components/Input'
import { Table } from '../../components/Table'

enum FieldNames {
  time = 'time',
  author = 'author',
  role = 'role',
}

export type TableRecord = {
  logId: string;
  [FieldNames.time]: string;
  [FieldNames.author]: string;
  [FieldNames.role]?: string;
};

const columns = [
  { dataIndex: FieldNames.time, title: 'Time', render: (_value: unknown, record: TableRecord) => dayjs(record.time).format('YYYY-MM-DD HH:mm') },
  { dataIndex: FieldNames.author, title: 'Author' },
  { dataIndex: FieldNames.role,
    title: 'Role',
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
]

export const data: TableRecord[] = [
  {
    logId: 'log_id_1',
    time: '2025-01-01T00:00:00.000Z',
    author: 'Author 1',
    role: 'developer',
  },
  {
    logId: 'log_id_2',
    time: '2025-01-02T00:00:00.000Z',
    author: 'Author 1',
    role: 'maintainer',
  },
  {
    logId: 'log_id_3',
    time: '2025-01-03T00:00:00.000Z',
    author: 'Author 2',
    role: 'developer',
  },
  {
    logId: 'log_id_4',
    time: '2025-01-04T00:00:00.000Z',
    author: 'Author 3',
    role: 'maintainer',
  },
  {
    logId: 'log_id_5',
    time: '2025-01-05T00:00:00.000Z',
    author: 'Author 2',
    role: 'reporter',
  },
  {
    logId: 'log_id_6',
    time: '2025-01-06T00:00:00.000Z',
    author: 'Service account 1',
  },
  {
    logId: 'log_id_7',
    time: '2025-01-07T00:00:00.000Z',
    author: 'Service account 2',
  },
]

export const buildFilterFn = (blocks: FilterBlock[]): (record: TableRecord) => boolean => {
  return (record: TableRecord) => {
    for (const block of blocks) {
      let blockOk = false
      for (const element of block.elements) {
        // sono in or, basta che una condizione sia vera e tutto è vero
        const { filterType } = element
        const value = record[element.field as keyof TableRecord]
        const filterValue = element.value
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

export const AuditLogTableWithFilters = (): ReactElement => {
  const [dataSource, setDataSource] = useState(data)
  const [startDate, setStartDate] = useState<dayjs.Dayjs>()
  const [endDate, setEndDate] = useState<dayjs.Dayjs>()
  const [searchText, setSearchText] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<Record<string, unknown[]>>()

  useEffect((): void => {
    const filtersManager = new FiltersManager()

    if (searchText) { // devo sapere questo filtro quali campi coinvolge
      const globalFilterFields = [FieldNames.author, FieldNames.role]
      filtersManager.addGlobalFilter(searchText, FilterType.contains, globalFilterFields)
    }

    if (startDate) {
      filtersManager.addFieldFilter(FieldNames.time, FilterType.after, startDate)
    }

    if (endDate) {
      filtersManager.addFieldFilter(FieldNames.time, FilterType.before, endDate)
    }

    if (appliedFilters) {
      for (const [field, filterValues] of Object.entries(appliedFilters)) {
        filtersManager.addFieldFilter(field, FilterType.equals, filterValues as FilterValue[])
      }
    }

    const exractedFilters = filtersManager.getFilters()
    const globalFilter = exractedFilters.globalFilters

    const filterBlock: FilterBlock[] = []

    let resGlobalFilter: FilterBlock

    if (globalFilter) {
      resGlobalFilter = {
        elements: globalFilter.fields.map(field => ({
          field,
          filterType: globalFilter.filterType,
          value: globalFilter.value,
        })),
      }
      filterBlock.push(resGlobalFilter)
    }

    for (const [key, filters] of exractedFilters.fieldsFilters) {
      for (const filter of filters) {
        let elements: FilterElement[]
        if (Array.isArray(filter.value)) {
          elements = filter.value.map(val => ({
            field: key,
            filterType: filter.filterType,
            value: val,
          }))
        } else {
          elements = [{
            field: key,
            filterType: filter.filterType,
            value: filter.value,
          }]
        }
        const fieldsBlock = {
          elements,
        }
        filterBlock.push(fieldsBlock)
      }
    }

    console.log('blocks', filterBlock)

    const filterFn = buildFilterFn(filterBlock)

    const filteredData = data.filter(record => filterFn(record))

    console.log('filteredData', filteredData)
    setDataSource(filteredData)
  }, [appliedFilters, endDate, searchText, startDate])

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

  const handleTableChange = useCallback((_pagination: unknown, filters: unknown) => {
    console.log('handleTableChange', filters)

    // Remove keys with null values
    const cleanedRecord = Object.fromEntries(
      Object.entries(filters as Record<string, unknown[]>).filter(([_key, value]) => value !== null)
    )
    setAppliedFilters(cleanedRecord)
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
        rowKey={'logId'}
        onChange={handleTableChange}
      />
    </Space>
  )
}

