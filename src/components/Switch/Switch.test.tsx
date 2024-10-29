import { render, screen, userEvent, waitFor } from '../../test-utils'
import { Size } from './Switch.types'
import { Switch } from './Switch'

describe('Switch', () => {
  describe('renders states correctly', () => {
    it('renders default state', () => {
      render(<Switch />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).not.toBeChecked()
    })

    it('renders checked by default state', () => {
      render(<Switch isInitiallyChecked={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeChecked()
    })

    it('renders checked state', () => {
      render(<Switch isChecked={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeChecked()
    })

    it('renders disabled state', () => {
      render(<Switch isDisabled={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeDisabled()
    })

    it('renders disabled checked state', () => {
      const { asFragment } = render(<Switch isChecked={true} isDisabled={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeDisabled()
      expect(screen.getByRole('switch')).toBeChecked()
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders unchecked loading state', () => {
      const { asFragment } = render(<Switch isChecked={false} isLoading={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeDisabled()
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders checked loading state', () => {
      const { asFragment } = render(<Switch isChecked={true} isLoading={true} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toBeDisabled()
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('renders sizes correctly', () => {
    it('renders large size', () => {
      render(<Switch size={Size.Large} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toHaveClass('mia-platform-switch')
      expect(screen.getByRole('switch')).not.toHaveClass('mia-platform-switch-small')
    })

    it('renders small size', () => {
      render(<Switch size={Size.Small} />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByRole('switch')).toHaveClass('mia-platform-switch')
      expect(screen.getByRole('switch')).toHaveClass('mia-platform-switch-small')
    })
  })

  describe('renders text correctly', () => {
    it('renders simple text', () => {
      render(<Switch text="Switch" />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
      expect(screen.getByText('Switch')).toBeInTheDocument()
    })
  })

  describe('performs interactions correctly', () => {
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
})
