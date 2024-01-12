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

import { ReactElement, ReactNode } from 'react'

type SplitTextComponentProps = {
  children: ReactNode,
  mockedText1?: string,
  mockedText2?: string,
}

export const SplitTextComponent = ({
  children,
  mockedText1,
  mockedText2,
}: SplitTextComponentProps): ReactElement => {
  const text1 = mockedText1 || 'Text mocked 1'
  const text2 = mockedText2 || 'Text mocked 2'

  return (
    <>
      <span>{text1}</span>
      {children}
      <span>{text2}</span>
    </>
  )
}
