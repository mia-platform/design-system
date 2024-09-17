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

import { act, renderHook } from '../../test-utils'
import { useDrawer } from './useDrawer'

describe('useDrawer', () => {
  it('returns updated visibility state', () => {
    const { result } = renderHook(() => useDrawer())
    const { isVisible, openDrawer, closeDrawer, toggleDrawer } = result.current

    expect(isVisible).toBeFalsy()
    act(() => openDrawer())
    expect(result.current.isVisible).toEqual(true)
    act(() => closeDrawer())
    expect(result.current.isVisible).toEqual(false)
    act(() => toggleDrawer())
    expect(result.current.isVisible).toEqual(true)
    act(() => toggleDrawer())
    expect(result.current.isVisible).toEqual(false)
  })
})
