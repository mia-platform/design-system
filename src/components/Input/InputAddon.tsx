import { ReactNode } from 'react'

import { Checkbox } from '../Checkbox'
import { Select } from '../Select'
import { SelectItem } from '../Select/props.ts'
import styles from './input.module.css'

type InputAddonCommonProps =
  {
    isReadOnly?: boolean
    isDisabled?: boolean
  }

type InputAddonConfig<
  Type extends string,
  Config extends object = object
> = Config & {
  type: Type
  onChange?: (value: unknown) => void
  value?: unknown;
  defaultValue?: unknown
}

type TextConfig = InputAddonConfig<'text'>

type SelectConfig = InputAddonConfig<
  'select', {
  options: SelectItem<unknown>[]
  placeholder?: string
}>
type CheckboxConfig = InputAddonConfig<
  'checkbox', {
  value?: boolean
  defaultValue?: boolean
  label?: ReactNode
}>

export type InputAddonProps =
  InputAddonCommonProps & (
    | TextConfig
    | SelectConfig
    | CheckboxConfig
  )

const isText = (props: InputAddonProps): props is TextConfig => props.type === 'text'
const isSelect = (props: InputAddonProps): props is SelectConfig => props.type === 'select'
const isCheckbox = (props: InputAddonProps): props is CheckboxConfig => props.type === 'checkbox'

export const InputAddon = ({
  onChange,
  isDisabled,
  ...config
}: InputAddonProps) : ReactNode => {
  if (isText(config)) {
    return String(config.value)
  }
  if (isSelect(config)) {
    const { type: _, ...props } = config
    return (
      <div className={styles.inputAddonSelect}>
        <Select
          isDisabled={isDisabled}
          isFullWidth={false}
          onChange={onChange}
          {...props}
        />
      </div>
    )
  }
  if (isCheckbox(config)) {
    const { type: _, value, defaultValue, ...props } = config
    return (
      <div className={styles.inputAddonCheckbox}>
        <Checkbox
          isChecked={value}
          isDisabled={isDisabled}
          isInitiallyChecked={defaultValue}
          onChange={(event) => {
            if (onChange) {
              onChange(event.target.checked)
            }
          }}
          {...props}
        />
      </div>
    )
  }
  return undefined
}
