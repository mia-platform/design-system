/**
 * Copyright 2023 Mia srl
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

import { Icon } from '../Icon'

export const stringOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
]

export const labeledOptions = [
  { icon: <Icon name="MiaPlatform" size={16} />, label: 'Option 1', isDisabled: false, key: 'one' },
  { icon: <Icon name="PiChartPieSlice" size={16} />, label: 'Option 2', isDisabled: false, key: 'two' },
  { icon: <Icon name="AiOutlineDesktop" size={16} />, label: 'Option 3', isDisabled: true, key: 'three' },
  { icon: <Icon name="AiOutlineFieldTime" size={16} />, label: 'Option 4', isDisabled: false, key: 'four' },
  { icon: <Icon name="AiOutlineLock" size={16} />, label: 'Option 5', isDisabled: false, key: 'five' },
  { icon: <Icon name="AiOutlineFork" size={16} />, label: 'Option 6', isDisabled: false, key: 'six' },
  { icon: <Icon name="AiOutlineFilter" size={16} />, label: 'Option 7', isDisabled: false, key: 'seven' },
]
