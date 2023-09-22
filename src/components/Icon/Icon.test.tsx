import { render, screen } from '@testing-library/react'

import { Icon } from '.'

describe('Icon Component', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders custom icon correctly', () => {
    const { asFragment } = render(<Icon name="MiaPlatform" />)

    expect(screen.getByRole('img', { name: 'MiaPlatform' })).toBeVisible()
    expect(screen.getByLabelText('MiaPlatform')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Ant icon correctly', () => {
    const { asFragment } = render(<Icon name="AiOutlineHome" />)

    expect(screen.getByRole('img', { name: 'AiOutlineHome' })).toBeVisible()
    expect(screen.getByLabelText('AiOutlineHome')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Feather icon correctly', () => {
    const { asFragment } = render(<Icon name="FiHome" />)

    expect(screen.getByRole('img', { name: 'FiHome' })).toBeVisible()
    expect(screen.getByLabelText('FiHome')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders Phosphor icon correctly', () => {
    const { asFragment } = render(<Icon name="PiHouse" />)

    expect(screen.getByRole('img', { name: 'PiHouse' })).toBeVisible()
    expect(screen.getByLabelText('PiHouse')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })
})
