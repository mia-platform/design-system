import { FormItemProps as AntFormItemProps, FormProps as AntFormProps, FormInstance } from 'antd'
import { CSSProperties, ReactElement, ReactNode } from 'react'

import { Layout } from './types.ts'

export type RenderProps = {
  form?: FormInstance,
  value?: unknown;
  onChange?: (value: unknown) => void
}

export type FormProps<Values extends Record<string, unknown>> = {

  /**
   * A unique identifier for the form.
   */
  id?: string;

  /**
   * The content of the form, typically form fields or other React elements.
   */
  children?: ReactNode;

  /**
   * The number of columns for form layout. Determines how form fields are arranged.
   */
  columns?: number;

  /**
   * The gap (in pixels) between form fields.
   */
  gap?: number;

  /**
   * Defines the layout direction of the form. Can be 'horizontal' or 'vertical'.
   */
  layout?: Layout

  /**
   * Custom styles for the form, passed as a CSSProperties object.
   */
  style?: CSSProperties;

  /**
   * The initial values for the form fields.
   */
  initialValues?: Values;

  /**
   * Specifies whether to retain field values when the field is removed from the form. Defaults to `true`.
   */
  preserve?: boolean;

  /**
   * Renders a submit button. Can be a boolean (to toggle default button), a string (button text),
   * or a function that receives the form instance and returns a custom ReactNode.
   */
  submitButton?: boolean | string | ((props: RenderProps) => ReactNode);

  /**
   * Callback triggered when the form values change.
   */
  onValuesChange?: AntFormProps<Values>['onValuesChange'];

  /**
   * Callback triggered when the form is successfully submitted.
   */
  onFinish?: AntFormProps<Values>['onFinish'];

  /**
   * Callback triggered when form submission fails validation.
   */
  onFinishFailed?: AntFormProps<Values>['onFinishFailed'];
}

export type FormItemProps = {
  name?: string
  label?: ReactNode
  style?: CSSProperties
  span?: number
  justify?: 'start' | 'center' | 'end'
  isFullWidth?: boolean,
  rules?: AntFormItemProps['rules']
  valuePropName?: AntFormItemProps['valuePropName']
  getValueFromEvent?: AntFormItemProps['getValueFromEvent']
  children: ReactElement | ((props: RenderProps) => ReactNode)
  shouldUpdate?: boolean
}
