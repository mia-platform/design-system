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

import { TreeDataNode } from 'antd'

import { fireEvent, render, screen, waitFor } from '../../test-utils'
import { Icon } from '../Icon'
import { Tree } from '.'

const defaultTreeData: TreeDataNode[] = [
  {
    title: 'Fruits',
    key: 'fruits',
    children: [
      {
        title: 'Favorites',
        key: 'favorites',
        children: [
          {
            title: 'Apple',
            key: 'apple',
          },
          {
            title: 'Banana',
            key: 'banana',
          },
          {
            title: 'Peach',
            key: 'peach',
          },
        ],
      },
      {
        title: 'Others',
        key: 'others',
        children: [
          {
            title: 'Strawberry',
            key: 'strawberry',
          },
          {
            title: 'Pineapple',
            key: 'pineapple',
          },
          {
            title: 'Fig',
            key: 'fig',
          },
        ],
      },
    ],
  },
  {
    title: 'Vegetables',
    key: 'vegetables',
    children: [
      {
        title: 'Spinach',
        key: 'spinach',
      },
      {
        title: 'Leek',
        key: 'leek',
      },
    ],
  },
]

describe('Tree Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders Tree', async() => {
    const { asFragment } = render(<Tree treeData={defaultTreeData} />)

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByText('Vegetables')).toBeInTheDocument()
    const [, vegetablesCaret] = screen.getAllByRole('img', { name: /caret-down/i })
    fireEvent.click(vegetablesCaret)

    await waitFor(() => { expect(screen.getByText('Spinach')).toBeInTheDocument() })
    expect(screen.getByText('Leek')).toBeInTheDocument()
  })

  test('nodes can be selected', async() => {
    const onSelectMock = jest.fn()
    render(<Tree treeData={defaultTreeData} onSelect={onSelectMock} />)

    const [, vegetablesCaret] = screen.getAllByRole('img', { name: /caret-down/i })
    fireEvent.click(vegetablesCaret)

    const leekNode = await screen.findByText('Leek')
    fireEvent.click(leekNode)

    await waitFor(() => { expect(onSelectMock).toHaveBeenCalledTimes(1) })
    expect(onSelectMock).toHaveBeenCalledWith(['leek'], expect.any(Object))
  })

  test('nodes cannot be selected', async() => {
    const onSelectMock = jest.fn()
    render(<Tree selectable={false} treeData={defaultTreeData} onSelect={onSelectMock} />)

    const [, vegetablesCaret] = screen.getAllByRole('img', { name: /caret-down/i })
    fireEvent.click(vegetablesCaret)

    const leekNode = await screen.findByText('Leek')
    fireEvent.click(leekNode)

    expect(onSelectMock).toHaveBeenCalledTimes(0)
  })

  test('nodes can be checked', async() => {
    const treeData: TreeDataNode[] = [
      {
        title: 'Fruits',
        key: 'fruits',
      },
      {
        title: 'Vegetables',
        key: 'vegetables',
      },
    ]

    const onCheckMock = jest.fn()
    const { container } = render(<Tree checkable={true} treeData={treeData} onCheck={onCheckMock} />)

    // Unfortunately, checkboxes inside the tree does not include the "checkbox" attribute
    // We need to find them via class name
    const checkboxes = container.getElementsByClassName('mia-platform-tree-checkbox')
    expect(checkboxes).toHaveLength(2)

    fireEvent.click(checkboxes[0])
    await waitFor(() => { expect(onCheckMock).toHaveBeenCalledTimes(1) })
    expect(onCheckMock).toHaveBeenCalledWith(['fruits'], expect.any(Object))

    fireEvent.click(checkboxes[1])
    await waitFor(() => { expect(onCheckMock).toHaveBeenCalledTimes(2) })
    expect(onCheckMock).toHaveBeenCalledWith(['fruits', 'vegetables'], expect.any(Object))

    fireEvent.click(checkboxes[0])
    await waitFor(() => { expect(onCheckMock).toHaveBeenCalledTimes(3) })
    expect(onCheckMock).toHaveBeenCalledWith(['vegetables'], expect.any(Object))
  })

  test('icons are visible', async() => {
    const treeData = [
      {
        title: 'Arrows',
        key: 'arrow',
        icon: <Icon name="PiArrowUpFill" size={16} />,
        children: [
          {
            title: 'Up',
            key: 'arrow-up',
            icon: <Icon name="PiArrowUp" size={16} />,
          },
          {
            title: 'Left',
            key: 'arrow-left',
            icon: <Icon name="PiArrowLeft" size={16} />,
          },
          {
            title: 'Down',
            key: 'arrow-down',
            icon: <Icon name="PiArrowDown" size={16} />,
          },
          {
            title: 'Right',
            key: 'arrow-right',
            icon: <Icon name="PiArrowRight" size={16} />,
          },
        ],
      },
    ]

    render(<Tree showIcon treeData={treeData} />)

    expect(screen.getByRole('img', { name: 'PiArrowUpFill' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('img', { name: /caret-down/i }))

    await waitFor(() => { expect(screen.getByRole('img', { name: 'PiArrowUp' })).toBeInTheDocument() })
    expect(screen.getByRole('img', { name: 'PiArrowDown' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'PiArrowLeft' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'PiArrowRight' })).toBeInTheDocument()
  })
})
