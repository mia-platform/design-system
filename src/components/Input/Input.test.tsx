import { Input } from './Input.tsx'
import { render } from '../../test-utils.tsx'

describe('Input Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly', () => {
    const { asFragment } = render(<Input />)
    expect(asFragment()).toMatchSnapshot()
  })
})
