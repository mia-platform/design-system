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

import { PiCircleHalfTiltLight } from 'react-icons/pi'

import { fireEvent, render, screen } from '../../test-utils'
import { Button } from '.'
import { Icon } from '../Icon'

const icon = <Icon color="white" component={PiCircleHalfTiltLight} size={16} />

describe('Button Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders primary filled button correctly', () => {
    const { asFragment } = render(<Button>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary outline button correctly', () => {
    const { asFragment } = render(<Button type={Button.Type.Outlined}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary ghost button correctly', () => {
    const { asFragment } = render(<Button type={Button.Type.Ghost}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders neutral outline button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Button.Hierarchy.Neutral} type={Button.Type.Outlined}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders neutral ghost button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Button.Hierarchy.Neutral} type={Button.Type.Ghost}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders danger filled button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Button.Hierarchy.Danger}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders danger outline button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Button.Hierarchy.Danger} type={Button.Type.Outlined}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders danger ghost button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Button.Hierarchy.Danger} type={Button.Type.Ghost}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary link button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Button.Hierarchy.Primary} type={Button.Type.Link}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders neutral link button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Button.Hierarchy.Neutral} type={Button.Type.Link}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders danger link button correctly', () => {
    const { asFragment } = render(<Button hierarchy={Button.Hierarchy.Danger} type={Button.Type.Link}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders square button correctly', () => {
    const { asFragment } = render(<Button icon={icon} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders circle button correctly', () => {
    const { asFragment } = render(<Button icon={icon} shape={Button.Shape.Circle} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders small button correctly', () => {
    const { asFragment } = render(<Button size={Button.Size.Small}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders small button icon only correctly', () => {
    const { asFragment } = render(<Button icon={icon} size={Button.Size.Small} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders middle button correctly', () => {
    const { asFragment } = render(<Button>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders large button correctly', () => {
    const { asFragment } = render(<Button size={Button.Size.Large}>{'Button'}</Button>)
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
    const { asFragment } = render(<Button icon={icon} iconPosition={Button.IconPosition.Right}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders button with href correctly', () => {
    const { asFragment } = render(<Button href="https://mia-platform.eu">{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary filled button correctly with form ref and htmlType', () => {
    const { asFragment } = render(<Button form="some-form" htmlType={Button.HTMLType.Submit}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary outline button correctly with form ref and no htmlType', () => {
    const { asFragment } = render(<Button form="some-form" type={Button.Type.Outlined}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders primary outline button correctly with form ref and reset htmlType', () => {
    const { asFragment } = render(<Button form="some-form" htmlType={Button.HTMLType.Reset} type={Button.Type.Outlined}>{'Button'}</Button>)
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

  test('renders title correctly', async() => {
    render(<Button title={'title test'}>{'Button'}</Button>)

    const button = screen.getByTitle('title test')
    expect(button).toBeVisible()
  })

  test('renders block button correctly', () => {
    const { asFragment } = render(<Button isBlock={true}>{'Button'}</Button>)
    expect(asFragment()).toMatchSnapshot()
  })
})
