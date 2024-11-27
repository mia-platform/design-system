import { ReactElement, useCallback, useMemo, useState } from 'react'
import classnames from 'classnames'

import { CardSelectionProps } from './props.ts'
import { Checkbox } from '../Checkbox'
import { Icon } from '../Icon'
import { Radio } from '../RadioGroup/components/Radio'
import { Type } from './types.ts'
import styles from './CardSelection.module.css'

export const defaults = {}

export const CardSelection = <T, >({
  children,
  horizontal,
  type,
  icon,
  title,
  subtitle,
  value,
  isDisabled,
  isChecked: isCheckedProp,
  onClick,
}: CardSelectionProps<T>): ReactElement => {
  const [isChecked, setIsChecked] = useState(isCheckedProp)

  const className = useMemo(() => classnames([
    styles.card,
    horizontal && styles.horizontal,
    isChecked && styles.selected,
    isDisabled && styles.disabled,
  ]), [horizontal, isChecked, isDisabled])

  const action = useMemo(() => {
    switch (type) {
    case Type.Radio:
      return <Radio isChecked={isChecked} isDisabled={isDisabled} value={value} />
    case Type.Checkbox:
      return <Checkbox isChecked={isChecked} isDisabled={isDisabled} value={value} />
    default:
      return undefined
    }
  }, [isChecked, isDisabled, type, value])

  const handleClick = useCallback(() => {
    const nextChecked = !isChecked
    setIsChecked(nextChecked)
    if (onClick) {
      onClick(nextChecked)
    }
  }, [isChecked, onClick])

  return (
    <div className={className} onClick={!isDisabled ? handleClick : undefined}>
      <div className={styles.header}>
        {
          icon && <Icon component={icon} size={horizontal ? 24 : 32} />
        }
        <span className={styles.title}>{title}</span>
      </div>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      {
        action && (
          <div className={styles.actionContainer}>
            {action}
          </div>
        )
      }
      {children}
    </div>
  )
}

CardSelection.Type = Type
