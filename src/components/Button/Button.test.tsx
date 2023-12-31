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

import { Hierarchy, IconPosition, Shape, Size, Type } from './Button.types'
import { fireEvent, render, screen } from '../../test-utils'
import { Button } from '.'
import { Icon } from '../Icon'

const { Neutral, Danger } = Hierarchy
const { Right } = IconPosition
const { Circle } = Shape
const { Small, Large } = Size
const { Outlined, Ghost } = Type

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
    expect(onClick).toBeCalledWith(expect.objectContaining({ ...MouseEvent }))
  })
})
