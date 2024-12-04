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

import { render, screen } from '../../test-utils.tsx'
import { CardSelection } from './CardSelection'
import { Tag } from '../Tag'

const options = [
  ...Array(3).keys(),
].map((id) => ({
  title: `title ${id + 1}`,
  subtitle: `subtitle ${id + 1}`,
  value: id + 1,
  icon: PiPlaceholder,
  content: (
    <Flex gap={8}>
      <Tag color="blue">Tag name</Tag>
      <Tag color="red">Tag name</Tag>
    </Flex>
  ),
}))

// Default props for the CardSelection component
const defaultProps = {
  options,
  layout: CardSelection.Layout.Vertical,

}

describe('CardSelection Tests', () => {
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

  it('renders WitCustomGap correctly', () => {
    const { asFragment } = render(
      <CardSelection {...defaultProps} gap={64} layout={CardSelection.Layout.Horizontal} />
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
        isDisabled={true}
        layout={CardSelection.Layout.Horizontal}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should call on onChange and change input value when checkbox', () => {
    const onChange = jest.fn()
    render(
      <CardSelection
        {...defaultProps}
        defaultValue={[1]}
        inputType={CardSelection.InputType.Checkbox}
        onChange={onChange}
      />
    )
    const checkbox = screen.getByRole('checkbox', { name: /title 2/i })
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith([1, 2])
    expect(checkbox).toBeChecked()
  })

  test('should call on onChange and change input value when radio', () => {
    const onChange = jest.fn()
    render(
      <CardSelection
        {...defaultProps}
        defaultValue={1}
        inputType={CardSelection.InputType.Radio}
        onChange={onChange}
      />
    )
    const checkbox = screen.getByRole('radio', { name: /title 2/i })
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(2)
    expect(checkbox).toBeChecked()
  })

  test('should not call on click and change input value if disabled', () => {
    const onClick = jest.fn()
    render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Checkbox}
        isDisabled
        onClick={onClick}
      />
    )
    const checkbox = screen.getByRole('checkbox', { name: /title 1/i })
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  test('should trigger on click when a card is pressed', () => {
    const onClick = jest.fn()
    render(
      <CardSelection
        {...defaultProps}
        inputType={CardSelection.InputType.Radio}
        value={1}
        onClick={onClick}
      />
    )

    screen.logTestingPlaygroundURL()
    fireEvent.click(screen.getByText(/subtitle 1/))
    expect(onClick).toHaveBeenCalledWith(1)
  })
})
