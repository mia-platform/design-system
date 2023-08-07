import lodash from 'lodash'

/*
 * Generate CSS variables from theme configuration
 */
export default function themeToVariables(theme = {}, prefix = '-'): Record<string, string> {
  const fields = Object.entries(theme)

  return fields.reduce((variables, [field, value]) => {
    const fieldName = [prefix, field].join('-')
    const isNested = lodash.isObject(value)

    return {
      ...variables,
      ...isNested
        ? themeToVariables(value, fieldName)
        : { [fieldName]: value },
    }
  }, {})
}
