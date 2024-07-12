import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tag } from './Tag'
import { render } from '../../test-utils'

const props = {
  color: '#ff0000',
  closeIcon: true,
  onClose: jest.fn(),
}

describe('Tag', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { asFragment } = render(<Tag {...props}>{'Tag text'}</Tag>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with close icon and calls onClose', async() => {
    render(<Tag {...props}>{'Tag text'}</Tag>)

    const closeButton = screen.getByRole('img', { name: /close/i })
    expect(closeButton).toBeInTheDocument()
    userEvent.click(closeButton)
    await waitFor(() => expect(props.onClose).toHaveBeenCalled())
  })
})
