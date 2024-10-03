import { RenderResult, renderHook, screen } from '@testing-library/react'
import { PiAcorn } from 'react-icons/pi'

import { Footer, FooterProps, useFooterWithHookedActions } from '.'
import { render, userEvent } from '../../../../test-utils'
import { DropdownFooter } from '../../props'
import { Icon } from '../../../Icon'

describe('useFooterWithHookedActions', () => {
  const hook = jest.fn()
  const footer: DropdownFooter = {
    top: 'top',
    bottom: 'bottom',
    actions: [
      { onClick: jest.fn() },
      { onClick: jest.fn() }],
  }

  it('invokes hook on action clicks', () => {
    const { result } = renderHook(() => useFooterWithHookedActions({ footer, hook }))
    expect(result.current?.actions).toHaveLength(2)

    expect(footer.actions![0].onClick).not.toHaveBeenCalled()
    expect(footer.actions![1].onClick).not.toHaveBeenCalled()

    result.current?.actions![0].onClick()
    expect(hook).toHaveBeenCalled()
    expect(footer.actions![0].onClick).toHaveBeenCalled()
    expect(footer.actions![1].onClick).not.toHaveBeenCalled()

    result.current?.actions![1].onClick()
    expect(hook).toHaveBeenCalledTimes(2)
    expect(footer.actions![0].onClick).toHaveBeenCalledTimes(1)
    expect(footer.actions![1].onClick).toHaveBeenCalled()
  })

  it('returns undefined on falsy footer input', () => {
    const { result } = renderHook(() => useFooterWithHookedActions({ footer: undefined, hook }))
    expect(result.current).toBeUndefined()
  })
})

describe('Footer', () => {
  it('renders nothing on falsy footer', () => {
    renderFooter({ footer: undefined })
    expect(screen.queryByTestId('dropdown-footer-wrapper')).toBeNull()
  })

  it('renders nothing on empty footer', () => {
    renderFooter({ footer: {} })
    expect(screen.queryByTestId('dropdown-footer-wrapper')).toBeNull()
  })

  it('renders top node', () => {
    renderFooter({ footer: { top: 'some top' } })
    expect(screen.getByTestId('dropdown-footer-wrapper')).toBeInTheDocument()
    expect(screen.getByText('some top')).toBeInTheDocument()
  })

  it('renders bottom node', () => {
    renderFooter({ footer: { bottom: 'some bottom' } })
    expect(screen.getByTestId('dropdown-footer-wrapper')).toBeInTheDocument()
    expect(screen.getByText('some bottom')).toBeInTheDocument()
  })

  it('renders a button for each action', async() => {
    const action1 = jest.fn()
    const action2 = jest.fn()
    renderFooter({ footer: {
      actions: [
        { label: 'my-label-1', icon: <Icon component={PiAcorn} size={16} />, onClick: action1 },
        { label: 'my-label-2', icon: <Icon component={PiAcorn} size={16} />, onClick: action2 },
      ],
    } })
    expect(screen.getByTestId('dropdown-footer-wrapper')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)

    const [btn1, btn2] = screen.getAllByRole('button')
    await userEvent.click(btn1)
    expect(action1).toHaveBeenCalled()
    await userEvent.click(btn2)
    expect(action2).toHaveBeenCalled()
  })
})

const defaultProps = {
  footer: {
    top: 'some top node',
    bottome: 'some bottom node',
    actions: [
      { label: 'my-label', icon: <Icon component={PiAcorn} size={16} />, onClick: jest.fn() },
    ],
  },
}
function renderFooter(props: FooterProps|undefined = defaultProps): RenderResult {
  return render(<Footer {...props} />)
}
