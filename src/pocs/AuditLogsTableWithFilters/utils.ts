import dayjs from 'dayjs'

export enum FilterType {
  equals = 'equals',
  contains = 'contains',
  before = 'before',
  after = 'after'
}

export type FilterValue = string | number | dayjs.Dayjs

export type Filter = {
  filterType: FilterType,
  value: FilterValue[]
}

export type FieldsFilter = Map<string, Filter[]>

export type GlobalFilter = {
  value: string,
  filterType: FilterType,
  fields: string[]
}

export type FilterElement = {
  field: string,
  filterType: FilterType
  value: FilterValue
}

export type sortDirection = 'ascend' | 'descend'

export type Pagination = {
  current: number,
  pageSize: number,
  total: number,
  defaultPageSize: number,
  pageSizeOptions: number[],
}

export class FiltersManager {
  private fieldsFilter: FieldsFilter
  private globalFilter?: GlobalFilter

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

      let filters = this.fieldsFilter.get(fieldName)
      if (!filters) {
        filters = []
      }
      filters.push({
        filterType,
        value: arrayValue,
      })
      this.fieldsFilter.set(fieldName, filters)
    } catch (error) {
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

  buildAppliedFilter(): FilterElement[][] {
    const filterGroups: FilterElement[][] = []

    if (this.globalFilter) {
      filterGroups.push(this.globalFilter.fields.map(field => ({
        field,
        filterType: this.globalFilter!.filterType,
        value: this.globalFilter!.value,
      })))
    }

    for (const [key, filters] of this.fieldsFilter) {
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
    return filterGroups
  }

  buildFilterFn(): (record: Record<string, unknown>) => boolean {
    return (record: Record<string, unknown>) => {
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
          case FilterType.after:
            if (dayjs.isDayjs(value) && !(dayjs(value).isBefore(filterValue))) {
              blockOk = true
            }
            break
          case FilterType.before:
            if (dayjs.isDayjs(value) && !(dayjs(value).isAfter(filterValue))) {
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
}

export const buildFilterFn = (filterGroups: FilterElement[][]): (record: Record<string, unknown>) => boolean => {
  return (record) => {
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
        case FilterType.after:
          if (dayjs.isDayjs(value) && !(dayjs(value).isBefore(filterValue))) {
            blockOk = true
          }
          break
        case FilterType.before:
          if (dayjs.isDayjs(value) && !(dayjs(value).isAfter(filterValue))) {
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

export const buildSortFn = (sort: Record<string, sortDirection>): ((
  valueA: Record<string, string>,
  recordB: Record<string, string>,
) => number) => {
  const [[field, direction]] = Object.entries(sort)
  return (recordA, recordB) => {
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

    return direction === 'ascend' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
  }
}

