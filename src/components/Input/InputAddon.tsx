import { ReactNode } from 'react'

import { AddonType } from './types.ts'
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
  Type extends AddonType,
  Config extends object = object
> = Config & {
  type: Type
  onChange?: (value: unknown) => void
  value?: unknown;
  defaultValue?: unknown
}

type TextConfig = InputAddonConfig<AddonType.Text>

type SelectConfig = InputAddonConfig<
  AddonType.Select, {
  options: SelectItem<unknown>[]
  placeholder?: string
}>
type CheckboxConfig = InputAddonConfig<
  AddonType.Checkbox, {
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

const isText = (props: InputAddonProps): props is TextConfig => props.type === AddonType.Text
const isSelect = (props: InputAddonProps): props is SelectConfig => props.type === AddonType.Select
const isCheckbox = (props: InputAddonProps): props is CheckboxConfig => props.type === AddonType.Checkbox

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
}
