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
  mockedTextEntries?: string[],
}

const getTextComponent = (value: string | undefined): ReactNode => (<span key={`item-${value}`}>{value}</span>)

export const SeparateTextComponent = ({
  children,
  mockedTextEntries,
}: SplitTextComponentProps): ReactElement => {
  const defaultTextEntries = ['Text mocked 1', 'Text mocked 2']
  const textEntries = mockedTextEntries || defaultTextEntries

  const separatedComponents = textEntries
    .reduce((acc: ReactNode[], value, i) => {
      if (i === textEntries.length - 1) {
        return [
          ...acc,
          getTextComponent(textEntries.at(textEntries.length - 1)),
        ]
      }

      return [
        ...acc,
        getTextComponent(value),
        children,
      ]
    }, [])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {separatedComponents}
    </>
  )
}
