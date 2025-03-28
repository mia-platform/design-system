/**
 * Copyright 2024 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactElement, ReactNode, isValidElement, useCallback, useMemo } from 'react'
import { Form as AntForm } from 'antd'
import { PiBookOpen } from 'react-icons/pi'

import { Button } from '../../Button'
import { Checkbox } from '../../Checkbox'
import { FormItemProps } from '../props.ts'
import ICircleFilled from '../../../assets/icons/ICircleFilled.svg'
import { Icon } from '../../Icon'
import { Input } from '../../Input'
import { InputNumber } from '../../InputNumber'
import { RadioGroup } from '../../RadioGroup'
import { Select } from '../../Select'
import { SelectProps } from '../../Select/props.ts'
import { Switch } from '../../Switch'
import { TextArea } from '../../TextArea'
import { Tooltip } from '../../Tooltip'
import { Typography } from '../../Typography/index.ts'
import log from '../../../utils/log.ts'
import styles from './FormItem.module.css'

const defaults = {
  span: 1,
  isFullWidth: false,
}

const getDefaultReadOnlyElement = (element: ReactElement, value: unknown): ReactNode => {
  const { type, props } = element
  switch (type) {
  case Input:
  case InputNumber:
  case TextArea: {
    return (
      <Typography.BodyS>
        {value ? String(value) : '-'}
      </Typography.BodyS>
    )
  }
  case Select: {
    const { options } = props as SelectProps
    const selectedOptions = options.filter(({ value: val }) => {
      return Array.isArray(value) ? value.includes(val) : value === val
    }) || []
    const text = selectedOptions
      .map(({ label }) => String(label))
      .join(', ') || '-'
    return (
      <Typography.BodyS>
        {text}
      </Typography.BodyS>
    )
  }
  default:
    log.error(`read-only ${type} is unimplemented: provide your own custom render`)
    return undefined
  }
}

const getDefaultFormItemProps = ({ type }: ReactElement): Partial<FormItemProps> => {
  switch (type) {
  case Input:
    return {
      getValueFromEvent: (_, value) => value,
    }
  case Checkbox:
    return {
      valuePropName: 'isChecked',
      getValueFromEvent: ({ target }) => target.checked,
    }
  case Switch:
    return {
      valuePropName: 'isChecked',
    }
  case RadioGroup:
    return {
      getValueFromEvent: ({ value }) => value,
    }
  default:
    return {}
  }
}

export const FormItem = (
  {
    children,
    name,
    style: styleProp,
    span = defaults.span,
    justify,
    isFullWidth = defaults.isFullWidth,
    label: labelProp = name,
    rules,
    valuePropName,
    getValueFromEvent,
    shouldUpdate,
    dependencies,
    isRequired,
    isReadOnly,
    docLink,
    tooltip,
    extra: extraProp,
    extraIcon: extraIconProp,
  }: FormItemProps
): ReactElement => {
  const form = AntForm.useFormInstance()

  const style = useMemo(() => ({
    margin: 0,
    ...justify && { justifySelf: justify },
    ...span && { gridColumn: `span ${span}` },
    ...isFullWidth && { gridColumn: `-1 / 1` },
    ...styleProp,
  }), [isFullWidth, justify, span, styleProp])

  const defaultFormItemProps = useMemo(() => {
    if (isValidElement(children)) {
      return getDefaultFormItemProps(children)
    }
    if (typeof children === 'function' && !name) {
      // See https://ant.design/components/form#shouldupdate
      return { shouldUpdate: true }
    }
    return {}
  }, [children, name])

  const inputElement = useMemo(() => {
    if (isValidElement(children)) {
      if (isReadOnly) {
        const value = form.getFieldValue(name) || {}
        return getDefaultReadOnlyElement(children, value)
      }
      return children
    }
    if (typeof children === 'function') {
      if (!name) {
        return () => children({ form })
      }
      const CustomInput = children
      return (
        <CustomInput form={form} />
      )
    }
    log.error('inputElement must be a valid element or a function')
  }, [children, isReadOnly, name, form])

  const onClickDocLink = useCallback(() => {
    window.open(docLink, '_blank')
  }, [docLink])

  const label = useMemo(() => {
    if (labelProp || tooltip || docLink) {
      return (
        <div className={styles.labelContainer}>
          {labelProp}
          {tooltip && (
            <Tooltip {...tooltip}>
              <div className={styles.tooltipContainer}>
                <Icon component={ICircleFilled} size={16} />
              </div>
            </Tooltip>
          )}
          {docLink && (
            <div className={styles.docLinkContainer}>
              <Button
                icon={<Icon aria-label="doc-link" component={PiBookOpen} size={16} />}
                shape={Button.Shape.Circle}
                type={Button.Type.Ghost}
                onClick={onClickDocLink}
              />
            </div>
          )}
        </div>
      )
    }
  }, [docLink, labelProp, onClickDocLink, tooltip])

  const extra = useMemo(() => {
    if (extraIconProp || extraProp) {
      return (
        <div className={styles.extraContainer}>
          {extraIconProp && (
            <Icon component={extraIconProp} size={16} />
          )}
          {extraProp}
        </div>
      )
    }
  }, [extraIconProp, extraProp])

  return (
    <AntForm.Item
      {...defaultFormItemProps}
      {...shouldUpdate && { shouldUpdate }}
      {...getValueFromEvent && { getValueFromEvent }}
      {...valuePropName && { valuePropName }}
      dependencies={dependencies}
      extra={extra}
      label={label}
      name={name}
      required={isRequired}
      rules={rules}
      style={style}
    >
      {inputElement}
    </AntForm.Item>
  )
}
