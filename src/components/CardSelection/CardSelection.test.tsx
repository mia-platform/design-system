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
      <CardSelection {...defaultProps} horizontal={true} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders VerticalCheckbox correctly', () => {
    const { asFragment } = render(
      <CardSelection {...defaultProps} type={CardSelection.Type.Checkbox} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders HorizontalCheckbox correctly', () => {
    const { asFragment } = render(
      <CardSelection
        {...defaultProps}
        horizontal={true}
        type={CardSelection.Type.Checkbox}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders VerticalRadio correctly', () => {
    const { asFragment } = render(
      <CardSelection {...defaultProps} type={CardSelection.Type.Radio} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders HorizontalRadio correctly', () => {
    const { asFragment } = render(
      <CardSelection
        {...defaultProps}
        horizontal={true}
        type={CardSelection.Type.Radio}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders CheckboxDisabled correctly', () => {
    const { asFragment } = render(
      <CardSelection
        {...defaultProps}
        horizontal={true}
        isChecked={true}
        isDisabled={true}
        type={CardSelection.Type.Checkbox}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders RadioDisabled correctly', () => {
    const { asFragment } = render(
      <CardSelection
        {...defaultProps}
        horizontal={true}
        isChecked={true}
        isDisabled={true}
        type={CardSelection.Type.Radio}
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
        type={CardSelection.Type.Radio}
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
        isDisabled
        type={CardSelection.Type.Radio}
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
        isChecked
        isDisabled
        type={CardSelection.Type.Radio}
        onClick={onClick}
      />
    )

    expect(screen.getByRole('radio')).toBeChecked()
  })
})
