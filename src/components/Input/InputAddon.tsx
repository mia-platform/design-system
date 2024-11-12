import { ReactNode, useMemo } from 'react'
import classnames from 'classnames'

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

export const InputAddon = ({ isError, isDisabled, ...config }: InputAddonProps) : ReactNode => {
  const className = useMemo(() => classnames([
    styles.inputAddon,
    isSelect(config) && styles.inputAddonSelect,
    isCheckbox(config) && styles.inputAddonCheckbox,
  ]), [config])

  const addon = useMemo(() => {
    if (isText(config)) {
      return config.value
    }
    if (isSelect(config)) {
      const { type: _, ...props } = config
      return (
        <Select
          isDisabled={isDisabled}
          isError={isError}
          isFullWidth={false}
          {...props}
        />
      )
    }
    if (isCheckbox(config)) {
      const { type: _, ...props } = config
      return (
        <Checkbox
          isDisabled={isDisabled}
          {...props}
        />
      )
    }
    return undefined
  }, [config, isDisabled, isError])
  return (
    <div className={className}>
      {addon}
    </div>
  )
}
