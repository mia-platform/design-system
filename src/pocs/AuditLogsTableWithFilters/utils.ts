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

  getFilters(): {fieldsFilters: FieldsFilter, globalFilters?: GlobalFilter} {
    return {
      fieldsFilters: this.fieldsFilter,
      globalFilters: this.globalFilter,
    }
  }
}

export type FilterElement = {
  field: string,
  filterType: FilterType
  value: FilterValue
}

