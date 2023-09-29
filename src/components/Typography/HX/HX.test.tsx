import { render } from '@testing-library/react'

import { Icon } from '../../Icon'
import { Typography } from '..'
import { loremIpsum } from '../../../utils/loremIpsum'

const { H1, H2, H3, H4 } = Typography

describe('HX Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders H1 correctly', () => {
    const { asFragment } = render(<H1>{'Text'}</H1>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H2 correctly', () => {
    const { asFragment } = render(<H2>{'Text'}</H2>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H3 correctly', () => {
    const { asFragment } = render(<H3>{'Text'}</H3>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H4 correctly', () => {
    const { asFragment } = render(<H4>{'Text'}</H4>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders custom ellipsis correctly', () => {
    const customEllipsis = {
      rows: 1,
      suffix: ' END',
      expandable: true,
      symbol: 'Show more',
    }

    const { asFragment } = render(<H1 ellipsis={customEllipsis}>{loremIpsum}</H1>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders copyable correctly', () => {
    const { asFragment } = render(<H1 copyable>{loremIpsum}</H1>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders custom copyable correctly', () => {
    const customCopyable = {
      text: 'Custom text to copy',
      icon: [
        <Icon
          color="magenta"
          key="FiCopy"
          name="FiCopy"
          size={16}
        />,
        <Icon
          color="magenta"
          key="FiCheck"
          name="FiCheck"
          size={16}
        />,
      ],
      tooltips: ['Copy to clipboard!', 'Copied to clipboard!'],
    }

    const { asFragment } = render(<H1 copyable={customCopyable}>{loremIpsum}</H1>)
    expect(asFragment()).toMatchSnapshot()
  })
})
