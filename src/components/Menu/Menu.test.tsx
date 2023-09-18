import { render } from '@testing-library/react'

import { category, divider, group, item } from './Menu.mocks'
import { Menu } from '.'

describe('Menu Component', () => {

  // const props = {
  //   items: [
  //     item,
  //     divider,
  //     group,
  //     divider,
  //     category,
  //   ],
  // }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders item correctly', () => {

    const { asFragment } = render(<Menu items={[item]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders category correctly', () => {

    const { asFragment } = render(<Menu items={[category]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders group correctly', () => {

    const { asFragment } = render(<Menu items={[group]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders divider correctly', () => {

    const { asFragment } = render(<Menu items={[divider]} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
