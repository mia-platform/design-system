import { fireEvent, render, screen } from '@testing-library/react'

import { ButtonHierarchies, ButtonIconPositions, ButtonShapes, ButtonSizes, ButtonTypes } from './Button.types'
import { Button } from '.'
import { Icon } from '../Icon'

const { Neutral, Danger } = ButtonHierarchies
const { Right } = ButtonIconPositions
const { Circle } = ButtonShapes
const { Small, Large } = ButtonSizes
const { Outlined, Ghost } = ButtonTypes

const icon = <Icon color="white" name="PiCircleHalfTiltLight" size={16} />

describe('Button Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders primary filled button correctly', () => {
    const { asFragment } = render(<Button>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary outline button correctly', () => {
    const { asFragment } = render(<Button type={Outlined}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary ghost button correctly', () => {
    const { asFragment } = render(<Button type={Ghost}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders neutral outline button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Neutral} type={Outlined}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders neutral ghost button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Neutral} type={Ghost}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders danger filled button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Danger}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders danger outline button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Danger} type={Outlined}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders danger ghost button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Danger} type={Ghost}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders square button correctly', () => {
    const { asFragment } = render(<Button icon={icon} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders circle button correctly', () => {
    const { asFragment } = render(<Button icon={icon} shape={Circle} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders small button correctly', () => {
    const { asFragment } = render(<Button size={Small}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders middle button correctly', () => {
    const { asFragment } = render(<Button>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders large button correctly', () => {
    const { asFragment } = render(<Button size={Large}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders disabled button correctly', () => {
    const { asFragment } = render(<Button isDisabled>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()

    const button = screen.getByRole('button', { name: /Button/i })
    expect(button).toBeDisabled()
  })

  test('renders loading button correctly', () => {
    const { asFragment } = render(<Button isLoading>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders button with icon left correctly', () => {
    const { asFragment } = render(<Button icon={icon}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders button with icon right correctly', () => {
    const { asFragment } = render(<Button icon={icon} iconPosition={Right}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders button with href correctly', () => {
    const { asFragment } = render(<Button href="https://mia-platform.eu">{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('calls onClick correctly', () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>{'Button'}</Button>)

    const button = screen.getByRole('button', { name: /Button/i })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
