import { Checkbox, Radio, RadioChangeEvent } from 'antd'
import { ComponentType, ReactElement, useCallback, useMemo } from 'react'

import { InputType, Layout } from './types.ts'
import { CardSelection } from './index.ts'
import { Props } from './props.ts'
import styles from './CardSelection.module.css'

const defaults = {
  gap: 24,
  layout: Layout.Vertical,
}

export const CardSelectionList = <T, >({
  type,
  layout = defaults.layout,
  gap = defaults.gap,
  options,
  isDisabled,
  onChange,
}: Props<T>): ReactElement => {
  const isInput = type === InputType.Radio || type === InputType.Checkbox

  const Component = useMemo(() => {
    switch (type) {
    case InputType.Checkbox:
      return Checkbox.Group
    case InputType.Radio:
      return Radio.Group
    default:
      return 'div' as unknown as ComponentType
    }
  }, [type])

  const handleChange = useCallback((value: T[] | RadioChangeEvent) : void => {
    if (onChange) {
      onChange(Array.isArray(value) ? value : [value.target.value])
    }
  }, [onChange])

  const children = useMemo(
    () => options.map(({ id, disabled, ...rest }, index) => (
      <CardSelection
        inputType={type}
        isDisabled={isDisabled || disabled}
        key={id || index}
        layout={layout}
        {...rest}
      />
    )), [isDisabled, layout, options, type])

  return (
    <Component
      className={styles.list}
      style={{ gap }}
      {...(isInput && {
        disabled: isDisabled,
        onChange: !isDisabled ? handleChange : undefined,
      })}
    >
      {children}
    </Component>
  )
}

CardSelectionList.Type = InputType
