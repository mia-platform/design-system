import { render, screen } from '@testing-library/react'

import { Segmented } from '.'

describe('Segmented Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders custom segmented correctly', () => {
    const { asFragment } = render(<Segmented name="MiaPlatform" />)

    expect(screen.getByRole('segmented')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })
})
