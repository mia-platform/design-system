import { ReactNode, useMemo } from 'react'

import { Checkbox } from '../Checkbox'
import { CheckboxProps } from '../Checkbox/props.ts'
import { Select } from '../Select'
import { SelectProps } from '../Select/props.ts'
import styles from './input.module.css'

type InputAddonConfig<Type extends string, Config extends object> = {type: Type} & Config

type TextConfig = InputAddonConfig<'text', {value: string}>
type SelectConfig = InputAddonConfig<'select', SelectProps>
type CheckboxConfig = InputAddonConfig<'checkbox', CheckboxProps>

export type InputAddonProps =
  | TextConfig
  | SelectConfig
  | CheckboxConfig

const isText = (props: InputAddonProps): props is TextConfig => props.type === 'text'
const isSelect = (props: InputAddonProps): props is SelectConfig => props.type === 'select'
const isCheckbox = (props: InputAddonProps): props is CheckboxConfig => props.type === 'checkbox'

export const InputAddon = (props: InputAddonProps) : ReactNode => {
  const addon = useMemo(() => {
    if (isText(props)) {
      return props.value
    }
    if (isSelect(props)) {
      const { type: _, ...config } = props
      return <Select isFullWidth={false} {...config} />
    }
    if (isCheckbox(props)) {
      const { type: _, ...config } = props
      return <Checkbox {...config} />
    }
    return undefined
  }, [props])
  return (
    <div className={styles.inputAddon}>
      {addon}
    </div>
  )
}
