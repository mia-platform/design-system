import { render, screen, userEvent, waitFor } from '../../test-utils'
import { Size } from './Switch.types'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders switch in default state', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).not.toBeChecked()
  })

  it('renders switch checked by default', () => {
    render(<Switch isInitiallyChecked={true} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('renders checked switch', () => {
    render(<Switch isChecked={true} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('renders disabled switch', () => {
    render(<Switch isDisabled={true} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('renders disabled checked switch', () => {
    const { asFragment } = render(<Switch isChecked={true} isDisabled={true} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeDisabled()
    expect(screen.getByRole('switch')).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders unchecked loading switch', () => {
    const { asFragment } = render(<Switch isChecked={false} isLoading={true} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders checked loading switch', () => {
    const { asFragment } = render(<Switch isChecked={true} isLoading={true} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders small size switch', () => {
    render(<Switch size={Size.Small} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toHaveClass('mia-platform-switch-small')
  })

  it('calls onClick when the switch is clicked', async() => {
    const onClick = jest.fn()
    render(<Switch onClick={onClick} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).not.toBeChecked()
    userEvent.click(screen.getByRole('switch'))
    await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1))
  })

  it('calls onChange when the switch state changes', async() => {
    const onChange = jest.fn()
    render(<Switch onChange={onChange} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.getByRole('switch')).not.toBeChecked()
    userEvent.click(screen.getByRole('switch'))
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
  })
})
