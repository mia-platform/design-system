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

import { Flex } from 'antd'
import { PiPlaceholder } from 'react-icons/pi'
import { fireEvent } from '@testing-library/dom'

import { CardSelection, defaults } from './CardSelection'
import { render, screen } from '../../test-utils.tsx'
import { Tag } from '../Tag'

// Default props for the CardSelection component
const defaultProps = {
  ...defaults,
  title: 'Title',
  subtitle: 'Subtitle',
  icon: PiPlaceholder,
  children: (
    <Flex gap={8}>
      <Tag color="blue">Tag name</Tag>
      <Tag color="red">Tag name</Tag>
    </Flex>
  ),
}

describe('CardSelection Snapshot Tests', () => {
  it('renders Vertical correctly', () => {
    const { asFragment } = render(<CardSelection {...defaultProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Horizontal correctly', () => {
    const { asFragment } = render(
      <CardSelection {...defaultProps} layout={CardSelection.Layout.Horizontal} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders VerticalCheckbox correctly', () => {
    const { asFragment } = render(
      <CardSelection {...defaultProps} inputType={CardSelection.InputType.Checkbox} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders HorizontalCheckbox correctly', () => {
    const { asFragment } = render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Checkbox}
        layout={CardSelection.Layout.Horizontal}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders VerticalRadio correctly', () => {
    const { asFragment } = render(
      <CardSelection {...defaultProps} inputType={CardSelection.InputType.Radio} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders HorizontalRadio correctly', () => {
    const { asFragment } = render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Radio}
        layout={CardSelection.Layout.Horizontal}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders CheckboxDisabled correctly', () => {
    const { asFragment } = render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Checkbox}
        isChecked={true}
        isDisabled={true}
        layout={CardSelection.Layout.Horizontal}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders RadioDisabled correctly', () => {
    const { asFragment } = render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Radio}
        isChecked={true}
        isDisabled={true}
        layout={CardSelection.Layout.Horizontal}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should call on click and change input value', () => {
    const onClick = jest.fn()
    const value = jest.fn()
    render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Radio}
        value={value}
        onClick={onClick}
      />
    )
    fireEvent.click(screen.getByRole('img'))
    expect(onClick).toHaveBeenCalledWith(true, value)
    expect(screen.getByRole('radio')).toBeChecked()
  })

  test('should not call on click and change input value if disabled', () => {
    const onClick = jest.fn()
    render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Radio}
        isDisabled
        onClick={onClick}
      />
    )
    fireEvent.click(screen.getByRole('img'))
    expect(onClick).not.toHaveBeenCalled()
    expect(screen.getByRole('radio')).not.toBeChecked()
  })

  test('should accept a controlled value and render correctly', () => {
    const onClick = jest.fn()
    render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Radio}
        isChecked
        isDisabled
        onClick={onClick}
      />
    )

    expect(screen.getByRole('radio')).toBeChecked()
  })
})
