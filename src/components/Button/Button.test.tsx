import { fireEvent, render, screen } from '@testing-library/react'

import { ButtonHierarchies, ButtonShapes, ButtonSizes, ButtonTypes } from './utils'
import { Button } from '.'

const { Neutral, Danger } = ButtonHierarchies
const { Circle } = ButtonShapes
const { Small, Large } = ButtonSizes
const { Outline, Ghost } = ButtonTypes

describe('Button Component', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders primary filled button correctly', () => {
    const { asFragment } = render(<Button>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary outline button correctly', () => {
    const { asFragment } = render(<Button type={Outline}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary ghost button correctly', () => {
    const { asFragment } = render(<Button type={Ghost}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders neutral outline button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Neutral} type={Outline}>{'Button'}</Button>)
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
    const { asFragment } = render(<Button hierarchy={Danger} type={Outline}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders danger ghost button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Danger} type={Ghost}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders circle button correctly', () => {
    const { asFragment } = render(<Button shape={Circle}>{'+'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders small button correctly', () => {
    const { asFragment } = render(<Button size={Small}>{'Button'}</Button>)
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
