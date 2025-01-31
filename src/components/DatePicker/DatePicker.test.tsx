import { DatePicker } from './DatePicker'
import { render } from '../../test-utils'

describe('DatePicker Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly', () => {
    const { asFragment } = render(<DatePicker />)
    expect(asFragment()).toMatchSnapshot()
  })
})
