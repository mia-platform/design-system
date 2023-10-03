import { render, screen } from '@testing-library/react'

import { customCopyable, customEllipsis, loremIpsum } from '../Typography.mocks'
import { Typography } from '..'

const { H1, H2, H3, H4 } = Typography

describe('HX Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders H1 correctly', () => {
    const { asFragment } = render(<H1>{'Text'}</H1>)

    const heading = screen.getByRole('heading', { name: 'Text' })
    expect(heading).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H2 correctly', () => {
    const { asFragment } = render(<H2>{'Text'}</H2>)

    const heading = screen.getByRole('heading', { name: 'Text' })
    expect(heading).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H3 correctly', () => {
    const { asFragment } = render(<H3>{'Text'}</H3>)

    const heading = screen.getByRole('heading', { name: 'Text' })
    expect(heading).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders H4 correctly', () => {
    const { asFragment } = render(<H4>{'Text'}</H4>)

    const heading = screen.getByRole('heading', { name: 'Text' })
    expect(heading).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders custom ellipsis correctly', () => {
    const { asFragment } = render(<H1 ellipsis={customEllipsis}>{loremIpsum}</H1>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders copyable correctly', () => {
    const { asFragment } = render(<H1 copyable>{loremIpsum}</H1>)

    const copyButton = screen.getByRole('button', { name: 'Copy' })
    const copyImg = screen.getByRole('img', { name: 'copy' })
    expect(copyButton).toBeVisible()
    expect(copyImg).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders custom copyable correctly', () => {
    const { asFragment } = render(<H1 copyable={customCopyable}>{loremIpsum}</H1>)

    const copyButton = screen.getByRole('button', { name: 'Copy to clipboard!' })
    const copyImg = screen.getByRole('img', { name: 'FiCopy' })
    expect(copyButton).toBeVisible()
    expect(copyImg).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })
})
