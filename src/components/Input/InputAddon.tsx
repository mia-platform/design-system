import { ReactNode, useMemo } from 'react'
import classnames from 'classnames'

import { Checkbox } from '../Checkbox'
import { Select } from '../Select'
import { SelectItem } from '../Select/props.ts'
import styles from './input.module.css'

type InputAddonConfig<Type extends string, Config extends object = Record<string, unknown>> = {
  type: Type
  value?: unknown;
  defaultValue?: unknown
  onChange?: (value: unknown) => void
} & Config

type TextConfig = InputAddonConfig<'text'>
type SelectConfig = InputAddonConfig<'select', {options: SelectItem<unknown>[]}>
type CheckboxConfig = InputAddonConfig<'checkbox'>

export type InputAddonProps =
  {
    isReadOnly?: boolean
    isDisabled?: boolean
    isError?: boolean
  } & (
    | TextConfig
    | SelectConfig
    | CheckboxConfig
  )

const isText = (props: InputAddonProps): props is TextConfig => props.type === 'text'
const isSelect = (props: InputAddonProps): props is SelectConfig => props.type === 'select'
const isCheckbox = (props: InputAddonProps): props is CheckboxConfig => props.type === 'checkbox'

export const InputAddon = ({ isError, isDisabled, onChange, ...config }: InputAddonProps) : ReactNode => {
  const className = useMemo(() => classnames([
    styles.inputAddon,
    isSelect(config) && styles.inputAddonSelect,
    isCheckbox(config) && styles.inputAddonCheckbox,
  ]), [config])

  const addon = useMemo(() => {
    if (isText(config)) {
      return String(config.value)
    }
    if (isSelect(config)) {
      const { type: _, ...props } = config
      return (
        <Select
          isDisabled={isDisabled}
          isError={isError}
          isFullWidth={false}
          onSelect={(value) => {
            if (onChange) {
              onChange(value)
            }
          }}
          {...props}
        />
      )
    }
    if (isCheckbox(config)) {
      const { type: _, defaultValue, value, ...props } = config
      return (
        <Checkbox
          isDisabled={isDisabled}
          {...(value !== undefined && { isChecked: Boolean(value) })}
          isInitiallyChecked={Boolean(defaultValue)}
          onChange={(event) => {
            if (onChange) {
              onChange(event.target.checked)
            }
          }}
          {...props}
        />
      )
    }
    return undefined
  }, [config, isDisabled, isError, onChange])
  return (
    <div className={className}>
      {addon}
    </div>
  )
}
