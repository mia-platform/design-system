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

import { MouseEventHandler, ReactNode } from 'react'
import { RadioChangeEvent } from 'antd'

import { Direction } from './types.ts'

export type RadioGroupOption<T> = {

  /**
   * Optional key associated to the option
   */
  key?: string

  /**
   * The value associated with the Radio option
   */
  value: T;

  /**
   * The text used to display the radio option
   */
  label: string;

  /**
   * description of the label that is placed underneath thelabel
   */
  description?: string;

  /**
   * Specifies whether the Radio option is disabled
   */
  disabled?: boolean;

  /**
   * Adds the Title attribute value
   */
  title?: string;

  /**
   * Adds the Radio Id attribute value
   */
  id?: string;
};

export type RadioGroupChangeEvent<T> = {

  /**
   * the value of the option selected
   */
  value: T;

  event: RadioChangeEvent;
};

export type RadioGroupProps<T> = {

  /**
   * Options of the group radio
   */
  options: RadioGroupOption<T>[];

  /**
   * The selected value displayed on first render
   */
  defaultValue?: T;

  /**
   * Used for setting the currently selected value
   */
  value?: T;

  /**
   * If true, disable all radio buttons
   */
  isDisabled?: boolean;

  /**
   * The callback function that is triggered when the state changes
   */
  onChange?: (changeEvent: RadioGroupChangeEvent<T>) => void;

  /**
   * The direction of the radio group. Defaults to 'vertical'
   */
  direction?: Direction
};

export type RadioProps<T> = {
  value?: T;
  children?: ReactNode
  className?: string
  label?: string;
  description?: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  onChange?: (event: RadioChangeEvent) => void;
};
