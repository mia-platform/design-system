import { Checkbox as AntCheckbox, Radio as AntRadio, RadioChangeEvent } from 'antd'
import { ComponentType, ReactElement, ReactNode, useCallback, useMemo } from 'react'
import classnames from 'classnames'

import { InputType, Layout } from './types.ts'
import { CardSelectionProps } from './props.ts'
import { Checkbox } from '../Checkbox'
import { Icon } from '../Icon'
import { IconComponent } from '../Icon/Icon.props.ts'
import { Radio } from '../RadioGroup/components/Radio'
import styles from './CardSelection.module.css'

const DIV = 'div' as unknown as ComponentType

export const defaults = {
  gap: 24,
  layout: Layout.Vertical,
}

const CardSelectionItem = <T, >({
  component: Component,
  title,
  subtitle,
  icon,
  isDisabled,
  isHorizontal,
  children,
  value,
  onClick,
}: {
  component: ComponentType<Record<string, unknown>>
  title: ReactNode,
  subtitle?: ReactNode,
  icon?: IconComponent,
  children?: ReactNode,
  isDisabled?: boolean,
  isHorizontal?: boolean,
  value?: T
  onClick?: (value?: T) => void
  }
): ReactElement => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(value)
    }
  }, [onClick, value])
  return (
    <Component
      // If the component is a 'div', we won't pass the prop 'isDisabled' and 'value'
      // as are unsupported by the component, and would React complains in the browser console.
      {...Component !== DIV && { isDisabled, value }}
      className={classnames(styles.card, isDisabled && styles.disabled)}
      onClick={handleClick}
    >
      <div className={classnames(styles.content, isHorizontal && styles.horizontal)}>
        <div className={styles.header}>
          {
            icon && <Icon component={icon} size={isHorizontal ? 24 : 32} />
          }
          <span className={styles.title}>{title}</span>
        </div>
        {subtitle && (
          <span className={styles.subtitle}>{subtitle}</span>
        )}
        {children}
      </div>
    </Component>
  )
}

// eslint-disable-next-line react/no-multi-comp
export const CardSelection = <T, >({
  value,
  defaultValue,
  inputType,
  layout = defaults.layout,
  gap = defaults.gap,
  options,
  isDisabled,
  onChange,
  onClick,
}: CardSelectionProps<T>): ReactElement => {
  const { Container, Item }: {
    Container: ComponentType<Record<string, unknown>>
    Item: ComponentType<Record<string, unknown>>
  } = useMemo(() => {
    switch (inputType) {
    case InputType.Checkbox:
      return { Container: AntCheckbox.Group, Item: Checkbox }
    case InputType.Radio:
      return { Container: AntRadio.Group, Item: Radio }
    default:
      return { Container: DIV, Item: DIV }
    }
  }, [inputType])

  const handleClick = useCallback((val?: T) => {
    if (onClick) {
      onClick(val)
    }
  }, [onClick])

  const handleChange = useCallback((val: T[] | RadioChangeEvent) : void => {
    if (onChange) {
      onChange(Array.isArray(val) ? val : val.target.value)
    }
  }, [onChange])

  const children = useMemo(() => (
    options.map(({
      id,
      value: optionValue,
      title,
      subtitle,
      icon,
      content,
      disabled,
    }, index) => {
      return (
        <CardSelectionItem
          component={Item}
          icon={icon}
          isDisabled={isDisabled || disabled}
          isHorizontal={layout === Layout.Horizontal}
          key={id || index}
          subtitle={subtitle}
          title={title}
          value={optionValue}
          onClick={handleClick}
        >
          {content}
        </CardSelectionItem>
      )
    })), [Item, handleClick, isDisabled, layout, options])

  return (
    <Container
      className={styles.list}
      style={{ gap }}
      {...inputType && {
        defaultValue,
        ...value && { value },
        disabled: isDisabled,
        onChange: !isDisabled ? handleChange : undefined,
      }}
    >
      {children}
    </Container>
  )
}

CardSelection.InputType = InputType
CardSelection.Layout = Layout

