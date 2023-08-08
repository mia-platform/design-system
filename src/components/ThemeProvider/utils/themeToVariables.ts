import lodash from 'lodash'

/**
 * Converts a theme configuration into CSS variables.
 *
 * @param {Theme} theme - The theme configuration to convert.
 * @param {string} prefix - Incremental prefix composing the CSS variable names (e.g. -, --palette, --palette-primary).
 * @returns {Record<string, string>} A record of CSS variable names and their corresponding values.
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
