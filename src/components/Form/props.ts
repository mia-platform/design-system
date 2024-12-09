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

  /**
   * The name of the form field, used for form data management.
   */
  name?: string;

  /**
   * The label for the field, displayed next to or above the form element.
   */
  label?: ReactNode;

  /**
   * Inline style for the FormItem container.
   */
  style?: CSSProperties;

  /**
   * The number of grid columns the FormItem should span.
   */
  span?: number;

  /**
   * Alignment of the content within the FormItem.
   */
  justify?: 'start' | 'center' | 'end';

  /**
   * Whether the FormItem should take the full width of its container.
   */
  isFullWidth?: boolean;

  /**
   * Validation rules for the form field.
   */
  rules?: AntFormItemProps['rules'];

  /**
   * The property name used for the value of the form element (e.g., `checked` for a Checkbox).
   */
  valuePropName?: AntFormItemProps['valuePropName'];

  /**
   * Function to extract the value from the event generated by the form element.
   */
  getValueFromEvent?: AntFormItemProps['getValueFromEvent'];

  /**
   * Content of the FormItem; can be a React element or a render function.
   */
  children: ReactElement | ((props: RenderProps) => ReactNode);

  /**
   * Whether the FormItem should update when the state of other fields changes.
   */
  shouldUpdate?: boolean;

  /**
   * List of fields that this FormItem depends on, used to trigger conditional updates.
   */
  dependencies?: string[];

  /**
   * Help text displayed below the form field.
   */
  help?: ReactNode;

  /**
   * Additional content displayed below the FormItem, similar to `help` but for more general purposes.
   */
  extra?: ReactNode;

  /**
   * Whether the field is required, showing an asterisk and applying validation.
   */
  required?: boolean;
};

