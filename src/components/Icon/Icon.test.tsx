import { render } from '@testing-library/react'

import { Icon } from '.'

describe('Icon Component', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders custom icon correctly', () => {
    const { asFragment } = render(<Icon name="MiaPlatform" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Ant icon correctly', () => {
    const { asFragment } = render(<Icon name="AiOutlineHome" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Feather icon correctly', () => {
    const { asFragment } = render(<Icon name="FiHome" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Phosphor icon correctly', () => {
    const { asFragment } = render(<Icon name="PiHouse" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
