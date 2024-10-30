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

import { RadioChangeEvent } from 'antd'

export type RadioGroupOption<T> = {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
  title?: string;
  id?: string;
};

export type RadioGroupChangeEvent<T> = {
  value: T;
  event: RadioChangeEvent;
};

export type RadioGroupProps<T> = {
  options: RadioGroupOption<T>[];
  defaultValue: T;
  isDisabled?: boolean;
  onChange?: (changeEvent: RadioGroupChangeEvent<T>) => void;
};
