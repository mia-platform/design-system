import { render } from '@testing-library/react'

import { Radio } from './index'
import { RadioProps } from './index.props'

const baseProps: RadioProps = {
  label: 'label test',
  value: 'value test',
}

describe('Radio', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with label and value props', () => {
    const { asFragment } = render(<Radio {...baseProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with label, value and description props', () => {
    const { asFragment } = render(
      <Radio {...{ ...baseProps, description: 'description test' }} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
